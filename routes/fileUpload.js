const express = require('express');
const multer = require('multer');
const cors = require('../cors');

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

.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
  try{
    res.statusCode = 403;
    res.end('Operation not supported');
  } catch(err){
      next(err);
  }
})

.post(cors.corsWithOptions, upload.single('imageFile'), (req, res, next) => {
  try{
    res.statusCode = 201;
    res.setHeader('Content-Type','application/json');
    res.json(req.file);
  } catch(err){
      next(err);
  }
})

.put(cors.corsWithOptions, (req, res, next) => {
  try{
    res.statusCode = 403;
    res.end('Operation not supported');
  } catch(err){
      next(err);
  }
})

.delete(cors.corsWithOptions, (req, res, next) => {
  try{
    res.statusCode = 403;
    res.end('Operation not supported');
  } catch(err){
      next(err);
  }
});

module.exports = fileUploadRouter;
