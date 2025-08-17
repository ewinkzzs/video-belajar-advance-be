import express from 'express'
import { getCourseList } from '../controllers/course.controller.js'
import { authenticateToken } from '../middleware/auth.middleware.js'

const router = express.Router()

router.get('/v1/course', authenticateToken, getCourseList)

export default router