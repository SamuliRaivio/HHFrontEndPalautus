import React, { useState } from 'react'
import { useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css'

function TodoList() {
  const [todo, setTodo] = useState({description:'', date:'', priority:''});
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  }

  const addTodo = (event) => {
    event.preventDefault();
    setTodos([...todos, todo]);
  }

  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0){
        setTodos(todos.filter((todo, i) => i != gridRef.current.getSelectedNodes()[0].id))
    }
    else {
        alert('Select row first')
    }
  }

  const columns = [
    {headerName: 'Description', field: 'description', sortable: true, filter: true, floatingFilter: true},
    {headerName: 'Date', field: 'date', sortable: true, filter: true, floatingFilter: true},
    {headerName: 'Priority', field: 'priority', sortable: true, filter: true, floatingFilter: true,
     cellStyle: params => params.value === "high" ? {color: 'red'} : {color: 'black'}}
  ]

  return (
    <div>

        <input type="text" onChange={inputChanged} placeholder="Description" name="description" value={todo.description}/>
        <input type="date" onChange={inputChanged} placeholder="Date" name="date" value={todo.date}/>
        <select type="text" onChange={inputChanged}  name="priority"  placeholder="priority" value={todo.priority}>
            <option value="">Choose priority</option>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
        </select>
        {/* <input type="text" onChange={inputChanged} placeholder="Priority" name="priority" value={todo.priority}/> */}
        <button onClick={addTodo}>Add</button>
        <button onClick={deleteTodo}>Delete</button>

        
        

        <div className="ag-theme-material"
            style={{
                width: '40%',
                height: '700px',
                margin: 'auto'
                }}>
            <AgGridReact
                animateRows={true}
                ref={gridRef}
                onGridReady={ params => gridRef.current = params.api}
                rowSelection='single'
                columnDefs={columns}
                rowData={todos}>
            </AgGridReact>
        </div>

    </div>
  );
};

export default TodoList;