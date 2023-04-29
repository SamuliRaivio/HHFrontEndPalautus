import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material"
import { useState } from "react"


//AddCustomer function returns Button component and onClick renders dialog to add new customer to the database
//AddCustomer takes fetchCustomersData as a prop to update list with new customer's data
export default function AddCustomer(props) {

    //when open state is set true dialog opens (Buttons onclick)
    const [open, setOpen] = useState(false)

    //empty customer to define new customer data
    const [customer, setCustomer] = useState({firstname: '', lastname: ''})

    //handleInputChange changes customer state on user input in dialog
    const handleInputChange = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value})
      }
    
    //addCustomer add new customer to the database and fetches all customers data again to update the table
    //fetchCustomersData is used as a prop from Customers
    //customer data is also set empty that the same data doesn't show when opening dialog again and lastly sets open false to close the dialog
    const addCustomer = () => {
        fetch('http://traineeapp.azurewebsites.net/api/customers', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(customer)
        })
        .then(res => props.fetchCustomersData())
        .catch(err => console.error(err))
        .then(setCustomer({firstname: '', lastname: ''}))
        .then(setOpen(false))

    }


    return(
        <div>
            <div>
                <Button onClick={() => setOpen(true)}>add new customer</Button>
            </div>
            <div>
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle>testi</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Add new customer
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="firstname"
                            value={customer.firstname}
                            onChange= {event => handleInputChange(event)}
                            label="First name"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="lastname"
                            value={customer.lastname}
                            onChange= {event => handleInputChange(event)}
                            label="Last name"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <Button onClick={addCustomer}>Add</Button>
                    </DialogActions>
                </Dialog>
            </div>
            
        </div>
    )
}