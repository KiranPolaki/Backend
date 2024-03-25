import multer from "multer";

// Todo: Learn more about the multer through the documentation

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    // ! although saving the original file name is not an ideal option
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage,
});
