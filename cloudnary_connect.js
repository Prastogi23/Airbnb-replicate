const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API,
    api_secret: process.env.CLOUD_KEY
});

// Log connection success message
console.log('Connected to Cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wanderlust',
      allowed_formats: ['png', 'jpg', 'jpeg'],  // Fix typo in `allowedFormats`
    },
});

module.exports = { cloudinary, storage };
