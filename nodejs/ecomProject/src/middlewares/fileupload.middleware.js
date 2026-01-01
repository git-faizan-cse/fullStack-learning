import multer from 'multer';
import path from 'path';

// const uploadDir = path.join(process.cwd(), 'uploads');
const uploadDir = './uploads';


// configure storage with filename and location 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // folder to save files
  },
  filename: (req, file, cb) => {
    const safeDate = new Date().toISOString().replace(/:/g, '-'); 
    // Save with original name, or customize filename
    // cb(null, new Date().toISOString() + '-' + file.originalname);
    cb(null, `${safeDate}-${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
});

export default upload;