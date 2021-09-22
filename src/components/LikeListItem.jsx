import React, { useState, useEffect } from 'react'
import { getUserNickname, getPhotoURL } from '../api/users'
import {
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
} from '@material-ui/core'

export default function LikeListItem({ userId }) {
    const [nickname, setNickname] = useState('')
    const [photoURL, setPhotoURL] = useState('')
    useEffect(() => {
        Promise.all([
            getUserNickname(userId).then(setNickname).catch(console.error),
            getPhotoURL(userId).then(setPhotoURL).catch(console.error),
        ])
    }, [])
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar src={photoURL}></Avatar>
            </ListItemAvatar>
            <ListItemText primary={nickname} />
        </ListItem>
    )
}