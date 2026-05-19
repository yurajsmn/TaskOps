const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find().populate('project').populate('assignee');
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const task = new Task(req.body);
    try {
        const newTask = await task.save();
        const populatedTask = await Task.findById(newTask._id).populate('project').populate('assignee');
        res.status(201).json(populatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
