import express from 'express'
import upload from '../middleware/upload.middleware.js'
import { uploadAvatarHandler } from '../controllers/upload.controller.js'
import { authenticateToken } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/v1/upload', authenticateToken, upload.single('avatar'), uploadAvatarHandler)

export default router