const Member = require("../models/memberModel")
const mongoose = require("mongoose")

// strip the heavy image buffer before sending a member back as JSON
const stripPhotoData = (member) => {
    const doc = member.toObject()
    if (doc.photo) delete doc.photo.data
    return doc
}

// get all members (excluding image bytes so the list stays light)
const getMembers = async (req,res) => {
    const members = await Member.find({}).select("-photo.data").sort({createdAt: -1})
    res.status(200).json(members)
}


// get a single member (metadata only, image is fetched via /:id/photo)
const getMember = async (req,res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Member"})
    }
    const member = await Member.findById(id).select("-photo.data")
    if (!member){
        return res.status(400).json({error: "No such Member"})
    }
    res.status(200).json(member)
}

// serve the raw photo image bytes for a member
const getMemberPhoto = async (req,res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Member"})
    }
    const member = await Member.findById(id)
    if (!member || !member.photo || !member.photo.data){
        return res.status(404).json({error: "No photo image"})
    }
    res.contentType(member.photo.contentType)
    res.send(member.photo.data)
}

// create new member
const createMember = async (req, res) => {
  const { forename_el,forename_en,surname_el,surname_en,
  role_el,role_en,cv_el,cv_en } = req.body
  if (!req.file) {
    return res.status(400).json({ error: "member photo is required" })
  }
  const member = await Member.create({
    forename_el,forename_en,surname_el,surname_en,
    role_el,role_en,cv_el,cv_en,
    photo: { data: req.file.buffer, contentType: req.file.mimetype }
  })
  res.status(200).json(stripPhotoData(member))
}

// delete a member
const deleteMember = async (req,res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Member"})
    }
    const member = await Member.findOneAndDelete({_id: id})
    if (!member){
        return res.status(400).json({error: "No such Member"})
    }
    res.status(200).json(stripPhotoData(member))
}


// update a member
const updateMember = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Member" })
  }

  // --- step 3 change starts ---
  const ALLOWED_FIELDS = [
    "forename_el","forename_en","surname_el","surname_en",
    "role_el","role_en","cv_el","cv_en"
  ]

  const update = {}
  for (const key of ALLOWED_FIELDS) {
    if (req.body[key] !== undefined) update[key] = req.body[key]
  }
  if (req.file) {
    update.photo = { data: req.file.buffer, contentType: req.file.mimetype }
  }

  const member = await Member.findOneAndUpdate(
    { _id: id }, update, { new: true, runValidators: true }
  )
  // --- step 3 change ends ---

  if (!member) {
    return res.status(400).json({ error: "No such Member" })
  }
  res.status(200).json(stripPhotoData(member))
}

module.exports = {
    getMembers,
    getMember,
    getMemberPhoto,
    createMember,
    deleteMember,
    updateMember
}
