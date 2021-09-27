import React from 'react'
import { TextField, Button } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Send } from '@material-ui/icons'

const useStyles = makeStyles((theme) =>
    createStyles({
        wrapForm: {
            display: 'flex',
            justifyContent: 'center',
            width: '95%',
            margin: `${theme.spacing(0)} auto`,
        },
        wrapText: {
            width: '100%',
        },
        button: {
            //margin: theme.spacing(1),
        },
    })
)

export const TextInput = () => {
    const classes = useStyles()
    return (
        <>
            <form className={classes.wrapForm} noValidate autoComplete="off">
                <TextField
                    id="standard-text"
                    label="メッセージを入力"
                    className={classes.wrapText}
                    //margin="normal"
                />
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                >
                    <Send />
                </Button>
            </form>
        </>
    )
}
