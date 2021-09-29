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
import { joinGroup, leaveGroup } from '../../api/joins'
import firebase from 'firebase'

export default function GroupsListItem({
    groupId,
    title,
    description,
    photoURL,
    joining = false,
}) {
    const [join, setJoin] = useState(joining)
    const toggleJoin = () => {
        join
            ? leaveGroup(firebase.auth().currentUser?.uid, groupId)
                  .then(() => setJoin(false))
                  .catch(console.error)
            : joinGroup(firebase.auth().currentUser?.uid, groupId)
                  .then(() => setJoin(true))
                  .catch(console.error)
    }
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar src={photoURL} alt={title} />
            </ListItemAvatar>
            <ListItemText primary={title} secondary={description} />
            <IconButton edge="end" aria-label="join" onClick={toggleJoin}>
                {join ? <Check /> : <Add />}
            </IconButton>
            <RouterLink to={`/groups/${groupId}`}>
                <IconButton edge="end" aria-label="link">
                    <ArrowForward />
                </IconButton>
            </RouterLink>
        </ListItem>
    )
}
