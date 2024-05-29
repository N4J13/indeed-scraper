const puppeteer = require("puppeteer");
const cron = require("node-cron");
const sendEmail = require("./mail/mail");

const scrape = async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  await page.goto("https://in.indeed.com/", { waitUntil: "networkidle2" });
  //  Get the job title and location
  await page.type("#text-input-what", "React Developer");
  await page.type("#text-input-where", "Banglore");
  await page.click('button[type="submit"]');

  await page.waitForNavigation();
  // Job Listings div
  await page.waitForSelector(".job_seen_beacon");

  //  Map over the job listings to get the job title, company, location, date, and link
  const jobListings = await page.$$eval(".job_seen_beacon", (listings) => {
    return listings.map((listing) => {
      const jobTitle = listing
        .querySelector("h2.jobTitle > a > span")
        .textContent.trim();
      const company = listing
        .querySelector('span[data-testid="company-name"]')
        .textContent.trim();
      const location = listing
        .querySelector('div [data-testid="text-location"]')
        .textContent.trim();
      const jobdate = listing
        .querySelector('span[data-testid="myJobsStateDate"]')
        .textContent.trim();
      const jobLink = listing.querySelector("a").href;

      const jobDetails = { jobTitle, company, location, jobdate, jobLink };

      return jobDetails;
    });
  });

  //  Filter the job listings to get only the job postings that were posted today
  const newJobListings = jobListings.filter(
    (job) =>
      job.jobdate === "PostedToday" || job.jobdate === "PostedJust posted"
  );

  //  Send an email with the new job listings
  if (newJobListings.length > 0) {
    console.log("New Job Postings found!");
    sendEmail(newJobListings);
  } else {
    console.log("No new job postings found.");
  }

  console.log(jobListings);
  await browser.close();
};

// Run every 6 hour
cron.schedule("0 */6 * * *", () => {
  console.log("Running our script every 6 hours");
  scrape();
});
