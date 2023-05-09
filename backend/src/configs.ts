import multer from "multer";
/* File Configuration */
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "public/assets");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});
export const upload = multer({ storage });
