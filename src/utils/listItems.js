import React from 'react'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { Dashboard, Group, GroupAdd } from '@material-ui/icons'

export const mainListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <Dashboard />
            </ListItemIcon>
            <ListItemText primary="타임라인" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <GroupAdd />
            </ListItemIcon>
            <ListItemText primary="친구" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <Group />
            </ListItemIcon>
            <ListItemText primary="그룹" />
        </ListItem>
    </div>
)
