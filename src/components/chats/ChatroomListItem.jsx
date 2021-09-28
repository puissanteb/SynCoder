import React, { useState, useEffect } from 'react'
import {
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
    Avatar,
} from '@material-ui/core'
import { formatDate } from '../../utils/utils'

export default function ChatroomListItem({
    selectedIndex,
    handleListItemClick,
    currentIndex,
    chatroomId,
    chatroomTitle,
    modifiedAt,
}) {
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
                            {formatDate(new Date(modifiedAt), new Date())}
                        </Typography>
                    </>
                }
            />
        </ListItem>
    )
}
