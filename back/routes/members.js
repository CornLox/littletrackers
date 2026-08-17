const express = require("express")

const {getMembers,
    getMember,
    getMemberPhoto,
    createMember,
    deleteMember,
    updateMember} = require("../controlers/memberControler")

const router = express.Router()

// multer keeps the uploaded file in memory so we can store the buffer in Mongo
const upload = require("../middleware/upload")

const requireAdmin = require("../middleware/requireAdmin")

// GET all members
router.get("/",getMembers)

// GET a single member (metadata, no image bytes)
router.get("/:id",getMember)

// GET the photo image bytes for a member
router.get("/:id/photo",getMemberPhoto)

// POST a new member (with photo image)
router.post("/", requireAdmin, upload.single("photo"), createMember)

// DELETE a member
router.delete("/:id", requireAdmin, deleteMember)

// UPDATE a member (photo image optional)
router.patch("/:id", requireAdmin, upload.single("photo"), updateMember)

module.exports = router
