const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

//associating with cloudinary instance
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

//setting up cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'Camp-my',
        allowedFormats: ['jpg', 'png', 'jpeg']
    }   
});

module.exports = {
    cloudinary,
    storage
}