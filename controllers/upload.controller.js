import { updateUserAvatar } from '../models/users.js'

export async function uploadAvatarHandler(req, res, next) {
  try {
    const userId = req.user.id 
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }
    
    const result = await updateUserAvatar(userId, req.file.filename)
    if (result === 0) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({
      message: 'Avatar uploaded successfully',
      filename: req.file.filename
    })
  } catch (error) {
    next(error)
  }
}