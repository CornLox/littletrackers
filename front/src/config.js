// Central API origin. Set REACT_APP_API_URL at build time (a Netlify env var
// in production); falls back to the local backend during development.
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:4000";

export default API_BASE;