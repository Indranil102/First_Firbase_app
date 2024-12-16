import './App.css';
import React, { useEffect, useState } from 'react';
import { db } from './firebase.utils';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  doc,
} from 'firebase/firestore';

function App() {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);

  // Retrieve data from Firestore
  useEffect(() => {
    const q = query(collection(db, 'todos'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTodos(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          timestamp: doc.data().timestamp,
        }))
      );
    });

    return () => unsubscribe(); // Cleanup subscription on component unmount
  }, []);

  // Add new todo to Firestore
  const addTodo = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    await addDoc(collection(db, 'todos'), {
      todo: input,
      timestamp: serverTimestamp(),
    });
    setInput('');
  };

  // Update an existing todo
  const updateTodo = async (id) => {
    if (input.trim() === '') return;

    const todoDoc = doc(db, 'todos', id);
    await updateDoc(todoDoc, {
      todo: input,
      timestamp: serverTimestamp(),
    });
    setInput(''); // Clear input after updating
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    const todoDoc = doc(db, 'todos', id);
    await deleteDoc(todoDoc);
  };

  return (
    <div className="App">
      <div className="card">
        <h1>TODO LIST</h1>
        <form className="input-group mb-3" onSubmit={addTodo}>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button type="submit" className="btn btn-primary" disabled={!input}>
            ADD Todo
          </button>
        </form>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">TODO</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <th>{todo.id}</th>
                <td>{todo.todo}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => updateTodo(todo.id)}
                    disabled={!input}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
