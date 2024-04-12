import { useState, useEffect } from 'react';
import axios from 'axios';

const Table = () => {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error(error));
  }, []);

  const toggleTodoCompletion = (id, completed) => {

    axios.put(`http://localhost:3001/todos/${id}`, { completed: !completed })
      .then(() => setTodos(prevTodos => prevTodos.map(todo => todo._id === id ? { ...todo, completed: !completed } : todo)))
      .catch(error => console.error(error));
  };

  const handleAddTodo = async () => {/*
    try {
      const response = await fetch('http://localhost:3001/todos', {
        method: 'POST',
        body: JSON.stringify(newTodoText),
      });
      const data = await response.json();
      setTodos([...todos, { _id: data.id, text: newTodoText, completed: false }]);
      setNewTodoText('');
    } catch (error) {
      console.error('Error:', error);
    }*/
    axios.post('http://localhost:3001/todos', {text: newTodoText} )
      .then(response => {
        setTodos([...todos, { _id: response.data.id, text: newTodoText, completed: false }]);
        setNewTodoText('');
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <input
        type="text"
        value={newTodoText}
        onChange={e => setNewTodoText(e.target.value)}
        placeholder="Enter todo text"
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <table className="min-w-full bg-white">
        {/* Table header */}
        <tbody>
          {todos.map(todo => (
            <tr key={todo._id}>
              <td>{todo.text}</td>
              <td>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodoCompletion(todo._id, todo.completed)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
/*
function App() {
  return (
    <div>
      <Home />
    </div>
  )
}

export default App;*/