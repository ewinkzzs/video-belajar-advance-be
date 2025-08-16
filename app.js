import express from 'express'

import { getTutor, getTutorById, createTutor, updateTutor, deleteTutor } from './database.js'

const app = express()

app.use(express.json())

app.get("/tutor", async (req, res) => {
  const tutor = await getTutor()
  res.send(tutor)
})

app.get("/tutor/:id", async (req, res) => {
  const id = req.params.id
  const tutor = await getTutorById(id)
  res.send(tutor)
})

app.post("/tutor", async (req, res) => {
  const { nama_tutor, pekerjaan, tempat_kerja } = req.body
  const tutor = await createTutor(nama_tutor, pekerjaan, tempat_kerja)
  res.status(201).send(tutor)
})

app.put("/tutor/:id", async (req, res) => {
  const id = req.params.id
  const { nama_tutor, pekerjaan, tempat_kerja } = req.body
  const existingTutor = await getTutorById(id)
  if(!existingTutor) {
    return res.status(404).send({ error: "Tutor not found" })
  }
  const updatedTutor = await updateTutor(id, nama_tutor, pekerjaan, tempat_kerja)
  res.send(updatedTutor)
})

app.delete("/tutor/:id", async (req, res) => {
  const id = req.params.id
  const existingTutor = await getTutorById(id)
  if(!existingTutor) {
    return res.status(404).send({ error: "Tutor not found" })
  }
  await deleteTutor(id)
  res.status(204).send()
})


app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke 💩')
})

app.listen(8080, () => {
  console.log('Server is running on port 8080')
})