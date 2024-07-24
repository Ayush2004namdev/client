import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

const ConfirmDeleteDialog = ({open , onClose , deleteHandler}) => {
  return (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this group?
                </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>NO</Button>
            <Button onClick={deleteHandler} color='error'>YES</Button>
        </DialogActions>
    </Dialog>
  )
}

export default ConfirmDeleteDialog