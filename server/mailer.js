import nodemailer from 'nodemailer';

// Create a transporter object using your SMTP configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // or another email service like 'smtp.mailtrap.io'
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // your email password or an app-specific password
  },
});

// Function to send email
const sendEmail = (to, subject, text, html) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // sender address
    to, // receiver's email
    subject, // subject line
    text, // plain text body
    html, // HTML body
  };

  return transporter.sendMail(mailOptions);
};

export default sendEmail;