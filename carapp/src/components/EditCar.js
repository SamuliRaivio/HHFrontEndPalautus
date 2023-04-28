import Button from '@mui/material/Button'
import { Dialog } from '@mui/material'
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close'; 


//EditCar function returns dialog where user can update information about a new car and save it to the database
//car object is defined from start as same car that has been selected from the table and dialog's textfield input changes updates the state of this car
//clicking "Edit" button calls editCar function that check if information is given correctly and then calls Cartables editCar function as a prop and saves the updated car to the database
//editCar function also alerts succesful action and bad action
export default function EditCar(props) {
    const [editAlert, setEditAlert] = useState(false)
    const [badEditAlert, setBadEditAlert] = useState(false)
    const [car, setCar] = useState(props.selectedCar)
    useEffect(() =>setCar(props.selectedCar), [props.selectedCar])
      

  const handleInputChange = (event) => {
    setCar({...car, [event.target.name]: event.target.value})
  }

  const editCar = () => {
        const year = car.year
        const price = car.price
        const onlyNum = /^\d+$/.test(year+price)

        if(onlyNum) {
            props.onClick(car);
            setEditAlert(true);
        } else {
            setBadEditAlert(true)
        }

        
        props.onClose();
  }


    return(
      <div>
        <div>
            <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle>Edit Car</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the new information for the car you want to to edit
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="brand"
            value={car.brand}
            onChange= {event => handleInputChange(event)}
            label="Brand"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            name="model"
            value={car.model}
            onChange= {event => handleInputChange(event)}
            label="Model"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            name="color"
            value={car.color}
            onChange= {event => handleInputChange(event)}
            label="Color"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            name="fuel"
            value={car.fuel}
            onChange= {event => handleInputChange(event)}
            label="Fuel"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            name="year"
            value={car.year}
            onChange= {event => handleInputChange(event)}
            label="Year"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            name="price"
            value={car.price}
            onChange= {event => handleInputChange(event)}
            label="Price"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button onClick={editCar}>Edit</Button>
        </DialogActions>
      </Dialog>
        </div>
        <div>
        <Collapse in={editAlert}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {setEditAlert(false);}}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Car information updated
        </Alert>
      </Collapse>
        </div>
        <div>
        <Collapse in={badEditAlert}>
        <Alert severity="error"
          action={
            <IconButton
              aria-label="close"
              color="red"
              size="small"
              onClick={() => {setBadEditAlert(false);}}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Can't update car! Year and price must contain only numbers
        </Alert>
      </Collapse>
        </div>
        </div>
    )
}