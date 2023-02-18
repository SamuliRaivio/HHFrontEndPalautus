import React, { useState } from 'react';

function TodoList() {
  const [todo, setTodo] = useState({description:'', date:''});
  const [todos, setTodos] = useState([]);

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  }

  const addTodo = (event) => {
    event.preventDefault();
    setTodos([...todos, todo]);
  }

  const handleClick = (indexToDelete) => {
      const updatedTodos = todos.filter((todo, i) => i !== indexToDelete)
      setTodos(updatedTodos)
      console.log(todos)
  }

  return (
    <div>
        <form onSubmit={addTodo}>
            <label>Description:</label>
            <input type="text" name="description" value={todo.description} onChange={inputChanged}></input>
            <label>Date:</label>
            <input type="text" name="date" value={todo.date} onChange={inputChanged}></input>
            <input type="submit"></input>
        </form>
      <table>
        <tbody>
            <tr>
                <th>Date</th>
                <th>Description</th>
            </tr>
          {
            todos.map((todo, index) =>
                 <tr key={index}>
                     <td>{todo.date}</td>
                     <td>{todo.description}</td>
                     <td><button onClick={() => handleClick(index)}>Delete</button></td>
                </tr>)
          }
        </tbody>
      </table>   
    </div>
  );
};

export default TodoList;