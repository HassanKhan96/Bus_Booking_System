import React, { useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

const DialogBox = ({ title, text, onAgree, isOpen, setOpen }) => {
    return (
        <Dialog
            open={isOpen}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent style={styles.dialogContainer}>
                    <DialogContentText id="alert-dialog-description">
                        {text}    
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => onAgree()} color="primary">Yes</Button>
                    <Button onClick={() => setOpen()} color="primary">No</Button>
                </DialogActions>

        </Dialog>
    )
}

const styles = {
    dialogContainer: {
        width: 300,
        paddingLeft: 20,
        borderColor: '#333',
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center'
    },
}

export default DialogBox