import express from 'express';
import mongodb from 'mongodb';
import cors from 'cors';
import Todo from './mongoschema.js'
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post('/todos', async (req, res) => {
  const todo = req.body;
  
  const result = await Todo.create({ text: todo.text, completed: false });
  res.json({ message: 'Todo added successfully', id: result._id });
});

app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  
  await Todo.updateOne(
    { _id: mongodb.ObjectId(id) },
    { $set: { completed } }
  );
  res.json({ message: 'Todo updated successfully' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
