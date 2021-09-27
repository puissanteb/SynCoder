import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Send } from '@material-ui/icons'
import { addMessage } from '../../api/messages'
import firebase from 'firebase'

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

export const TextInput = ({ chatroomId }) => {
    const classes = useStyles()
    const [body, setBody] = useState(``)
    const submitMessage = () =>
        addMessage(firebase.auth().currentUser?.uid, chatroomId, body)
            .then(() => setBody(``))
            .catch(console.error())
    return (
        <>
            <form
                className={classes.wrapForm}
                noValidate
                autoComplete="off"
                onSubmit={(e) => e.preventDefault()}
            >
                <TextField
                    id="standard-text"
                    label="메시지 입력"
                    className={classes.wrapText}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    //margin="normal"
                />
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={submitMessage}
                >
                    <Send />
                </Button>
            </form>
        </>
    )
}
