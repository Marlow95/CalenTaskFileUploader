const express = require('express');
const multer = require('multer')

const fileUploadRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
});

const imageFileFilter = (req, file, cb) => {
  if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
    return cb(new Error('You can only upload image files'), false);
  }
  cb(null, true);
};

const upload = multer({ storage:
storage, fileFilter: imageFileFilter });

fileUploadRouter.route('/')

.get((req, res, next) => {
  res.statusCode = 403;
  res.end('Operation not supported');
})

.post(upload.single('imageFile'),(req, res, next) => {
  res.statusCode = 201;
  res.setHeader('Content-Type','application/json');
  res.json(req.file);
})

.put((req, res, next) => {
  res.statusCode = 403;
  res.end('Operation not supported');
})

.delete((req, res, next) => {
  res.statusCode = 403;
  res.end('Operation not supported');
});

module.exports = fileUploadRouter;
