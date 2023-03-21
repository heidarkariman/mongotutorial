const Todo = require('../models/todo');

async function getTodos(req, res) {
  try {
    const todos = await Todo.find({});
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getTodoById(req, res) {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function createTodo(req, res) {
  const { title, description, completed, user } = req.body;
  const todo = new Todo({ title, description, completed, user });
  try {
    await todo.save();
    res.status(201).json({ id: todo._id });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateTodo(req, res) {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  try {
    const todo = await Todo.findByIdAndUpdate(id, { title, description, completed });
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(200).json({ message: 'Todo updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteTodo(req, res) {
  const { id } = req.params;
  try {
    const result = await Todo.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { getTodos, getTodoById, createTodo, updateTodo, deleteTodo };
