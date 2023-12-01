// Import Multer
import multer from "multer";

// Configure Multer
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

export {upload};
