const sgMail = require('@sendgrid/mail');
const { sendGridSecret } = require('config/variables');
const { EmailNotSentError, errorEmitter, errorEvent } = require('errors');

sgMail.setApiKey(sendGridSecret);

const sender = emailClient => ({
  async sendWelcomeEmail(email, name) {

    try {

      await emailClient.send({
        to     : email,
        from   : 'emailcom@gmail.com',
        subject: 'Thanks for joining in!',
        text   : `Welcome to the app, ${name}. Let me know how you get along with the app.`,
        html   : '<strong>Website.com</strong>',
      });

    } catch (error) {

      errorEmitter.emit(errorEvent, new EmailNotSentError(error));

    }

  },
  async sendCancellationEmail(email, name) {

    try {

      await emailClient.send({
        to     : email,
        from   : 'emailcom@gmail.com',
        subject: 'Thanks for joining in!',
        text   : `Goodbye, ${name}. I hope to see you back sometime soon.`,
        html   : '<strong>Website.com</strong>',
      });

    } catch (error) {

      errorEmitter.emit(errorEvent, new EmailNotSentError(error));

    }

  }
});

const sendEmails = sender(sgMail);

module.exports = sendEmails;
