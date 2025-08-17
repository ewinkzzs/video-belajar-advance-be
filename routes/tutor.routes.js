import express from 'express'
import {
  getAllTutors,
  getTutorByIdHandler,
  createTutorHandler,
  updateTutorHandler,
  deleteTutorHandler
} from '../controllers/tutor.controller.js'

import { authenticateToken } from '../middleware/auth.middleware.js'

const router = express.Router()

// Pasang middleware authenticateToken pada seluruh route tutor
router.use(authenticateToken)

router.get('/v1/tutor', getAllTutors)
router.get('/v1/tutor/:id', getTutorByIdHandler)
router.post('/v1/tutor', createTutorHandler)
router.put('/v1/tutor/:id', updateTutorHandler)
router.delete('/v1/tutor/:id', deleteTutorHandler)

export default router