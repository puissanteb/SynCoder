import React, { useState, useEffect } from 'react'
import { Grid, Paper, List } from '@material-ui/core'
import FriendsListItem from './friends/FriendsListItem'
import { getUsers } from '../api/users'
import { getFollowsByUserId } from '../api/follows'
import firebase from 'firebase'

export default function Friends() {
    const [users, setUsers] = useState([])
    const [myUsers, setMyUsers] = useState([])
    const [myUserId] = useState(firebase.auth().currentUser?.uid)
    useEffect(() => {
        getFollowsByUserId(myUserId)
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
                        <FriendsListItem
                            userId={myUserId}
                            following={false}
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
