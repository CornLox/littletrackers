const multer = require("multer")

const ALLOWED = ["image/jpeg", "image/png", "image/webp"]

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024,  // 2 MB — also protects your 512 MB Render RAM
    files: 1
  },
  fileFilter: (req, file, cb) => {
    if (ALLOWED.includes(file.mimetype)) return cb(null, true)
    const err = new Error("Only JPEG, PNG or WebP images are allowed")
    err.status = 400            // tag it so the error handler knows it's safe to show
    cb(err)
  }
})

module.exports = upload