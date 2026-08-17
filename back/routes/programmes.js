const express = require("express")


const {getProgrammes,
    getProgramme,
    getProgrammePromo,
    createProgramme,
    deleteProgramme,
    updateProgramme} = require("../controlers/programmeControler")

const router = express.Router()

// multer keeps the uploaded file in memory so we can store the buffer in Mongo
const upload = require("../middleware/upload")

const requireAdmin = require("../middleware/requireAdmin")

// GET all programmes
router.get("/",getProgrammes)

// GET a single programme (metadata, no image bytes)
router.get("/:id",getProgramme)

// GET the promo image bytes for a programme
router.get("/:id/promo",getProgrammePromo)

// POST a new programme (with promo image)
router.post("/", requireAdmin, upload.single("promo"), createProgramme)

// DELETE a programme
router.delete("/:id", requireAdmin,deleteProgramme)

// UPDATE a programme (promo image optional)
router.patch("/:id",requireAdmin, upload.single("promo"), updateProgramme)

module.exports = router
