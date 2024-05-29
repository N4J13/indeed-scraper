# Node.js Indeed Job Scraper

A Node.js script that scrapes Indeed for new job postings in specified roles and locations, sending email notifications every 6 hours.

## Features
- Scrapes Indeed for new job postings based on specified roles and locations.
- Sends email notifications with the details of new job postings.
- Runs every 6 hours.

## Prerequisites
- Node.js
- npm (Node package manager)
- A Gmail account for sending emails

## Installation

1. Clone the repository:
    ```
    git clone https://github.com/N4J13/indeed-scraper
    cd indeed-job-scraper
    ```

2. Install the dependencies:
    ```
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root directory and add the following:
    ```
    EMAIL_USER=your-gmail-address@gmail.com
    EMAIL_PASS=your-gmail-app-password
    EMAIL_FROM=your-gmail-address@gmail.com
    EMAIL_TO=recipient-email-address@example.com
    ```
    **Note:** For `EMAIL_PASS`, generate an App Password from your Google Account settings. [Instructions for generating an App Password](https://support.google.com/mail/answer/185833?hl=en).

## Usage

1. Run the script:
    ```
    node scraper.js
    ```

    This will start the scraping process and send email notifications every 6 hours if there are new job postings.

## Contributing

Feel free to submit issues or pull requests.

## License

This project is licensed under the MIT License.
"""

