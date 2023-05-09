const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const todoSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  title: { type: String, required: true },
  description: { type: String },
  done: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});


const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
