const express = require('express');
const Todo = require('../models/todo');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// all to do items
router.get('/', authMiddleware, async (req, res) => {
    const todos = await Todo.find({ user: req.user._id });
    res.json(todos);
});



// delete todo items
router.delete('/delete/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const todo = await Todo.findOne({ _id: id, user: req.user._id });
    if (todo) {
        await Todo.findByIdAndDelete(todo._id);
        res.json({ success: true });
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});


// update todo item status
router.put('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const todo = await Todo.findOne({ _id: id, user: req.user._id });
    if (todo) {
        if(todo.done === true) todo.done = false
        else todo.done = true
        await todo.save();
        res.json({ success: true });
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

module.exports = router;
