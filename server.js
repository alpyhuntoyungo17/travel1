const express = require('express')
const port = 4000;
const cors = require('cors');
const bodyParser = require('body-parser')
const itemRoutes = require('./routes/destinasi.js');
const db = require('./db.js')

console.log('Testing DB', db)

const app = express();


app.use(cors());
app.use(bodyParser.json());

app.use('/api/items', itemRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});