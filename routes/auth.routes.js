import express from 'express'
import { register, activateUser } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/v1/register', register)
router.get('/v1/activation', activateUser)

export default router