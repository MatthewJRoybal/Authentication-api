'use-strict';
/******************************************
* API - SYSTEM - EMAIL - TEMPLATES.JS
******************************************/

const { CLIENT_ORIGIN } = require('../config');

module.exports = {

  confirm: id => ({
    subject: 'RentPlan: Confirm New Account',
    html: `
      <h3>Hello,</h3>
      <p>Congratulations on your new account. To get started, simply click on the link below to to confirm your account.</p>
      <a href="${CLIENT_ORIGIN}/investor/confirm/${id}">
      Confirm account 2</a>
      <p>Thank you,</p>
      <p>Matthew</p>
      `,
    text: `Copy and paste this link: ${CLIENT_ORIGIN}/investor/confirm/${id}`
  }),

  forgot: resetPasswordToken => ({
    subject: 'RentPlan: Forgot Password',
    html: `
      <h3>Hello,</h3>
      <p>You recently indicated that you forgot your password. To reset your password, please click on the link below:</p>
      <a href="${CLIENT_ORIGIN}/investor/reset/${resetPasswordToken}">
      Reset Password Here</a>
      <p>Thank you,</p>
      <p>Matthew</p>
      `,
    text: `Copy and paste this link: ${CLIENT_ORIGIN}/investor/reset/${resetPasswordToken}`
  }),

  password: () => ({
    subject: 'Rent Plan Password Changed',
    html: `
      <p>Hello,</p>
      <p>Your password was reset for RentPlan.com. If this was you, you can ignore this message. Otherwise, let us know right away!</p>
      <p>Thanks,</p>
      <p>Matthew</p>
    `
  }),

  contact: contact => ({
    subject: 'Rent Plan Contact',
    html: `
    <p>You have a new message from Contact Me page</p>
    <h3>Contact Details</h3>
      <ul>
        <li>Name: ${contact.name}</li>
        <li>Email: ${contact.email}</li>
        <li>Type: ${contact.type}</li>
      </ul>
    <h3>Message</h3>
    <p>${contact.message}</p>
    `
  })

}
