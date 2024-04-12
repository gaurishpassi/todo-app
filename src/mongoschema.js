import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://admin:EiwmN2HT5v4wSPJp@cluster0.hlru40m.mongodb.net/');

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
    default: false,
  },
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
