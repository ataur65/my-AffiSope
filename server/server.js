// server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const busboy = require('busboy');
const path = require('path');
const fs = require('fs');

dotenv.config({ path: path.resolve(__dirname, '..', '.env.local') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-filename'],
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

const productRoutes = require('./routes/productRoutes');
const blogRoutes = require('./routes/blogRoutes');
const searchRoutes = require('./routes/searchRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const megaDiscountsRoutes = require('./routes/megaDiscountsRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const contactRoutes = require('./routes/contactRoutes');
const contactSettingsRoutes = require('./routes/contactSettingsRoutes');
const themeSettingsRoutes = require('./routes/themeSettingsRoutes');
const footerSettingsRoutes = require('./routes/footerSettingsRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const authRoutes = require('./routes/authRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const socialLinksRoutes = require('./routes/socialLinksRoutes');
const menuItemsRoutes = require('./routes/menuItemsRoutes');

// Basic Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/mega-discounts', megaDiscountsRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/settings/contact', contactSettingsRoutes);
app.use('/api/settings/theme', themeSettingsRoutes);
app.use('/api/settings/footer', footerSettingsRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/sociallinks', socialLinksRoutes);
app.use('/api/menuitems', menuItemsRoutes);

app.post('/api/upload', (req, res, next) => {
  console.log('--- /api/upload test route hit ---');
  next(); // Pass control to the next handler
});

app.post('/api/upload', (req, res) => {
  console.log('--- /api/upload route hit ---');
  console.log('Upload request received.');
  const bb = busboy({ headers: req.headers });
  const uploadedFiles = []; // Array to store uploaded file names

  bb.on('file', (fieldname, file, filename, encoding, mimetype) => {
    console.log('File received:', filename.filename);
    const fileName = filename.filename;
    const saveTo = path.join(__dirname, '..', 'public', 'img', fileName);
    const writeStream = fs.createWriteStream(saveTo);
    file.pipe(writeStream);

    writeStream.on('error', (err) => {
      console.error('File stream error:', err);
      // Indicate error for this file, prevent 'finish' from sending success
      req.unpipe(bb); // Stop processing further files for this request
      return res.status(500).json({ success: false, message: 'Failed to write file to disk.' });
    });
    uploadedFiles.push(`/img/${fileName}`); // Store the URL
  });

  bb.on('finish', () => {
    console.log('Busboy finished. Uploaded files:', uploadedFiles);
    res.json({ success: true, urls: uploadedFiles }); // Return array of URLs
  });

  req.pipe(bb);
});



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    message: err.message || 'An unexpected error occurred',
    error: process.env.NODE_ENV === 'production' ? {} : err.stack,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});