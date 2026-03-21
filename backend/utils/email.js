const nodemailer = require("nodemailer");

const sendWaitlistEmail = async (email) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const mailOptions = {
        from: `"Foundu" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Welcome to the Waitlist!",
        text: "You have been successfully added to our waitlist. We will notify you once we are live!",
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
        <h2 style="color: #333;">Welcome to the Foundu Waitlist!</h2>
        <p>Hi there,</p>
        <p>Thank you for joining our waitlist! We are excited to have you on board.</p>
        <p>You have been successfully added to the waitlist. We will keep you updated on our progress and notify you as soon as we launch.</p>
        <p>Stay tuned!</p>
        <br>
        <p>Best regards,</p>
        <p><strong>The Foundu Team</strong></p>
      </div>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${email}`);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

module.exports = { sendWaitlistEmail };
