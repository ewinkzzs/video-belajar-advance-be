import { getCourses } from '../models/course.js'

export async function getCourseList(req, res, next) {
  try {
    const { category, sortBy, sortOrder, search } = req.query

    const courses = await getCourses({
      category,
      sortBy,
      sortOrder,
      search
    })

    res.json({
      status: 'success',
      results: courses.length,
      data: courses
    })
  } catch (error) {
    next(error)
  }
}