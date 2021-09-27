import React from 'react'
import {
    Box,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
} from '@material-ui/core'
import { Inbox, Drafts } from '@material-ui/icons'

export default function SelectedListItem() {
    const [selectedIndex, setSelectedIndex] = React.useState(1)

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index)
    }

    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <List component="nav" aria-label="main mailbox folders">
                <ListItemButton
                    selected={selectedIndex === 0}
                    onClick={(event) => handleListItemClick(event, 0)}
                >
                    <ListItemIcon>
                        <Inbox />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 1}
                    onClick={(event) => handleListItemClick(event, 1)}
                >
                    <ListItemIcon>
                        <Drafts />
                    </ListItemIcon>
                    <ListItemText primary="Drafts" />
                </ListItemButton>
            </List>
            <Divider />
            <List component="nav" aria-label="secondary mailbox folder">
                <ListItemButton
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2)}
                >
                    <ListItemText primary="Trash" />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 3}
                    onClick={(event) => handleListItemClick(event, 3)}
                >
                    <ListItemText primary="Spam" />
                </ListItemButton>
            </List>
        </Box>
    )
}
