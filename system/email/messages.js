'use-strict';
/*****************************************
* API - SYSTEM - EMAIL - MESSAGES.JS
*****************************************/

module.exports = {
  confirm: {
    verify: 'An Email has been sent to your inbox to confirm your account.',
    confirmed: 'Congratulations, your account is now confirmed. One moment please...',
    unconfirmed: 'Your account has not been confirmed. Try again',
    resend: 'Confirmation email resent, maybe check your spam?',
    alreadyConfirmed: 'An account already exists with this email address, please sign in. If you forgot your password, use the forgot password link on the signin page.'
  },
  email: {
    required: 'You must provide an email address',
    notFound: 'Sorry, we could not find a user with that email address',
    noMatch: "Your new email doesn't match the new email confirm field. Try again",
    missingFields: "Your must include your current email address, current password, new email address and confirm your new email address. Try again",
    success: 'Your email has successfully been changed.',
    error: 'Your email was not changed, something went wrong'
  },
  password: {
    missingFields: 'You are missing some of the required password fields. Try again',
    userNotFound: 'Your trying to reset your password, but we cannot find your user account. Trying logging out and back in again',
    changed: 'Your password has successfully been changed'
  },
  reset: {
    tokenNotFound: 'Something is wrong with your reset token. Please try the forgot password link again.',
    passwordsDoNotMatch: 'The new password does not match the password confirmation',
    forgot: 'Please check your email to reset your password',
    success: 'You have successfully reset your password. Try signing in now',
    failure: 'Something went wrong, please try again'
  },
  user: {
    unknown: 'Could not find you'
  },
  error: {
    wrong: 'Uh oh, something went wrong'
  }
}
