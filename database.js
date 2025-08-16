import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise()

export async function getTutor() {
  const [rows] = await pool.query("SELECT * FROM tb_tutor")
  return rows
}

export async function getTutorById(id) {
  const [rows] = await pool.query(`
  SELECT * 
  FROM tb_tutor
  WHERE id = ?
  `, [id])
  return rows[0]
}

export async function createTutor(nama_tutor, pekerjaan, tempat_kerja) {
  const [result] = await pool.query(`
  INSERT INTO tb_tutor (nama_tutor, pekerjaan, tempat_kerja)
  VALUES (?, ?, ?)
  `, [nama_tutor, pekerjaan, tempat_kerja])
  const id = result.insertId
  return getTutorById(id)
}

export async function updateTutor(id, nama_tutor, pekerjaan, tempat_kerja) {
  await pool.query(`
    UPDATE tb_tutor 
    SET nama_tutor = ?, pekerjaan = ?, tempat_kerja = ?
    WHERE id = ?
  `, [nama_tutor, pekerjaan, tempat_kerja, id])
  
  return getTutorById(id)
}

export async function deleteTutor(id) {
  const [result] = await pool.query(`
    DELETE FROM tb_tutor WHERE id = ?
  `, [id])
  return result.affectedRows
}