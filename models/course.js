import pool from '../lib/db.js'

export async function getCourses({ category, sortBy, sortOrder = 'ASC', search }) {
  let sql = `
    SELECT
      tb_kelas.id,
      tb_kelas.nama_kelas,
      tb_kelas.deskripsi,
      tb_tutor.nama_tutor,
      tb_tutor.pekerjaan,
      tb_tutor.tempat_kerja,
      tb_kelas.rating,
      tb_kelas.harga,
      tb_kategori_kelas.kategori,
      tb_kelas.bahasa
    FROM
      tb_kelas
    INNER JOIN tb_tutor ON tb_kelas.id_tutor = tb_tutor.id
    INNER JOIN tb_kategori_kelas ON tb_kelas.id_kategori_kelas = tb_kategori_kelas.id
  `
  
  // Array untuk kondisi WHERE
  const conditions = []
  const values = []

  // Filter category
  if (category) {
    conditions.push(`tb_kategori_kelas.kategori = ?`)
    values.push(category)
  }

  // Search nama_kelas
  if (search) {
    conditions.push(`tb_kelas.nama_kelas LIKE ?`)
    values.push(`%${search}%`)
  }

  // Tambahkan WHERE jika ada kondisi
  if (conditions.length > 0) {
    sql += ` WHERE ` + conditions.join(' AND ')
  }

  // Validasi sortBy agar aman, hanya boleh kolom tertentu
  const allowedSortBy = ['harga', 'rating', 'nama_kelas', 'kategori']
  if (sortBy && allowedSortBy.includes(sortBy)) {
    // Validasi urutan naik/turun
    sortOrder = (sortOrder && sortOrder.toUpperCase() === 'DESC') ? 'DESC' : 'ASC'
    sql += ` ORDER BY ${sortBy} ${sortOrder}`
  }

  const [rows] = await pool.query(sql, values)
  return rows
}