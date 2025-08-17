import express from 'express'
import authRoutes from './auth.routes.js'
import courseRoutes from './course.routes.js'
import tutorRoutes from './tutor.routes.js'

const router = express.Router()

router.use(authRoutes)
router.use(courseRoutes)
router.use(tutorRoutes) 

export default router