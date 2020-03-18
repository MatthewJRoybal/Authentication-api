'use-strict';
/***********************************
 * API - SYSTEM - SENDMAIL.JS
 **********************************/

const nodemailer = require('nodemailer');
const { EMAIL_PASS, EMAIL_USER } = require('../config');

// Gmail Credentials for sending out email
const credentials = {
  service: 'Gmail',
  auth: {
    // Authentication email & password from environment variables
    user: EMAIL_USER,
    pass: EMAIL_PASS
  }
}

// Nodemailer transporter is ready with credentials to send email
const transporter = nodemailer.createTransport(credentials);

// Exporting an 'async' function here allows 'await' to be used
// as the return value of this function
module.exports = async (to, content) => {
  const contacts = {
    from: EMAIL_USER,
    to
  }
  // Combine content & contacts into single object passed to nodemailer
  const email = Object.assign({}, content, contacts)
  //
  await transporter.sendMail(email)
}
