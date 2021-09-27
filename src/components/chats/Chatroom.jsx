import React, { useState, useEffect } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Paper, Grid, Button } from '@material-ui/core'
import { Add, ExitToApp } from '@material-ui/icons'
import { TextInput } from './TextInput'
import { MessageLeft, MessageRight } from './Message'
import { getMessagesByChatroomId } from '../../api/messages'
import firebase from 'firebase'

const useStyles = makeStyles((theme) =>
    createStyles({
        paper: {
            width: '80vw',
            height: '80vh',
            maxWidth: '500px',
            maxHeight: '700px',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            position: 'relative',
        },
        paper2: {
            width: '80vw',
            maxWidth: '500px',
            display: 'flex',
            alignItems: 'left',
            flexDirection: 'column',
            position: 'relative',
        },
        container: {
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'left',
            justifyContent: 'center',
        },
        messagesBody: {
            width: 'calc( 100% - 20px )',
            margin: 10,
            overflowY: 'scroll',
            height: 'calc( 100% - 80px )',
        },
    })
)

export default function Chatroom({ chatroomId }) {
    const classes = useStyles()
    const [messages, setMessages] = useState([])
    const loadMessages = () =>
        getMessagesByChatroomId(chatroomId)
            .then(setMessages)
            .catch(console.error)
    useEffect(loadMessages, [])
    return (
        <>
            <Paper id="style-1" className={classes.messagesBody}>
                {messages.map((message) => {
                    message.userId === firebase.auth().currentUser.uid ? (
                        <MessageRight {...message} key={message.messageId} />
                    ) : (
                        <MessageLeft {...message} key={message.messageId} />
                    )
                })}
            </Paper>
            <TextInput chatroomId={chatroomId} />
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs={6}>
                    <Button variant="contained" startIcon={<Add />}>
                        친구 초대
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" startIcon={<ExitToApp />}>
                        나가기
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}
