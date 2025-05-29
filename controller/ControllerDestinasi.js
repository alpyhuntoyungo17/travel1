const Item = require('../models/ModelDestinasi');

const itemController = {
  // Create new item
  createItem: async (req, res) => {
    try {
      const { nama, tempat, lokasi, gambar, deskripsi } = req.body;
      
      // Validasi input lebih lengkap
      if (!nama || !nama.trim()) {
        return res.status(400).json({ 
          success: false,
          message: 'Nama destinasi harus diisi' 
        });
      }
      
      if (!deskripsi || !deskripsi.trim()) {
        return res.status(400).json({ 
          success: false,
          message: 'Deskripsi destinasi harus diisi' 
        });
      }

      const id = await Item.create({ 
        nama: nama.trim(), 
        tempat: tempat ? tempat.trim() : null, 
        lokasi: lokasi ? lokasi.trim() : null, 
        gambar, 
        deskripsi: deskripsi.trim() 
      });
      
      res.status(201).json({
        success: true,
        message: 'Destinasi berhasil dibuat',
        data: { id }
      });
    } catch (err) {
      console.error('Error creating item:', err);
      res.status(500).json({ 
        success: false,
        message: 'Gagal membuat destinasi',
        error: err.message 
      });
    }
  },

  // Get all items
  getAllItems: async (req, res) => {
    try {
      const items = await Item.getAll();
      
      res.json({
        success: true,
        message: items.length > 0 ? 'Data destinasi ditemukan' : 'Tidak ada data destinasi',
        count: items.length,
        data: items
      });
    } catch (err) {
      console.error('Error getting items:', err);
      res.status(500).json({ 
        success: false,
        message: 'Gagal mengambil data destinasi',
        error: err.message 
      });
    }
  },

  // Get item by ID
  getItemById: async (req, res) => {
    try {
      const item = await Item.getById(req.params.id);
      
      if (!item) {
        return res.status(404).json({ 
          success: false,
          message: 'Destinasi tidak ditemukan' 
        });
      }
      
      res.json({
        success: true,
        message: 'Destinasi ditemukan',
        data: item
      });
    } catch (err) {
      console.error('Error getting item:', err);
      res.status(500).json({ 
        success: false,
        message: 'Gagal mengambil data destinasi',
        error: err.message 
      });
    }
  },

  // Update item
  updateItem: async (req, res) => {
    try {
      const { id } = req.params;
      const { nama, tempat, lokasi, gambar, deskripsi } = req.body;
      
      // Validasi input
      if (!nama || !nama.trim() || !deskripsi || !deskripsi.trim()) {
        return res.status(400).json({ 
          success: false,
          message: 'Nama dan deskripsi harus diisi' 
        });
      }
      
      // Cek apakah item ada
      const existingItem = await Item.getById(id);
      if (!existingItem) {
        return res.status(404).json({ 
          success: false,
          message: 'Destinasi tidak ditemukan' 
        });
      }
      
      await Item.update(id, { 
        nama: nama.trim(), 
        tempat: tempat ? tempat.trim() : null, 
        lokasi: lokasi ? lokasi.trim() : null, 
        gambar, 
        deskripsi: deskripsi.trim() 
      });
      
      res.json({
        success: true,
        message: 'Destinasi berhasil diperbarui',
        data: { id }
      });
    } catch (err) {
      console.error('Error updating item:', err);
      res.status(500).json({ 
        success: false,
        message: 'Gagal memperbarui destinasi',
        error: err.message 
      });
    }
  },

  // Delete item
  deleteItem: async (req, res) => {
    try {
      const { id } = req.params;
      
      // Cek apakah item ada
      const existingItem = await Item.getById(id);
      if (!existingItem) {
        return res.status(404).json({ 
          success: false,
          message: 'Destinasi tidak ditemukan' 
        });
      }
      
      await Item.delete(id);
      
      res.json({
        success: true,
        message: 'Destinasi berhasil dihapus',
        data: { id }
      });
    } catch (err) {
      console.error('Error deleting item:', err);
      res.status(500).json({ 
        success: false,
        message: 'Gagal menghapus destinasi',
        error: err.message 
      });
    }
  },

  // Search items by name
  searchItems: async (req, res) => {
    try {
      const { keyword } = req.query; // Mengubah dari params ke query
      
      if (!keyword || keyword.trim() === '') {
        return res.status(400).json({ 
          success: false,
          message: 'Kata kunci pencarian harus diisi' 
        });
      }
      
      const items = await Item.searchByName(keyword.trim());
      
      res.json({
        success: true,
        message: items.length > 0 
          ? `Ditemukan ${items.length} destinasi` 
          : 'Tidak ditemukan destinasi',
        count: items.length,
        data: items
      });
    } catch (err) {
      console.error('Error searching items:', err);
      res.status(500).json({ 
        success: false,
        message: 'Gagal melakukan pencarian',
        error: err.message 
      });
    }
  }
};

module.exports = itemController;