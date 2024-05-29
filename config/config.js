require("dotenv").config();

module.exports = {
  email: {
    user: process.env.EMAIL_USER || "",
    pass: process.env.EMAIL_PASS || "",
    from : process.env.EMAIL_FROM || "",
    to: process.env.EMAIL_TO || "",
  },
};
