require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const projectRoutes = require('./routes/projects');
const dashboardRoutes = require('./routes/dashboard');
const tasksRoutes = require('./routes/tasks');

const authRoutes = require('./routes/auth');
const { verifyToken } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB TaskOps Database'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/projects', verifyToken, projectRoutes);
app.use('/api/dashboard', verifyToken, dashboardRoutes);
    app.use('/api/tasks', verifyToken, tasksRoutes);

const path = require('path');
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
