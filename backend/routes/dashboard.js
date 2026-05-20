const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Task = require('../models/Task');
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
        let projectQuery = { status: 'Active' };
        let taskQuery = { status: 'done' };
        
        if (req.user && req.user.role !== 'Admin') {
            taskQuery.assignee = req.user._id;
            projectQuery.members = req.user._id;
        }

        const activeProjects = await Project.countDocuments(projectQuery);
        const completedTasks = await Task.countDocuments(taskQuery);
        const teamMembers = await User.countDocuments();

        res.json({
            stats: {
                activeProjects: activeProjects || 0,
                completedTasks: completedTasks || 0,
                teamMembers: teamMembers || 0,
                upcomingDeadlines: 3
            },
            recentActivity: [
                { id: 1, action: 'Project Created', target: 'Website Redesign', time: '2 hours ago' },
                { id: 2, action: 'Task Completed', target: 'Update API docs', time: '4 hours ago' },
                { id: 3, action: 'Member Added', target: 'John Doe', time: '1 day ago' }
            ]
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
