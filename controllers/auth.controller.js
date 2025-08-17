import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import mailTransporter from '../lib/mailer.js'
import { createUser, getUserByEmail, getUserByPhone, activateUserByToken } from '../models/users.js'
import dotenv from 'dotenv'

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

export async function activateUser(req, res, next) {
  try {
    const { token } = req.query
    if (!token) {
      return res.status(400).json({ message: 'Token is required for activation' })
    }

    const user = await activateUserByToken(token)
    if (!user) {
      return res.status(404).json({ message: 'Invalid or expired token' })
    }

    res.json({ message: 'User activated successfully, you can now login.' })
  } catch (error) {
    next(error)
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const user = await getUserByEmail(email)
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Cek status user harus aktif
    if (user.status !== 'Active') {
      return res.status(403).json({ message: 'User is not activated yet' })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Buat token JWT
    const payload = {
      id: user.id,
      email: user.email,
      full_name: user.full_name
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1h'
    })

    res.json({
      message: "Login successful",
      token
    })

  } catch (error) {
    next(error)
  }
}