import pool from '../lib/db.js'

// Fungsi database untuk CRUD tutor
export async function getTutor() {
  const [rows] = await pool.query('SELECT * FROM tb_tutor')
  return rows
}

export async function getTutorById(id) {
  const [rows] = await pool.query('SELECT * FROM tb_tutor WHERE id = ?', [id])
  return rows[0]
}

export async function createTutor(nama_tutor, pekerjaan, tempat_kerja) {
  const [result] = await pool.query(
    'INSERT INTO tb_tutor (nama_tutor, pekerjaan, tempat_kerja) VALUES (?, ?, ?)',
    [nama_tutor, pekerjaan, tempat_kerja]
  )
  return getTutorById(result.insertId)
}

export async function updateTutor(id, nama_tutor, pekerjaan, tempat_kerja) {
  await pool.query(
    'UPDATE tb_tutor SET nama_tutor = ?, pekerjaan = ?, tempat_kerja = ? WHERE id = ?',
    [nama_tutor, pekerjaan, tempat_kerja, id]
  )
  return getTutorById(id)
}

export async function deleteTutor(id) {
  const [result] = await pool.query('DELETE FROM tb_tutor WHERE id = ?', [id])
  return result.affectedRows
}