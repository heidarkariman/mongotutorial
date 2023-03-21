const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const todoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

todoSchema.plugin(AutoIncrement, { inc_field: 'todoId' });

module.exports = mongoose.model('Todo', todoSchema);
