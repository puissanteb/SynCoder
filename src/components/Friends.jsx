import React, { useState, useEffect } from 'react'
import { Grid, Paper, List } from '@material-ui/core'
import FriendListItem from './friends/FriendListItem'
import { getUsers } from '../api/users'
import { getFollowsByUserId } from '../api/follows'
import firebase from 'firebase'

export default function Friends() {
    const [users, setUsers] = useState([])
    const [myUsers, setMyUsers] = useState([])
    useEffect(() => {
        getFollowsByUserId(firebase.auth().currentUser?.uid)
            .then(setMyUsers)
            .then(getUsers)
            .then(setUsers)
            .catch(console.error)
    }, [])

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
                <Paper>
                    <List>
                        {users.map((userId) => {
                            return (
                                <FriendListItem
                                    userId={userId}
                                    following={myUsers.includes(userId)}
                                    key={userId}
                                />
                            )
                        })}
                    </List>
                </Paper>
            </Grid>
        </Grid>
    )
}
