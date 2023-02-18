import React, { useState } from 'react';
import TodoTable from './components/TodoTable'

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
      <TodoTable todos={todos} handleClick={handleClick}/>
    </div>
  );
};

export default TodoList;