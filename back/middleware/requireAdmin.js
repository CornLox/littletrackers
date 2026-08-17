const crypto = require("crypto")

// Guards write routes. Expects:  Authorization: Bearer <ADMIN_TOKEN>
const requireAdmin = (req, res, next) => {
  const expected = process.env.ADMIN_TOKEN
  if (!expected) {
    // fail closed if the server was misconfigured
    return res.status(500).json({ error: "Server auth not configured" })
  }

  const header = req.get("authorization") || ""
  const token = header.startsWith("Bearer ") ? header.slice(7) : ""

  const a = Buffer.from(token)
  const b = Buffer.from(expected)
  // length check first, then constant-time compare to avoid timing leaks
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  next()
}

module.exports = requireAdmin