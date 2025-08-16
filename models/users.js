import pool from '../lib/db.js'

export async function createUser({ full_name, email, phone, status, password, token }) {
  const sql = `
    INSERT INTO tb_user (full_name, email, phone, status, password, token)
    VALUES (?, ?, ?, ?, ?, ?)
  `
  const [result] = await pool.query(sql, [full_name, email, phone, "Pending", password, token])
  return {
    id: result.insertId,
    full_name,
    email,
    phone
  }
}

export async function getUserByEmail(email) {
  const sql = `SELECT * FROM tb_user WHERE email = ?`
  const [rows] = await pool.query(sql, [email])
  return rows[0]
}

export async function getUserByPhone(phone) {
  const sql = `SELECT * FROM tb_user WHERE phone = ?`
  const [rows] = await pool.query(sql, [phone])
  return rows[0]
}