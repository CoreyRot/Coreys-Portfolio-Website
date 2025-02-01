const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000" // ✅ Local backend
    : (process.env.REACT_APP_API_URL?.replace(/\/$/, "") || "https://coreys-portfolio-website.onrender.com"); // ✅ Live backend

export default API_URL;
