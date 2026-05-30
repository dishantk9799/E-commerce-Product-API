import multer from "multer";

// ---- Configure storage for uploaded files ----
const storage = multer.diskStorage({

    // ---- Set upload destination folder ----
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },

    // ---- Generate unique filename for uploaded file ----
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

// ---- Initialize multer with storage configuration ----
const upload = multer({ storage });

export default upload;