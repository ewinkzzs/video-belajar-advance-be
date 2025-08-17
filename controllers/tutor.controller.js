import {
  getTutor,
  getTutorById,
  createTutor,
  updateTutor,
  deleteTutor
} from '../models/tutor.js'

export async function getAllTutors(req, res, next) {
  try {
    const tutors = await getTutor()
    res.json(tutors)
  } catch (error) {
    next(error)
  }
}

export async function getTutorByIdHandler(req, res, next) {
  try {
    const id = req.params.id
    const tutor = await getTutorById(id)
    if (!tutor) {
      return res.status(404).json({ error: 'Tutor not found' })
    }
    res.json(tutor)
  } catch (error) {
    next(error)
  }
}

export async function createTutorHandler(req, res, next) {
  try {
    const { nama_tutor, pekerjaan, tempat_kerja } = req.body
    if (!nama_tutor || !pekerjaan || !tempat_kerja) {
      return res.status(400).json({ error: 'All fields are required' })
    }
    const tutor = await createTutor(nama_tutor, pekerjaan, tempat_kerja)
    res.status(201).json(tutor)
  } catch (error) {
    next(error)
  }
}

export async function updateTutorHandler(req, res, next) {
  try {
    const id = req.params.id
    const { nama_tutor, pekerjaan, tempat_kerja } = req.body
    const existingTutor = await getTutorById(id)
    if (!existingTutor) {
      return res.status(404).json({ error: 'Tutor not found' })
    }
    const updatedTutor = await updateTutor(id, nama_tutor, pekerjaan, tempat_kerja)
    res.json(updatedTutor)
  } catch (error) {
    next(error)
  }
}

export async function deleteTutorHandler(req, res, next) {
  try {
    const id = req.params.id
    const existingTutor = await getTutorById(id)
    if (!existingTutor) {
      return res.status(404).json({ error: 'Tutor not found' })
    }
    await deleteTutor(id)
    res.status(204).send()
  } catch (error) {
    next(error)
  }
}