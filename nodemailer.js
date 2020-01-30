const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    logger: true,
    debug: true,
    auth: {
        user: 'dipndry2020@gmail.com',
        pass: 'DipNDry2020'
    }
});

module.exports = transporter