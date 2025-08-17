import express from 'express'
import routes from './routes/index.js'
import dotenv from 'dotenv'
import morgan from 'morgan'
// import { getTutor, getTutorById, createTutor, updateTutor, deleteTutor } from './database.js'
dotenv.config()

const app = express()
app.use(morgan('dev'))
app.use(express.json())

// Gunakan semua routes
app.use('/api', routes)

// error handler middleware global
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: 'Internal Server Error' })
})


app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke 💩')
})

app.listen(8080, () => {
  console.log('Server is running on port 8080')
})