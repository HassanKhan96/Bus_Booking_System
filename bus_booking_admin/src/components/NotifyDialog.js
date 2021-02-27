import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Button from '@material-ui/core/Button'

const NotifyDialog = ({isNotify,text,onAgree}) => {
    return (
        <Dialog
            open={isNotify}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent style={styles.textContainer}>
                <DialogContentText>{text}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onAgree()}>OK</Button>
            </DialogActions>
        </Dialog>
    )
}

const styles = {
    textContainer: {
        padding: 30
    }
}

export default NotifyDialog