import React, { useState } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
} from '@material-ui/core'

export default function CustomDialog({
    title,
    label,
    secondLabel = ``,
    open,
    loading,
    double = false,
    handleClose = (f) => f,
    callbackFn = (f) => f,
}) {
    const [textContent, setTextContent] = useState(``)
    const [secondTextContent, setSecondTextContent] = useState(``)
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="standard-required"
                    label={label}
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    type="text"
                    fullWidth
                    required
                />
                {double ? (
                    <TextField
                        margin="dense"
                        id="standard-required"
                        label={secondLabel}
                        value={secondTextContent}
                        onChange={(e) => setSecondTextContent(e.target.value)}
                        type="text"
                        fullWidth
                        required
                    />
                ) : (
                    <></>
                )}
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => callbackFn(textContent, secondTextContent)}
                    color="primary"
                    disabled={
                        loading ||
                        !textContent ||
                        (double && !secondTextContent)
                    }
                >
                    확인
                </Button>
            </DialogActions>
        </Dialog>
    )
}
