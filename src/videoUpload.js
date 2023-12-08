import path from 'path'; // Ajoutez cette ligne pour importer le module path
import config from './config';
import multer from 'multer';
import AWS from 'aws-sdk';
import multerS3 from 'multer-s3';

AWS.config.update({
  accessKeyId: config.app.AWS_ACCESS_KEY,
  secretAccessKey: config.app.AWS_SECRET_KEY,
  region: config.app.AWS_REGION
})

const s3 = new AWS.S3();
const videoFilter = (req, file, cb) => {
  const fileTypes = /mp4|avi|mov|mkv|flv/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (extname && mimeType) {
    return cb(null, true);
  } else {
    cb('Mauvais format de fichier vidéo');
  }
};

var videoUpload = multer({
  storage: multerS3({
    videoFilter,
    s3: s3,
    bucket: config.app.AWS_VIDEO_BUCKET,
    metadata: function (req, file, cb) {
        cb(null, { fieldName: 'abhi_meta_data' });
    },
    key: function (req, file, cb) {
        cb(null, file.originalname)
    }
  })
}).single('video');



export { videoUpload };
