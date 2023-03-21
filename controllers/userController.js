const User = require('../models/user');

async function getUsers(req, res) {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}


async function createUser(req, res) {
  const { name, email, age } = req.body;
  const user = new User({ name, email, age });
  try {
    await user.save();
    res.status(201).json({ id: user._id });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}


async function updateUser(req, res) {
  const { id } = req.params;
  const { name, email, age } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, { name, email, age });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const result = await User.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
