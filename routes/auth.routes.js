import express from 'express'
import { register, activateUser, login } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/v1/register', register)
router.get('/v1/activation', activateUser)
router.post('/v1/login', login)

export default router