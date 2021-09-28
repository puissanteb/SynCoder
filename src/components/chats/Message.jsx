import React, { useState, useEffect } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Avatar } from '@material-ui/core'
import { deepOrange } from '@material-ui/core/colors'
import { formatDate } from '../../utils/utils'

const useStyles = makeStyles((theme) =>
    createStyles({
        messageRow: {
            display: 'flex',
        },
        messageRowRight: {
            display: 'flex',
            justifyContent: 'flex-end',
        },
        messageBlue: {
            position: 'relative',
            marginLeft: '20px',
            marginBottom: '10px',
            padding: '10px',
            backgroundColor: '#000000',
            width: '60%',
            //height: "50px",
            textAlign: 'left',
            font: "400 .9em 'Open Sans', sans-serif",
            border: '1px solid #ffffff',
            borderRadius: '10px',
            '&:after': {
                content: "''",
                position: 'absolute',
                width: '0',
                height: '0',
                borderTop: '15px solid #000000',
                borderLeft: '15px solid transparent',
                borderRight: '15px solid transparent',
                top: '0',
                left: '-15px',
            },
            '&:before': {
                content: "''",
                position: 'absolute',
                width: '0',
                height: '0',
                borderTop: '17px solid #ffffff',
                borderLeft: '16px solid transparent',
                borderRight: '16px solid transparent',
                top: '-1px',
                left: '-17px',
            },
        },
        messageOrange: {
            position: 'relative',
            marginRight: '20px',
            marginBottom: '10px',
            padding: '10px',
            backgroundColor: '#000000',
            width: '60%',
            //height: "50px",
            textAlign: 'left',
            font: "400 .9em 'Open Sans', sans-serif",
            border: '1px solid #ffffff',
            borderRadius: '10px',
            '&:after': {
                content: "''",
                position: 'absolute',
                width: '0',
                height: '0',
                borderTop: '15px solid #000000',
                borderLeft: '15px solid transparent',
                borderRight: '15px solid transparent',
                top: '0',
                right: '-15px',
            },
            '&:before': {
                content: "''",
                position: 'absolute',
                width: '0',
                height: '0',
                borderTop: '17px solid #ffffff',
                borderLeft: '16px solid transparent',
                borderRight: '16px solid transparent',
                top: '-1px',
                right: '-17px',
            },
        },

        messageContent: {
            padding: 0,
            margin: 0,
        },
        messageTimeStampRight: {
            position: 'absolute',
            fontSize: '.85em',
            fontWeight: '300',
            marginTop: '10px',
            bottom: '-3px',
            right: '5px',
        },

        orange: {
            color: theme.palette.getContrastText(deepOrange[500]),
            backgroundColor: deepOrange[500],
            width: theme.spacing(4),
            height: theme.spacing(4),
        },
        avatarNothing: {
            color: 'transparent',
            backgroundColor: 'transparent',
            width: theme.spacing(4),
            height: theme.spacing(4),
        },
        displayName: {
            marginLeft: '20px',
        },
    })
)

//avatarが左にあるメッセージ（他人）
export const MessageLeft = ({ body, createdAt, nickname, photoURL }) => {
    const classes = useStyles()
    return (
        <>
            <div className={classes.messageRow}>
                <Avatar
                    alt={nickname}
                    className={classes.orange}
                    src={photoURL}
                ></Avatar>
                <div>
                    <div className={classes.displayName}>{nickname}</div>
                    <div className={classes.messageBlue}>
                        <div>
                            <p className={classes.messageContent}>{body}</p>
                        </div>
                        <div className={classes.messageTimeStampRight}>
                            {formatDate(new Date(createdAt), new Date())}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
//avatarが右にあるメッセージ（自分）
export const MessageRight = ({ body, createdAt }) => {
    const classes = useStyles()
    return (
        <div className={classes.messageRowRight}>
            <div className={classes.messageOrange}>
                <p className={classes.messageContent}>{body}</p>
                <div className={classes.messageTimeStampRight}>
                    {formatDate(new Date(createdAt), new Date())}
                </div>
            </div>
        </div>
    )
}
