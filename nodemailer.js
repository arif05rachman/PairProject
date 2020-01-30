const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    host: 'smtp.zoho.eu',
    port: 465,
    secure: true,
    logger: true,
    debug: true,
    auth: {
        user: 'dipndry2020@gmail.com',
        pass: 'DipNDry2020'
    }
});

transporter = nodemailer.createTransport({
    service: 'gmail',
    logger: true,
    debug: true,
    auth: {
        user: 'dipndry2020@gmail.com',
        pass: 'DipNDry2020'
    }
});


const mailOptions = {
    from: 'dipndry2020@gmail.com',
    to: 'hafizulrifkihawari@gmail.com',
    subject: 'Test sending email node',
    text: 'Hello World!',
    // html: ''
}

transporter.sendMail(mailOptions, (err, info) => {
    if(err){
        console.log(err)
    } else {
        console.log('Mail sent:' + info.response)
    }
})