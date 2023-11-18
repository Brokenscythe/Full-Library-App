import { Request, Express } from "express";
import multer, { Multer } from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";

// Define the storage directory
const storageDirectory = path.join(__dirname, "../public/uploads");

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, storageDirectory);
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, uuidv4() + "-" + file.originalname);
  },
});

const upload: Multer = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
});
const configuredMulterMiddleware = upload.single("icon");

export default configuredMulterMiddleware;
