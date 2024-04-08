const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

console.log({CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME})

const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg, png, jpeg'],
    patams: {
        folder: 'masynctexh-mern-blog',
        format: 'jpg', 
        transformation: [{ width: 500, height: 500, crop: 'limit' }],
    }
});

module.exports = storage;