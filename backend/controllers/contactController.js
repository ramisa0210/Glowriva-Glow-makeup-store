const Contact = require("../models/contact");
const nodemailer = require("nodemailer");

const submitContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "wazihajannat0210@gmail.com",
      subject: "New Consultation Request",
      text: `Name: ${req.body.name}
Email: ${req.body.email}
Phone: ${req.body.phone}
Message: ${req.body.message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Error sending email." });
      }
      console.log("Email sent: " + info.response);
      res.status(200).json({ message: "Message received and email sent!" });
    });
  } catch (err) {
    res.status(500).json({ message: "Server error. Try again later." });
  }
};

module.exports = { submitContact };