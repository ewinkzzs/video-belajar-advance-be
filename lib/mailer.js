import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const mailTransporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT) || 587,
  secure: false, // TLS atau SSL
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
})

export default mailTransporter