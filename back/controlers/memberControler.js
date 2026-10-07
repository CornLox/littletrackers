const Member = require("../models/memberModel")
const mongoose = require("mongoose")

// strip the heavy image buffer before sending a member back as JSON
const stripphotoData = (member) => {
    const doc = member.toObject()
    if (doc.photo) delete doc.photo.data
    return doc
}

// get all members (excluding image bytes so the list stays light)
const getMembers = async (req,res) => {
    const members = await Member.find({})
        .select("-photo.data")
        .collation({ locale: "el", strength: 1 })
        .sort({ priority: 1, name: 1 })
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
const getMemberphoto = async (req,res) => {
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
const createMember = async (req,res) => {
    const {name_el,name_en,title_el,title_en,cv_el,cv_en,openingDate} = req.body
    // add doc to db
    try{
        if (!req.file){
            return res.status(400).json({error: "photo image is required"})
        }
        const member = await Member.create({
            name_el,name_en,title_el,title_en,cv_el,cv_en,openingDate,
            photo: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            }
        })
        res.status(200).json(stripphotoData(member))
    } catch (error){
         res.status(400).json({error: error.message})
    }
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
    res.status(200).json(stripphotoData(member))
}


// update a member
const updateMember = async (req,res) => {
    const {id} = req.params
     if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Member"})
    }
    const update = { ...req.body }
    // only replace the image if a new one was uploaded
    if (req.file){
        update.photo = {
            data: req.file.buffer,
            contentType: req.file.mimetype
        }
    }
    const member = await Member.findOneAndUpdate({_id: id}, update, { new: true })
    if (!member){
        return res.status(400).json({error: "No such Member"})
    }
    res.status(200).json(stripphotoData(member))
}

module.exports = {
    getMembers,
    getMember,
    getMemberphoto,
    createMember,
    deleteMember,
    updateMember
}