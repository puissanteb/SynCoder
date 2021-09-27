import React, { useState, useEffect } from 'react'
import {
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
    Avatar,
} from '@material-ui/core'
import { getChatroomTitle } from '../../api/chatrooms'

export default function ChatroomListItem({
    selectedIndex,
    handleListItemClick,
    currentIndex,
    chatroomId,
}) {
    const [chatroomTitle, setChatroomTitle] = useState(``)
    const loadChatroomTitle = () => {
        getChatroomTitle(chatroomId).then(setChatroomTitle).catch(console.error)
    }
    useEffect(loadChatroomTitle, [])
    return (
        <ListItem
            button
            alignItems="flex-start"
            selected={selectedIndex === currentIndex}
            onClick={() => handleListItemClick(currentIndex, chatroomId)}
        >
            <ListItemAvatar>
                <Avatar />
            </ListItemAvatar>
            <ListItemText
                primary={chatroomTitle}
                secondary={
                    <>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            Ali Connors
                        </Typography>
                        {" — I'll be in your neighborhood doing errands this…"}
                    </>
                }
            />
        </ListItem>
    )
}
