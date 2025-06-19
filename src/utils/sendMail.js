import nodemailer from 'nodemailer';

import { getEnvVar } from './getEnvVar.js';

const transporter = nodemailer.createTransport({
  host: getEnvVar('SMTP_HOST'),
  secure:false,
  port: Number(getEnvVar('SMTP_PORT')),
  auth: {
    user: getEnvVar('SMTP_AUTH_USER'),
    pass: getEnvVar('SSMTP_AUTH_PASSWORD'),
  },
  
});

export const sendEmail = async (options) => {
  return await transporter.sendMail(options);
};