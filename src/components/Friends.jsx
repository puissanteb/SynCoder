import React, { useState, useEffect } from 'react'
import { Grid, Paper, List } from '@material-ui/core'
import FriendsListItem from './friends/FriendsListItem'
import { getUsers, getPhotoURL, getUserNickname } from '../api/users'
import { getFollowsByUserId } from '../api/follows'
import firebase from 'firebase'

export default function Friends({
    userInfos,
    updateUserInfos,
    nicknames,
    updateNicknames,
}) {
    const [users, setUsers] = useState([])
    const [myUsers, setMyUsers] = useState([])
    const [myUserId] = useState(firebase.auth().currentUser?.uid)
    const loadUserInfos = () => {
        if (users.length === 0) return
        return Promise.all(
            users
                .filter((userId) => !Object.keys(userInfos).includes(userId))
                .map((userId) =>
                    getPhotoURL(userId).then((photoURL) => {
                        updateUserInfos([userId, photoURL])
                    })
                )
        )
    }
    const loadNicknames = () => {
        if (users.length === 0) return
        return Promise.all(
            users
                .filter((userId) => !Object.keys(nicknames).includes(userId))
                .map((userId) =>
                    getUserNickname(userId).then((nickname) => {
                        updateNicknames([userId, nickname])
                    })
                )
        )
    }
    useEffect(() => {
        getFollowsByUserId(myUserId)
            .then(setMyUsers)
            .then(getUsers)
            .then(setUsers)
            .catch(console.error)
    }, [])
    useEffect(loadUserInfos, [users])
    useEffect(loadNicknames, [users])
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
                <Paper>
                    <List>
                        <FriendsListItem
                            userId={myUserId}
                            following={false}
                            photoURL={userInfos[myUserId] ?? ``}
                            nickname={nicknames[myUserId] ?? ``}
                            key={myUserId}
                        />
                        {users
                            .filter((userId) => userId !== myUserId)
                            .map((userId) => ({
                                userId,
                                following: myUsers.includes(userId),
                            }))
                            .sort((a, b) => +b.following - +a.following)
                            .map((userProps) => {
                                return (
                                    <FriendsListItem
                                        {...userProps}
                                        photoURL={
                                            userInfos[userProps.userId] ?? ``
                                        }
                                        nickname={
                                            nicknames[userProps.userId] ?? ``
                                        }
                                        key={userProps.userId}
                                    />
                                )
                            })}
                    </List>
                </Paper>
            </Grid>
        </Grid>
    )
}
