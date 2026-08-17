const Programme = require("../models/programmeModel")
const mongoose = require("mongoose")

// strip the heavy image buffer before sending a programme back as JSON
const stripPromoData = (programme) => {
    const doc = programme.toObject()
    if (doc.promo) delete doc.promo.data
    return doc
}

// get all programmes (excluding image bytes so the list stays light)
const getProgrammes = async (req,res) => {
    const programmes = await Programme.find({}).select("-promo.data").sort({createdAt: -1})
    res.status(200).json(programmes)
}


// get a single programme (metadata only, image is fetched via /:id/promo)
const getProgramme = async (req,res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Programme"})
    }
    const programme = await Programme.findById(id).select("-promo.data")
    if (!programme){
        return res.status(400).json({error: "No such Programme"})
    }
    res.status(200).json(programme)
}

// serve the raw promo image bytes for a programme
const getProgrammePromo = async (req,res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Programme"})
    }
    const programme = await Programme.findById(id)
    if (!programme || !programme.promo || !programme.promo.data){
        return res.status(404).json({error: "No promo image"})
    }
    res.contentType(programme.promo.contentType)
    res.send(programme.promo.data)
}

// create new programme
const createProgramme = async (req, res) => {
  const { title_el,title_en,subtitle_el,subtitle_en,
  director_el,director_en,description_el,description_en,
  genre_el,genre_en,dates_el,dates_en,openingDate } = req.body
  if (!req.file) {
    return res.status(400).json({ error: "promo image is required" })
  }
  const programme = await Programme.create({
    title_el,title_en,subtitle_el,subtitle_en,
  director_el,director_en,description_el,description_en,
  genre_el,genre_en,dates_el,dates_en,openingDate,
    promo: { data: req.file.buffer, contentType: req.file.mimetype }
  })
  res.status(200).json(stripPromoData(programme))
}

// delete a programme
const deleteProgramme = async (req,res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Programme"})
    }
    const programme = await Programme.findOneAndDelete({_id: id})
    if (!programme){
        return res.status(400).json({error: "No such Programme"})
    }
    res.status(200).json(stripPromoData(programme))
}


// update a programme
const updateProgramme = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Programme" })
  }

  // --- step 3 change starts ---
  const ALLOWED_FIELDS = [
    "title_el","title_en","subtitle_el","subtitle_en",
    "director_el","director_en","description_el","description_en",
    "genre_el","genre_en","dates_el","dates_en","openingDate"
  ]

  const update = {}
  for (const key of ALLOWED_FIELDS) {
    if (req.body[key] !== undefined) update[key] = req.body[key]
  }
  if (req.file) {
    update.promo = { data: req.file.buffer, contentType: req.file.mimetype }
  }

  const programme = await Programme.findOneAndUpdate(
    { _id: id }, update, { new: true, runValidators: true }
  )
  // --- step 3 change ends ---

  if (!programme) {
    return res.status(400).json({ error: "No such Programme" })
  }
  res.status(200).json(stripPromoData(programme))
}

module.exports = {
    getProgrammes,
    getProgramme,
    getProgrammePromo,
    createProgramme,
    deleteProgramme,
    updateProgramme
}
