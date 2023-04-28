import React, { useCallback, useEffect, useState } from 'react'
import { useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css'
import Button from '@mui/material/Button'
import DeleteCar from './DeleteCar'
import AddCar from './AddCar'
import { ButtonGroup } from '@mui/material'
import EditCar from './EditCar'


//Cartable has all data from rest api and all methods to handle data
//Cartable returns the list of cars using AG GRID and buttons to interact with the list
//Buttons open dialogs that lets user to delete, add or edit cars
//Dialogs are seperate components that handle dialog and then refer to rest methods in this component
export default function Cartable() {
    
    useEffect(() => fetchData(), [])
    const [cars, setCars] = useState([])
    const gridRef = useRef()

    //Interacting with list happens with buttons that are not in the list 
    //Buttons interact with selected item from list 
    //For that reason selectedRow stores list's selected items URL that refers items id
    const [selectedRow, setSelectedRow] = useState(null)

    //selectedCar is for EditCar component
    const [selectedCar, setSelectedCar] = useState({brand: '', model: '', color: '', fuel: '', year: '', price: ''})
    

    //onSelectionChanged function stores new data to selectedRow and selectedCar
    const onSelectionChanged = useCallback(() => {
        setSelectedRow(gridRef.current.getSelectedRows()[0]._links.self.href);
        setSelectedCar({brand: gridRef.current.getSelectedRows()[0].brand,
            model: gridRef.current.getSelectedRows()[0].model,
            color: gridRef.current.getSelectedRows()[0].color,
            fuel: gridRef.current.getSelectedRows()[0].fuel,
            year: gridRef.current.getSelectedRows()[0].year,
            price: gridRef.current.getSelectedRows()[0].price});
        }, [])

    

    
    //Dialogs for data interactions are opened when state of the variable that referes the action is true
    //ADD, EDIT and DELETE buttons in return statement sets the state true (open_X_Dialog functions)
    //close_X_Dialog functions are called when dialog must be closed for example cancel button or when action in these dialogs has been complited
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const openDeleteDialog = () => {setDeleteDialogOpen(true)}
    const closeDeleteDialog = () => {setDeleteDialogOpen(false)}

    const [addDialogOpen, setAddDialogOpen] = useState(false)
    const openAddDialog = () => {setAddDialogOpen(true)}
    const closeAddDialog = () => {setAddDialogOpen(false)}

    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const openEditDialog = () => {setEditDialogOpen(true)}
    const closeEditDialog = () => {setEditDialogOpen(false)}


    
    //functions for interacting with database
    //fetchData gets all items from database when application starts
    //fetchData is also called when other changes happens in database (see other functions below)
    //other functions are called in seperate dialog components
    const fetchData = () => {
        fetch('http://carrestapi.herokuapp.com/cars')
        .then(res => res.json())
        .then(resData => setCars(resData._embedded.cars))
    }

    const deleteCar = () => {
        fetch(selectedRow, {method: 'DELETE'})
        .then(res => fetchData())
        .then(setSelectedRow(null))
        .catch(err => console.err(err))
    } 

    const addCar = (car) => {
        fetch('http://carrestapi.herokuapp.com/cars', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(car)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }

    const editCar = (car) => {
        fetch(selectedRow, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(car)
        })
        .then(res => fetchData())
        .then(setSelectedRow(null))
        .catch(err => console.error(err))
    }
    

    //columns variable defines rows for Ag Grid
    const columns = [
        {headerName: "Brand", field: 'brand', sortable: true, filter: true, floatingFilter: true},
        {headerName: "Model", field: 'model', sortable: true, filter: true, floatingFilter: true},
        {headerName: "Color", field: 'color', sortable: true, filter: true, floatingFilter: true},
        {headerName: "Fuel", field: 'fuel', sortable: true, filter: true, floatingFilter: true},
        {headerName: "Year", field: 'year', sortable: true, filter: true, floatingFilter: true},
        {headerName: "Price", field: 'price', sortable: true, filter: true, floatingFilter: true}
    ]


    //return statement is seperated in buttons, dialog functions and AgGrid table
    //buttons opens dialogs for dialog functions to interact with database
    //DELETE and EDIT buttons are disabled if there is no selection (i did this instead of alert message if there is no selection)
    return(
        <div>
            <div style={{display: "flex"}}>
                <ButtonGroup style={{marginLeft: "auto"}}>
                    <Button variant='contained' onClick={openAddDialog}>ADD</Button>
                    <Button style={{color: "yellow"}} disabled={selectedRow == null}  variant='contained' onClick={openEditDialog}>EDIT</Button>
                    <Button style={{color: "red"}} disabled={selectedRow == null} variant='contained' onClick={openDeleteDialog}>DELETE</Button>
                </ButtonGroup>
            </div>
            <div>
                <DeleteCar open={deleteDialogOpen} onClose={closeDeleteDialog} onClick={deleteCar}/>
                <AddCar open={addDialogOpen} onClose={closeAddDialog} onClick={addCar}/>
                <EditCar open={editDialogOpen} selectedCar={selectedCar} onClose={closeEditDialog} onClick={editCar}/>
            </div>
            <div className="ag-theme-material" style={{ height: '700px', margin: 'auto'}}>
                <AgGridReact
                    animateRows={true}
                    ref={gridRef}
                    onGridReady={ params => gridRef.current = params.api}
                    rowSelection='single'
                    columnDefs={columns}
                    rowData={cars}
                    onSelectionChanged={onSelectionChanged}>
                </AgGridReact>
            </div>
        </div>
    )
}