const mail = require('../libs/mail');

const appMail = 'Test <test@mail.com>';

module.exports = {
  key: 'RegistrationMail',
  options: {
    delay: 5000,
    attempts: 3
  },
  async handle({ data }) {
    const { name, email } = data;
    await mail.sendMail({
      from: appMail,
      to: `${name} <${email}>`,
      subject: 'User registred successfully',
      html: `
      <div>
        <h3>You have been sucessfully registered</h3>
      </div>
      `
    });
  }
};
