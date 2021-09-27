import React, { useState, useEffect } from 'react'
import {
    ListItem,
    IconButton,
    ListItemAvatar,
    Avatar,
    ListItemText,
} from '@material-ui/core'
import { Add, Check } from '@material-ui/icons'
import { getUserNickname, getPhotoURL } from '../../api/users'
import { followUser, unfollowUser } from '../../api/follows'
import firebase from 'firebase'

export default function FriendListItem({ userId, following = false }) {
    const [nickname, setNickname] = useState('')
    const [photoURL, setPhotoURL] = useState('')
    const [follow, setFollow] = useState(following)
    const getSecondaryText = (userId, follow) => {
        if (userId === firebase.auth().currentUser?.uid) return '나'
        if (follow) return '친구'
        return '알 수도 있는 사람'
    }
    const toggleFollow = () => {
        follow
            ? unfollowUser(firebase.auth().currentUser?.uid, userId)
                  .then(() => setFollow(false))
                  .catch(console.error)
            : followUser(firebase.auth().currentUser?.uid, userId)
                  .then(() => setFollow(true))
                  .catch(console.error)
    }
    useEffect(() => {
        Promise.all([
            getUserNickname(userId).then(setNickname).catch(console.error),
            getPhotoURL(userId).then(setPhotoURL).catch(console.error),
        ])
    }, [])
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar src={photoURL} alt={nickname} />
            </ListItemAvatar>
            <ListItemText
                primary={nickname}
                secondary={getSecondaryText(userId, follow)}
            />
            <IconButton edge="end" aria-label="delete" onClick={toggleFollow}>
                {userId === firebase.auth().currentUser?.uid ? (
                    <></>
                ) : follow ? (
                    <Check />
                ) : (
                    <Add />
                )}
            </IconButton>
        </ListItem>
    )
}
