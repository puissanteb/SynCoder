import React, { useState, useEffect } from 'react'
import {
    Box,
    Paper,
    List,
    Divider,
    Button,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import Chatroom from './chats/Chatroom'
import ChatroomListItem from './chats/ChatroomListItem'
import { addChatroom } from '../api/chatrooms'
import { getChatroomsByUserId } from '../api/members'
import firebase from 'firebase'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    grid: {
        height: '100vh',
    },
    paperLeft: {
        height: '90%',
    },
    paperTop: {
        height: '20%',
    },
    paperMain: {
        height: '90%',
    },
    paperRight: {},
    paperBottom: { height: '20%' },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
    },
}))

export default function Chats() {
    const classes = useStyles()
    const [selectedIndex, setSelectedIndex] = useState(null)
    const [selectedChatroomId, setSelectedChatroomId] = useState(null)
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [chatroomTitle, setChatroomTitle] = useState(``)
    const [chatrooms, setChatrooms] = useState([])
    const handleListItemClick = (index, chatroomId) => {
        setSelectedIndex(index)
        setSelectedChatroomId(chatroomId)
    }
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const loadChatrooms = () => {
        getChatroomsByUserId(firebase.auth().currentUser?.uid)
            .then(setChatrooms)
            .then(() => handleListItemClick(null, null))
            .catch(console.error)
    }
    const submitChatroom = () => {
        setLoading(true)
        addChatroom(firebase.auth().currentUser?.uid, chatroomTitle)
            .then(handleClose)
            .then(() => setLoading(false))
            .then(loadChatrooms)
            .catch(console.error)
    }
    useEffect(loadChatrooms, [])
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">새로운 채팅</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="standard-required"
                        label="채팅방 이름"
                        value={chatroomTitle}
                        onChange={(e) => setChatroomTitle(e.target.value)}
                        type="text"
                        fullWidth
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={submitChatroom}
                        color="primary"
                        disabled={loading || !chatroomTitle}
                    >
                        확인
                    </Button>
                </DialogActions>
            </Dialog>
            <Paper className={`${classes.paperMain} ${classes.paper}`}>
                <Grid container item spacing={3} className={classes.grid}>
                    <Grid item xs={4}>
                        <Box
                            sx={{
                                width: '100%',
                                maxWidth: 360,
                                bgcolor: 'background.paper',
                            }}
                        >
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Button
                                    variant="outlined"
                                    startIcon={<Add />}
                                    onClick={handleOpen}
                                >
                                    새로운 채팅
                                </Button>
                            </Grid>
                            <List component="nav" aria-label="chatrooms">
                                {chatrooms.map((chatroom, index, array) => {
                                    return (
                                        <>
                                            <ChatroomListItem
                                                {...chatroom}
                                                selectedIndex={selectedIndex}
                                                handleListItemClick={
                                                    handleListItemClick
                                                }
                                                currentIndex={index}
                                                key={chatroom.chatroomId}
                                            />
                                            {index === array.length - 1 ? (
                                                <></>
                                            ) : (
                                                <Divider
                                                    variant="inset"
                                                    component="li"
                                                />
                                            )}
                                        </>
                                    )
                                })}
                            </List>
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        {selectedChatroomId ? (
                            <Chatroom
                                chatroomId={selectedChatroomId}
                                callbackFn={loadChatrooms}
                                key={selectedChatroomId}
                            />
                        ) : (
                            <></>
                        )}
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}
