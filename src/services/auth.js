import { randomBytes } from 'crypto';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';
import { SessionsCollection } from '../db/models/session.js';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/sendMail.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { TEMPLATES_DIR, TTL } from '../constants/index.js';
import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';

export const registerUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) throw createHttpError(401, 'Invalid email or password');

  const isEqual = await bcrypt.compare(payload.password, user.password);
  if (!isEqual) throw createHttpError(401, 'Invalid email or password');

  await SessionsCollection.deleteOne({ userId: user._id });

  const accessToken = randomBytes(50).toString('base64');
  const refreshToken = randomBytes(50).toString('base64');

  return await SessionsCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + TTL.ACCESS_TOKEN.FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + TTL.REFRESH_TOKEN.THIRTY_DAYS),
  });
};

const createSession = () => {
  const accessToken = randomBytes(50).toString('base64');
  const refreshToken = randomBytes(50).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + TTL.ACCESS_TOKEN.FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + TTL.REFRESH_TOKEN.THIRTY_DAYS),
  };
};

export const refreshUserSession = async (sessionId, refreshToken) => {
  const session = await SessionsCollection.findOne({ _id: sessionId, refreshToken });
  if (!session) throw createHttpError(401, 'User not authorized, please log in!');

  const isRefreshTokenExpired = new Date() > new Date(session.refreshTokenValidUntil);
  if (isRefreshTokenExpired) throw createHttpError(401, 'A session token has expired.');

  await SessionsCollection.deleteOne({ _id: sessionId, refreshToken });
  const newSession = createSession();

  return await SessionsCollection.create({
    userId: session.userId,
    ...newSession,
  });
};

export const logoutUser = async (sessionId) => {
  await SessionsCollection.deleteOne({ _id: sessionId });
};

// ⬇️ Найважливіше — функція для надсилання токена на email
export const sendResetToken = async (email) => {
  const user = await UsersCollection.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found!');
  }

  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    getEnvVar('JWT_SECRET'),
    {
      expiresIn: '10m',
    },
  );

  const resetPasswordTemplatePath = path.join(
    TEMPLATES_DIR,
    'reset-password-email.hbs',
  );

  const templateMarkup = (await fs.readFile(resetPasswordTemplatePath)).toString();
  const template = handlebars.compile(templateMarkup);

  const html = template({
    name: user.name,
    link: `${getEnvVar('APP_DOMAIN')}/reset-password?token=${resetToken}`,
  });

  try {
    await sendEmail({
      to: email,
      subject: 'Password Reset',
      html, // виправлено: передається скомпільований html
      from: getEnvVar('SMTP_FROM'), // з .env
    });
  } catch (error) {
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
      { cause: error },
    );
  }
};

// ⬇️ Функція для скидання пароля користувача
export const resetPassword = async (token, password) => {
  let entries;
  try {
    entries = jwt.verify(token, getEnvVar('JWT_SECRET'));
  } catch (err) {
    if (err instanceof Error)
      throw createHttpError(401, 'Token is expired or invalid.', {
        cause: err,
      });
    throw err;
  }

  const user = await UsersCollection.findOne({
    _id: entries.sub,
    email: entries.email,
  });
  if (!user) {
    throw createHttpError(404, 'User not found.');
  }

  const isEqual = await bcrypt.compare(password, user.password);
  if (isEqual) {
    throw createHttpError(
      400,
      'New password cannot be the same as the current password.',
    );
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  await UsersCollection.updateOne(
    { _id: user._id },
    { password: encryptedPassword },
  );

  await SessionsCollection.deleteOne({ userId: user._id });
};