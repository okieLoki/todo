const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Todo = require('../models/todo');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Route to create a new todo item
router.post('/', authMiddleware, async (req, res) => {
    const { title, description } = req.body;
    const id = uuidv4();
    const todo = new Todo({ id, title, description, user: req.user._id });
    await todo.save();
    res.json({ success: true, id });
});

module.exports = router;
