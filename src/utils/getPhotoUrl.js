import { getEnvVar } from './getEnvVar.js';
import { saveFileToCloudinary } from './saveFileToCloudinary.js';
import { saveFileToUploadDir } from './saveFileToUploadDir.js';

export const getPhotoUrl = async (photo) => {
  if (!photo) return null;

  const useCloudinary = getEnvVar('ENABLE_CLOUDINARY') === 'true';

  if (useCloudinary) {
    return await saveFileToCloudinary(photo);
  }

  return await saveFileToUploadDir(photo);
};