// cloudinary.js
import { Cloudinary } from 'cloudinary-core';

// import { config } from 'dotenv';

export const cloudinary = new Cloudinary({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});