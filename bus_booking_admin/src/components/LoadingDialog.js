import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

const LoadingDialog = ({isLoading}) => {
    return (
        <Dialog
            open={isLoading}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <div style={styles.dialogSpinner}>
                < CircularProgress size={30} color="primary"/>
                <h4>Please wait</h4>
            </div>            
            
        </Dialog>
    )
}

const styles = {
    dialogSpinner: {
        display: "flex",
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: 300,
        height: 100,
        padding: 3,
        fontFamily: 'Arial',
        color: '#999'
    }
}

export default LoadingDialog