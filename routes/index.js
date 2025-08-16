import express from 'express'
import authRoutes from './auth.routes.js'
// import routes lain jika ada

const router = express.Router()

router.use(authRoutes)

export default router