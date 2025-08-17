import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

export const uploadRouter = express.Router();

if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

uploadRouter.post('/image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: '이미지 파일이 필요합니다.' });
  }

  const imageUrl = `/uploads/${req.file.filename}`;

  res.json({
    message: '업로드 성공',
    imageUrl
  });
});
