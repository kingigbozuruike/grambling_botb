const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const app = express();
connectDB();

app.use(express.json({ extended: false }));
app.use(cors());

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/ads', require('./routes/api/ads'));
app.use('/api/interactions', require('./routes/api/interactions'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || process.env.npm_package_config_port || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));