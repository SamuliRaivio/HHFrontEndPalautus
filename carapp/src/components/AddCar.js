import Button from '@mui/material/Button'
import { Dialog } from '@mui/material'
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close'; 


//AddCar function returns dialog where user can add information about a new car and save it to the database
//car object is defined from start and dialog's textfield input changes updates the state of this car
//clicking "Add" button calls addCar function that check if information is given correctly and then calls Cartables addCar function as a prop and saves the new car to the database
//addCar function also alerts succesful action and bad action
export default function AddCar(props) {
  const [car, setCar] = useState({
    brand: '', model: '', color: '', fuel: '', year: '', price: ''
  })

  const [addAlert, setAddAlert] = useState(false)
  const [badAddAlert, setBadAddAlert] = useState(false)

  const handleInputChange = (event) => {
    setCar({...car, [event.target.name]: event.target.value})
  }

  const addCar = () => {
        const year = car.year
        const price = car.price
        const onlyNum = /^\d+$/.test(year+price)
        if(onlyNum) {
          props.onClick(car);
          setAddAlert(true);
        } else {
          setBadAddAlert(true);
        }
        
        setCar({brand: '', model: '', color: '', fuel: '', year: '', price: ''});
        props.onClose();
  }


    return(
      <div>
        <div>
            <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle>Add Car</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the information about the car you like to add to the list
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
          <Button onClick={addCar}>Add</Button>
        </DialogActions>
      </Dialog>
        </div>
        <div>
        <Collapse in={addAlert}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {setAddAlert(false);}}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          New Car Added to The list
        </Alert>
      </Collapse>
        </div>
        <div>
        <Collapse in={badAddAlert}>
        <Alert severity="error"
          action={
            <IconButton
              aria-label="close"
              color="red"
              size="small"
              onClick={() => {setBadAddAlert(false);}}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Can't add car! Year and price must contain only numbers
        </Alert>
      </Collapse>
        </div>
        </div>
    )
}