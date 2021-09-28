import React, { useState, useReducer } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import firebase from 'firebase'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import {
    CssBaseline,
    Drawer,
    Box,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    Badge,
    Container,
} from '@material-ui/core'
import { Menu, ChevronLeft, Notifications } from '@material-ui/icons'
import MainListItems from './misc/MainListItems'
import styles from '../utils/useStyles'
import { Copyright } from '../utils/utils'
import Preferences from './misc/Preferences'
import Timeline from './Timeline'
import Friends from './Friends'
import Groups from './Groups'
import Chats from './Chats'

const useStyles = makeStyles(styles())

export default function Main() {
    const classes = useStyles()
    const [open, setOpen] = useState(true)
    const handleDrawerOpen = () => {
        setOpen(true)
    }
    const handleDrawerClose = () => {
        setOpen(false)
    }
    const location = useLocation()
    const getTitle = (pathname) => {
        switch (pathname) {
            case '/friends':
                return '친구'
            case '/groups':
                return '그룹'
            case '/chats':
                return '채팅'
            case '/':
                return '타임라인'
            default:
        }
        return 'SynCoder'
    }
    const [userInfos, updateUserInfos] = useReducer(
        (state, [userId, value]) => {
            const obj = { ...state }
            obj[userId] = value
            return obj
        },
        {}
    )
    const [nicknames, updateNicknames] = useReducer(
        (state, [userId, value]) => {
            const obj = { ...state }
            obj[userId] = value
            return obj
        },
        {}
    )

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="absolute"
                className={clsx(classes.appBar, open && classes.appBarShift)}
            >
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(
                            classes.menuButton,
                            open && classes.menuButtonHidden
                        )}
                    >
                        <Menu />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        className={classes.title}
                    >
                        {getTitle(location.pathname)}
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <Notifications />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(
                        classes.drawerPaper,
                        !open && classes.drawerPaperClose
                    ),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeft />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <MainListItems />
                </List>
                <Divider />
                <List>
                    <Preferences user={firebase.auth().currentUser} />
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Switch>
                        <Route path="/friends" exact>
                            <Friends
                                userInfos={userInfos}
                                updateUserInfos={updateUserInfos}
                                nicknames={nicknames}
                                updateNicknames={updateNicknames}
                            />
                        </Route>
                        <Route path="/groups" exact>
                            <Groups
                                userInfos={userInfos}
                                updateUserInfos={updateUserInfos}
                                nicknames={nicknames}
                                updateNicknames={updateNicknames}
                            />
                        </Route>
                        <Route path="/chats" exact>
                            <Chats
                                userInfos={userInfos}
                                updateUserInfos={updateUserInfos}
                                nicknames={nicknames}
                                updateNicknames={updateNicknames}
                            />
                        </Route>
                        <Route path="/" exact>
                            <Timeline
                                userInfos={userInfos}
                                updateUserInfos={updateUserInfos}
                                nicknames={nicknames}
                                updateNicknames={updateNicknames}
                            />
                        </Route>
                    </Switch>
                </Container>
                <Container maxWidth="lg" className={classes.container}>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>
    )
}
