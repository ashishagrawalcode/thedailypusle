// backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// 1. Import Controllers
const authController = require('./controllers/authController');
const noticeController = require('./controllers/noticeController');

// 2. Import Middlewares (The Bouncers)
const { verifyToken, requireAdmin } = require('./middlewares/authMiddleware');

const app = express();
app.use(cors());
app.use(express.json());

// --- PUBLIC ROUTES (No Bouncers) ---
app.post('/api/login', authController.login);
app.post('/api/signup', authController.signup);


// --- PROTECTED ROUTES (Requires Bouncers) ---

// Route 1: Get Notices. 
// Bouncer 1  Controller.
app.get('/api/notices', noticeController.getAllNotices);

// Route 2: Create Notice. 
// Bouncer 1 (Logged in?) -> Bouncer 2 (Admin?) -> Controller.
app.post('/api/notices', verifyToken, requireAdmin, noticeController.createNotice);

// Route 3: Delete Notice. 
// Note the dynamic ':id' wildcard here!
app.delete('/api/notices/:id', verifyToken, requireAdmin, noticeController.deleteNotice);


// Start Engine
app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Engine running on port ${process.env.PORT || 5000}`);
});

const bcrypt = require('bcrypt');
console.log("REAL HASH FOR PASSWORD123: ", bcrypt.hashSync("password123", 10));