const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const promisify = require('es6-promisify');

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

exports.send = async (options) => {
    const mailOptions = {
        from: `John Prowell <noreply@>`
    }

}

// Test email

// transport.sendMail({
//     from: 'dt <dtroxx@gmail.com>',
//     to: 'fake@email.com',
//     subject: 'Just testing email',
//     html: 'Hey I <strong>like</strong> this email!',
//     text: 'Hey I like this email!'
// });