CREATE DATABASE vide_belajar;
USE vide_belajar;

CREATE TABLE tb_user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20),
		status VARCHAR(25),
		token VARCHAR(150),
		avatar VARCHAR(150),
    password VARCHAR(255),
    created_at DATETIME,
    updated_at DATETIME
);

CREATE TABLE tb_order (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT,
    id_kelas INT,
    metode_pembayaran VARCHAR(50),
    bank VARCHAR(50),
    ewallet VARCHAR(50),
    kartu_kredit VARCHAR(50),
    biaya_admin DECIMAL(10,2),
    harga_produk DECIMAL(10,2),
    diskon DECIMAL(10,2),
    total_pembayaran DECIMAL(10,2),
    status VARCHAR(50),
    tanggal_order DATETIME,
    tanggal_bayar DATETIME NULL
);

CREATE TABLE tb_pretest (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT,
    id_order INT,
    id_master_soal INT,
    jawaban_user CHAR(1),
    is_benar BOOLEAN,
    waktu_jawab DATETIME,
    created_at DATETIME
);

CREATE TABLE tb_master_soal (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_kelas INT,
    nomor_soal INT,
    pertanyaan TEXT,
    pilihan_a TEXT,
    pilihan_b TEXT,
    pilihan_c TEXT,
    pilihan_d TEXT,
    jawaban_benar CHAR(1),
    created_at DATETIME,
    updated_at DATETIME
);

CREATE TABLE tb_kelas_saya (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_order INT,
    id_user INT,
    progress VARCHAR(50),
    sertifikat VARCHAR(100),
    created_at DATETIME,
    updated_at DATETIME
);

CREATE TABLE tb_kategori_kelas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    kategori VARCHAR(255),
    created_at DATETIME,
    updated_at DATETIME
);

CREATE TABLE tb_kelas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nama_kelas VARCHAR(255),
    deskripsi TEXT,
    id_tutor INT,
    rating DECIMAL(3,1),
    jumlah_review INT,
    harga VARCHAR(50),
    id_kategori_kelas INT,
    bahasa VARCHAR(50),
    created_at DATETIME,
    updated_at DATETIME
);

CREATE TABLE tb_materi (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_kelas INT,
    judul_materi VARCHAR(255),
    tipe_materi VARCHAR(50),
    durasi_menit INT,
    urutan INT
);

CREATE TABLE tb_tutor (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nama_tutor VARCHAR(255),
    pekerjaan VARCHAR(50),
    tempat_kerja INT,
    created_at DATETIME,
    updated_at DATETIME
);

CREATE TABLE tb_review (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_kelas INT,
    id_user INT,
    nama_reviewer VARCHAR(255),
    batch VARCHAR(50),
    review_text TEXT,
    rating DECIMAL(2,1),
    created_at DATETIME
);

CREATE TABLE tb_include_kelas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_kelas INT,
    icon VARCHAR(50),
    keterangan VARCHAR(255),
    created_at DATETIME,
    updated_at DATETIME
);
