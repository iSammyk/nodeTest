const nodemailer  = require("nodemailer")

const sendMail = async(email, username) =>{
  const contactTemplate = ` Hello there ${username}, Welcome to our website what is the size of your kini before we proceed`


  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL,
        pass: process.env.PASS
    },
  })
  const mailOptions = {
    from: process.env.GMAIL,
    to: email,
    text: "iSammy",
    subject: "Richest Devs",
    html: contactTemplate
  }
  try {
    await transporter.sendMail(mailOptions)
    console.log("Email sent succesfully");
  } catch (error) {
    console.log("Error sending email", error);
    throw error
  }
}

module.exports = {sendMail}