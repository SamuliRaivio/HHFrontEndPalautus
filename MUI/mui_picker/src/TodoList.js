import React, { useState } from 'react'
import { useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function TodoList() {
  const [date, setDate] = useState('')
  const [todo, setTodo] = useState({description:'', date: date, priority:''});
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();

  const [tabValue, setTabValue] = useState('home')

  const handleTabChange = (event, value) => {
    setTabValue(value)
  }

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  }

  const dateChanged = (props) => {
    setTodo({...todo, date: props});
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
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab value="home" label="HOME" />
        <Tab value="todos" label="TODOS" />
      </Tabs>
      {tabValue === 'home' && <div>This is home</div>}
      {tabValue === 'todos' && <div>
      <div>

{/* <input type="text" onChange={inputChanged} placeholder="Description" name="description" value={todo.description}/> */}
<TextField
label="Description"
variant="standard"
name="description"
value={todo.description}
onChange={inputChanged}/>
{/* <input type="date" onChange={inputChanged} placeholder="Date" name="date" value={todo.date}/> */}
<LocalizationProvider dateAdapter={AdapterDayjs}>
  <DatePicker onChange={date => dateChanged(date)} name="date"/>
</LocalizationProvider>
{/* <select type="text" onChange={inputChanged}  name="priority"  placeholder="priority" value={todo.priority}>
    <option value="">Choose priority</option>
    <option value="low">low</option>
    <option value="medium">medium</option>
    <option value="high">high</option>
</select> */}
<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
  <InputLabel id="priority-select-label">Priority</InputLabel>
  <Select
    labelId="priority-select-label"
    id="priority-select"
    name="priority"
    value={todo.priority}
    label="Priority"
    onChange={inputChanged}
  >
    <MenuItem value="low">low</MenuItem>
    <MenuItem value="medium">medium</MenuItem>
    <MenuItem value="high">high</MenuItem>
  </Select>
</FormControl>

{/* <input type="text" onChange={inputChanged} placeholder="Priority" name="priority" value={todo.priority}/> */}
<Button onClick={addTodo} variant="contained">Add</Button>
<Button onClick={deleteTodo} variant="contained">Delete</Button>




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
        </div>}
    </div>
  );
};

export default TodoList;