const API_URL = (() => {
  const isDev = process.env.NODE_ENV === "development";
  const localURL = "http://localhost:5000"; // ✅ Local backend
  const liveURL = process.env.REACT_APP_API_URL?.trim().replace(/\/$/, "") || "https://coreys-portfolio-website.onrender.com"; // ✅ Live backend

  return isDev ? localURL : liveURL;
})();

export default API_URL;
