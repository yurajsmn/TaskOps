require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Project = require('./models/Project');
const Task = require('./models/Task');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('Connected to DB for seeding...');

        // Clear existing
        await Project.deleteMany({});
        await Task.deleteMany({});
        await User.deleteMany({});

        // Insert Users
        const salt = await bcrypt.genSalt(10);
        const adminPassword = await bcrypt.hash('admin123', salt);
        const memberPassword = await bcrypt.hash('member123', salt);

        const users = await User.insertMany([
            { name: 'Admin User', email: 'admin@taskops.com', password: adminPassword, role: 'Admin' },
            { name: 'Member User', email: 'member@taskops.com', password: memberPassword, role: 'Member' }
        ]);

        const adminId = users[0]._id;
        const memberId = users[1]._id;

        // Insert Projects
        const projects = await Project.insertMany([
            {
                name: 'Project Alpha',
                department: 'Engineering',
                status: 'Active',
                progress: 68,
                dueDate: 'Oct 24',
                teamCount: 1,
                members: [memberId],
                createdBy: adminId
            },
            {
                name: 'Project Beta',
                department: 'Design',
                status: 'On Hold',
                progress: 42,
                dueDate: 'Nov 12',
                teamCount: 0,
                members: [],
                createdBy: adminId
            },
            {
                name: 'Project Gamma',
                department: 'Security',
                status: 'Completed',
                progress: 100,
                dueDate: 'Finished',
                teamCount: 0,
                members: [],
                createdBy: adminId
            }
        ]);

        const projectAlphaId = projects[0]._id;
        const projectBetaId = projects[1]._id;

        // Insert Tasks
        await Task.insertMany([
            { title: 'Design Database Schema', status: 'todo', priority: 'High', project: projectAlphaId, assignee: memberId },
            { title: 'Implement Auth API', status: 'in-progress', priority: 'High', project: projectAlphaId, assignee: adminId },
            { title: 'Write Unit Tests', status: 'todo', priority: 'Medium', project: projectBetaId, assignee: memberId },
            { title: 'Deploy to Staging', status: 'done', priority: 'High', project: projectAlphaId, assignee: adminId }
        ]);

        console.log('Database seeded successfully!');
        mongoose.disconnect();
    })
    .catch(err => console.error('Seeding error:', err));
