import React, { useCallback, useEffect, useState } from 'react'
import { useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css'
import Button from '@mui/material/Button'
import { Dialog } from '@mui/material'
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close'; 


//DeleteCar function returns dialog that confirms if user really wants to delete car from database
//"Agree" button calls deleteCar function that calls Cartable's deletecar function as a prop and deletes that car from database
//deleteCar function also alerts succesful delete
export default function DeleteCar(props) {
    const [deleteAlert, setDeleteAlert] = useState(false)

    const deleteCar = () => {
        props.onClick();
        (setDeleteAlert(true));
        props.onClose();
    }

    return(
        <div>
            <div>
            <Dialog
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to delete car from this list"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={props.onClose}>Cancel</Button>
                    <Button onClick={deleteCar} autoFocus>Agree</Button>
                </DialogActions>
            </Dialog>
        </div>
        <div>
        <Collapse in={deleteAlert}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setDeleteAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Car deleted from the list
        </Alert>
      </Collapse>
        </div>
        </div>
    )
}
