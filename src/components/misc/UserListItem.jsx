import React, { useState, useEffect } from 'react'
import { getUserNickname, getPhotoURL } from '../../api/users'
import {
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
} from '@material-ui/core'

export default function UserListItem({
    userId,
    button = false,
    callbackFn = (f) => f,
}) {
    const [nickname, setNickname] = useState('')
    const [photoURL, setPhotoURL] = useState('')
    useEffect(() => {
        Promise.all([
            getUserNickname(userId).then(setNickname).catch(console.error),
            getPhotoURL(userId).then(setPhotoURL).catch(console.error),
        ])
    }, [])
    return (
        <ListItem button={button} onClick={callbackFn}>
            <ListItemAvatar>
                <Avatar src={photoURL}></Avatar>
            </ListItemAvatar>
            <ListItemText primary={nickname} />
        </ListItem>
    )
}
