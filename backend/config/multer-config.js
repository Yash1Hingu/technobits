const multer = require('multer');
const path = require('path');

// Set up multer to store the uploaded files locally
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');  // Directory where the file will be saved on the server
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));  // Unique file name
    }
});

const upload = multer({ storage: storage });

module.exports = upload;