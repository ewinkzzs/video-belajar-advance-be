import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import mailTransporter from '../lib/mailer.js'
import { createUser, getUserByEmail, getUserByPhone } from '../models/users.js'

export async function register(req, res, next) {
  try {
    const { full_name, email, phone, password } = req.body

    if (!full_name || !email || !phone || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' })
    }

    const existingPhoneUser = await getUserByPhone(phone)
    if (existingPhoneUser) {
      return res.status(409).json({ message: 'Phone number already registered' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const token = crypto.randomUUID()

    const user = await createUser({
      full_name,
      email,
      phone,
      password: hashedPassword,
      token
    })

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Pendaftaran Pengguna",
      text: "Klik berikut untuk melakukan aktivasi pengguna: http://localhost:8080/api/v1/activation?token=" + token,
    };

    try {
      const mailerInfo = await mailTransporter.sendMail(mailOptions);
      console.log('Activation email sent:', mailerInfo);
    } catch (mailError) {
      console.error('Error sending activation email:', mailError);
      // Bisa pilih apakah tetap lanjut respon sukses atau return error disini
    }

    res.status(201).json({
      message: "User registered successfully",
      user
    })
  } catch (error) {
    next(error)
  }
}