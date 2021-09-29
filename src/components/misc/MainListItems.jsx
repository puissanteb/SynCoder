import React from 'react'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { Dashboard, Group, GroupAdd, Chat } from '@material-ui/icons'
import { Link as RouterLink } from 'react-router-dom'

export default function MainListItems() {
    return (
        <div>
            <ListItem button component={RouterLink} to="/timeline">
                <ListItemIcon>
                    <Dashboard />
                </ListItemIcon>
                <ListItemText primary="타임라인" />
            </ListItem>
            <ListItem button component={RouterLink} to="/friends">
                <ListItemIcon>
                    <GroupAdd />
                </ListItemIcon>
                <ListItemText primary="친구" />
            </ListItem>
            <ListItem button component={RouterLink} to="/groups">
                <ListItemIcon>
                    <Group />
                </ListItemIcon>
                <ListItemText primary="그룹" />
            </ListItem>
            <ListItem button component={RouterLink} to="/chats">
                <ListItemIcon>
                    <Chat />
                </ListItemIcon>
                <ListItemText primary="채팅" />
            </ListItem>
        </div>
    )
}
