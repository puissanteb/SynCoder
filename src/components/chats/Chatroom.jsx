import React, { useState, useEffect } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import {
    Paper,
    Grid,
    Button,
    Dialog,
    DialogTitle,
    List,
} from '@material-ui/core'
import { Group, Add, ExitToApp } from '@material-ui/icons'
import { TextInput } from './TextInput'
import { MessageLeft, MessageRight } from './Message'
import {
    inviteMember,
    kickMember,
    getMembersByChatroomId,
} from '../../api/members'
import { getPhotoURL, getUserNickname } from '../../api/users'
import { getFollowsByUserId } from '../../api/follows'
import { addMessageListener } from '../../api/messages'
import UserListItem from '../misc/UserListItem'
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

export default function Chatroom({
    chatroomId,
    userInfos,
    updateUserInfos,
    nicknames,
    updateNicknames,
    callbackFn = (f) => f,
}) {
    const classes = useStyles()
    const [addMemberOpen, setAddMemberOpen] = useState(false)
    const [currentMemberOpen, setCurrentMemberOpen] = useState(false)
    const openAddMemberDialog = () => setAddMemberOpen(true)
    const openCurrentMemberDialog = () => setCurrentMemberOpen(true)
    const closeAddMemberDialog = () => setAddMemberOpen(false)
    const closeCurrentMemberDialog = () => setCurrentMemberOpen(false)
    const [messages, setMessages] = useState([])
    const [members, setMembers] = useState([])
    const [friends, setFriends] = useState([])
    const loadMessages = () => {
        const messagesRef = firebase
            .database()
            .ref(`messages`)
            .orderByChild(`chatroomId`)
            .equalTo(chatroomId)
        const listener = addMessageListener(messagesRef, setMessages)
        return () => {
            messagesRef.off('value', listener)
        }
    }
    const loadMembers = () =>
        getMembersByChatroomId(chatroomId).then(setMembers).catch(console.error)
    const loadUserInfos = () => {
        if (members.length === 0) return
        return Promise.all(
            members
                .filter(
                    (memberId) => !Object.keys(userInfos).includes(memberId)
                )
                .map((memberId) =>
                    getPhotoURL(memberId).then((photoURL) => {
                        updateUserInfos([memberId, photoURL])
                    })
                )
        )
    }
    const loadNicknames = () => {
        if (members.length === 0) return
        return Promise.all(
            members
                .filter(
                    (memberId) => !Object.keys(nicknames).includes(memberId)
                )
                .map((memberId) =>
                    getUserNickname(memberId).then((nickname) => {
                        updateNicknames([memberId, nickname])
                    })
                )
        )
    }
    const loadFriends = () =>
        getFollowsByUserId(firebase.auth().currentUser?.uid)
            .then(setFriends)
            .catch(console.error)
    const submitInvite = (userId) =>
        inviteMember(userId, chatroomId)
            .then(loadMembers)
            .then(closeAddMemberDialog)
            .catch(console.error)
    const submitKick = () =>
        kickMember(firebase.auth().currentUser?.uid, chatroomId)
            .then(callbackFn)
            .catch(console.error)
    useEffect(loadMessages, [])
    useEffect(loadMembers, [])
    useEffect(loadFriends, [])
    useEffect(loadUserInfos, [members])
    useEffect(loadNicknames, [members])
    return (
        <>
            <Dialog onClose={closeCurrentMemberDialog} open={currentMemberOpen}>
                <DialogTitle>현재 인원</DialogTitle>
                <List sx={{ pt: 0 }}>
                    {members.map((userId) => (
                        <UserListItem userId={userId} key={userId} />
                    ))}
                </List>
            </Dialog>
            <Dialog onClose={closeAddMemberDialog} open={addMemberOpen}>
                <DialogTitle>초대할 친구</DialogTitle>
                <List sx={{ pt: 0 }}>
                    {friends
                        .filter((friendId) => !members.includes(friendId))
                        .map((userId) => (
                            <UserListItem
                                userId={userId}
                                key={userId}
                                button={true}
                                callbackFn={() => submitInvite(userId)}
                            />
                        ))}
                </List>
            </Dialog>
            <Paper id="style-1" className={classes.messagesBody}>
                {messages.map((message) =>
                    message.userId === firebase.auth().currentUser?.uid ? (
                        <MessageRight {...message} key={message.messageId} />
                    ) : (
                        <MessageLeft
                            {...message}
                            nickname={
                                nicknames[message.userId] ?? `닉네임 없음`
                            }
                            photoURL={userInfos[message.userId] ?? ``}
                            key={message.messageId}
                        />
                    )
                )}
            </Paper>
            <TextInput chatroomId={chatroomId} />
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs={4}>
                    <Button
                        variant="contained"
                        startIcon={<Group />}
                        onClick={openCurrentMemberDialog}
                    >
                        현재 인원
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={openAddMemberDialog}
                    >
                        친구 초대
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Button
                        variant="contained"
                        startIcon={<ExitToApp />}
                        onClick={submitKick}
                    >
                        나가기
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}
