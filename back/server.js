require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const helmet = require("helmet")
const rateLimit = require("express-rate-limit")
const programmeRoutes = require("./routes/programmes")
const memberRoutes = require("./routes/members")
const multer = require("multer")
// express app
const app = express()

// Render (and most hosts) sit behind a proxy. This lets the rate limiter
// read the real client IP from X-Forwarded-For instead of the proxy's IP.
app.set("trust proxy", 1)

// --- security headers ---
app.use(helmet({
  // Your images are served by this API but displayed on the Netlify front
  // (a different origin). Helmet's default blocks that; this re-allows it.
  crossOriginResourcePolicy: { policy: "cross-origin" }
}))

// --- CORS: only our own front-ends may call the API ---
const allowedOrigins = (process.env.CLIENT_ORIGINS || "http://localhost:3000")
  .split(",")
  .map(o => o.trim())

app.use(cors({
  origin: (origin, cb) => {
    // no Origin header = curl / server-to-server / your local admin calls
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true)
    const err = new Error("Not allowed by CORS")
    err.status = 403
    return cb(err)
  }
}))

// --- rate limiting on the API ---
app.use("/api", rateLimit({
  windowMs: 15 * 60 * 1000,   // 15 minutes
  max: 100,                    // per IP per window
  standardHeaders: true,
  legacyHeaders: false
}))

//middleware
app.use(express.json())
app.use(cors())
app.use((req,res,next)=>{
    console.log(req.path, req.method)
    next()
})

// Lightweight liveness endpoint for the keep-alive pinger.
// Deliberately does NOT query MongoDB — waking the web service is enough,
// no need to hit Atlas every few minutes.
app.get("/healthz", (req, res) => res.sendStatus(200))

//routes
app.use("/api/programmes",programmeRoutes)
app.use("/api/members",memberRoutes)

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // e.g. file too large
    return res.status(400).json({ error: `Upload failed: ${err.message}` })
  }
  if (err.name === "ValidationError") {
    // missing/invalid fields — safe and useful to surface
    return res.status(400).json({ error: err.message })
  }
  if (err.name === "CastError") {
    return res.status(400).json({ error: "Invalid value provided" })
  }
  if (err.status) {
    // our tagged errors: the file filter (400), CORS (403)
    return res.status(err.status).json({ error: err.message })
  }
  console.error(err)                                   // full detail in the logs
  res.status(500).json({ error: "Something went wrong" }) // generic to the client
})

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        // listen for requests
const port = process.env.PORT || 4000
   app.listen(port, () => console.log("listening on port", port))
    })
    .catch((error)=>{
        console.log(error)
    })
