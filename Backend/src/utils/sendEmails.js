const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

transporter.verify((err) => {
    if (err) {
        console.error("Verification failed:", err);
    } else {
        console.log("Server is ready to take our messages");
    }
});


const sendOtpEmail = async (email, otp) => {

    const mailOption = {
        from: `"Example email" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'otp verification code',
        text: `here is your verification code : ${otp}`
    }

    try {
        const info = await transporter.sendMail(mailOption);
        console.log("message sent ", info.messageId)
    } catch (err) {
        console.error("error while sending email : ", err);
        // throw err;
    }
}

module.exports = sendOtpEmail;