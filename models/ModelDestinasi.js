const db = require('../db');
const { promisify } = require('util');

// Promisify query untuk async/await
const query = promisify(db.query).bind(db);

class Item {
  // Create
  static async create({ nama, tempat, lokasi, gambar, deskripsi }) {
    const sql = 'INSERT INTO destinasi (nama, tempat, lokasi, gambar, deskripsi) VALUES (?, ?, ?, ?, ?)';
    const result = await query(sql, [nama, tempat, lokasi, gambar, deskripsi]);
    return result.insertId;
  }

  // Read all
  static async getAll() {
    const sql = 'SELECT * FROM destinasi';
    return await query(sql);
  }

  // Read by ID
  static async getById(id) {
    const sql = 'SELECT * FROM destinasi WHERE id = ?';
    const rows = await query(sql, [id]);
    return rows[0] || null;
  }

  // Update
  static async update(id, { nama, tempat, lokasi, gambar, deskripsi }) {
    const sql = 'UPDATE destinasi SET nama = ?, tempat = ?, lokasi = ?, gambar = ?, deskripsi = ? WHERE id = ?';
    await query(sql, [nama, tempat, lokasi, gambar, deskripsi, id]);
    return true;
  }

  // Delete
  static async delete(id) {
    const sql = 'DELETE FROM destinasi WHERE id = ?';
    await query(sql, [id]);
    return true;
  }

  // Search by name
  static async searchByName(keyword) {
    const sql = 'SELECT * FROM destinasi WHERE nama LIKE ?';
    return await query(sql, [`%${keyword}%`]);
  }
}
// console.log('cek item', Item)
module.exports = Item;