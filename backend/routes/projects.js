const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { verifyAdmin } = require('../middleware/auth');

router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().populate('members', 'name email role');
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', verifyAdmin, async (req, res) => {
    const project = new Project({
        name: req.body.name,
        department: req.body.department,
        status: req.body.status,
        progress: req.body.progress,
        dueDate: req.body.dueDate,
        teamCount: req.body.teamCount,
        members: req.body.members || [],
        createdBy: req.user._id
    });

    try {
        const newProject = await project.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', verifyAdmin, async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProject) return res.status(404).json({ message: 'Project not found' });
        res.json(updatedProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/:id/members', verifyAdmin, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        
        if (project.createdBy.toString() !== req.user._id) {
            return res.status(403).json({ message: 'Only the project creator can add members' });
        }
        
        const { userId } = req.body;
        if (!userId) return res.status(400).json({ message: 'User ID is required' });
        
        if (!project.members.includes(userId)) {
            project.members.push(userId);
            project.teamCount = project.members.length;
            await project.save();
        }
        
        const updatedProject = await Project.findById(req.params.id).populate('members', 'name email role');
        res.json(updatedProject);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:id', verifyAdmin, async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json({ message: 'Project deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
