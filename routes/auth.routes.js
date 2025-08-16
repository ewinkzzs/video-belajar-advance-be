import express from 'express'
import { register } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/v1/register', register)

export default router