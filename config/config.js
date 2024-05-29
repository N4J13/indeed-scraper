require("dotenv").config();

module.exports = {
  email: {
    user: process.env.EMAIL_USER || "",
    pass: process.env.EMAIL_PASS || "",
    to: process.env.EMAIL_TO || "",
  },
  desiredRole: "React Developer",
  location: "Banglore",
};
