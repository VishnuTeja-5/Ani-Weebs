import multer from "multer";
import path from "path"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(process.cwd(),'public','uploads'));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname);
    }
  })
  
export const upload = multer({ storage })