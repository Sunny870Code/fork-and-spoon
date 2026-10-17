// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//     service: "Gmail",
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//     }
// });

// transporter.verify((err) => {
//     if (err) {
//         console.error("Verification failed:", err);
//     } else {
//         console.log("Server is ready to take our messages");
//     }
// });


// const sendOtpEmail = async (email, otp) => {

//     const mailOption = {
//         from: `"Example email" <${process.env.EMAIL_USER}>`,
//         to: email,
//         subject: 'otp verification code',
//         text: `here is your verification code : ${otp}`
//     }

//     try {
//         const info = await transporter.sendMail(mailOption);
//         console.log("message sent ", info.messageId)
//     } catch (err) {
//         console.error("error while sending email : ", err);
//         // throw err;
//     }
// }

// module.exports = sendOtpEmail;
const { Resend } = require('resend');

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

const sendOTPEmail = async (email, otp) => {
    try {
        const data = await resend.emails.send({
            // During testing/free tier, Resend provides onboarding@resend.dev
            // Later you can verify your own custom domain
            from: 'Fork & Spoon <onboarding@resend.dev>', 
            to: [email],
            subject: 'Your Fork & Spoon Verification Code',
            html: `
              <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                <h2 style="color: #506650;">Welcome to Fork & Spoon!</h2>
                <p>Your verification code for registration is:</p>
                <div style="background: #faf9f6; padding: 15px; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #171914; display: inline-block; border-radius: 5px;">
                  ${otp}
                </div>
                <p style="margin-top: 20px; font-size: 12px; color: #666;">This code will expire shortly. Do not share it with anyone.</p>
              </div>
            `
        });

        console.log("Email sent successfully:", data);
        return { success: true, data };
    } catch (error) {
        console.error("Error sending email via Resend:", error);
        return { success: false, error };
    }
};

module.exports = { sendOTPEmail };