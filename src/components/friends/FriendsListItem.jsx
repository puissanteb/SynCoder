import React, { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
    ListItem,
    IconButton,
    ListItemAvatar,
    Avatar,
    ListItemText,
} from '@material-ui/core'
import { Add, Check, ArrowForward } from '@material-ui/icons'
import { followUser, unfollowUser } from '../../api/follows'
import firebase from 'firebase'

export default function FriendsListItem({
    userId,
    nickname,
    photoURL,
    following = false,
}) {
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
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar src={photoURL} alt={nickname} />
            </ListItemAvatar>
            <ListItemText
                primary={nickname}
                secondary={getSecondaryText(userId, follow)}
            />
            <IconButton edge="end" aria-label="follow" onClick={toggleFollow}>
                {userId === firebase.auth().currentUser?.uid ? (
                    <></>
                ) : follow ? (
                    <Check />
                ) : (
                    <Add />
                )}
            </IconButton>
            <RouterLink to={`/users/${userId}`}>
                <IconButton edge="end" aria-label="link">
                    <ArrowForward />
                </IconButton>
            </RouterLink>
        </ListItem>
    )
}
