const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Todo = require('../models/todo');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  // userId: { type: Number, unique: true },  
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }]
});

// userSchema.plugin(AutoIncrement, { inc_field: 'userId' });

module.exports = mongoose.model('User', userSchema);
