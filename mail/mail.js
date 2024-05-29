const nodemailer = require("nodemailer");
const config = require("../config/config");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

transport.verify(function (err, success) {
  if (err) {
    console.log(err);
  } else {
    console.log("Server is ready to take our messages");
  }
});

const sendEmail = async (newJobListings) => {
  const jobListingsHTML = newJobListings
    .map(
      (job) =>
        `<div>
          <h1>Job Title: ${job.jobTitle}</h1>
          <h2>Company: ${job.company}</h2>
          <h3>Location: ${job.location}</h3>
          <p>Job Date: ${job.jobdate}</p>
          <a href="${job.jobLink}">Job Link</a>
        </div>`
    )
    .join("<hr>");

  const mailOptions = {
    from: config.email.user,
    to: config.email.to,
    subject: "New Job Postings - React Developer",
    html: `${jobListingsHTML}`,
  };

  transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email Sent: " + info.response);
    }
  });
};

module.exports = sendEmail;
