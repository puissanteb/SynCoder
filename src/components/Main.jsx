import React, { useState, useEffect, useReducer } from 'react'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
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
import { getGroupInfo } from '../api/groups'
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
    const [title, setTitle] = useState(`SynCoder`)
    const handleDrawerOpen = () => {
        setOpen(true)
    }
    const handleDrawerClose = () => {
        setOpen(false)
    }
    const location = useLocation()
    const getTitle = (pathname) => {
        return new Promise((resolve, reject) => {
            switch (pathname) {
                case '/friends':
                    resolve('친구')
                    break
                case '/groups':
                    resolve('그룹')
                    break
                case '/chats':
                    resolve('채팅')
                    break
                case '/timeline':
                    resolve('타임라인')
                    break
                default:
                    if (pathname.startsWith('/groups'))
                        resolve(
                            getGroupInfo(pathname.slice(8)).then(
                                ({ title }) => title
                            )
                        )
            }
            resolve('SynCoder')
        })
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

    const props = { userInfos, updateUserInfos, nicknames, updateNicknames }

    useEffect(() => {
        getTitle(location.pathname).then(setTitle).catch(console.error)
    }, [location.pathname])

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
                        {title}
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
                            <Friends {...props} />
                        </Route>
                        <Route path="/groups" exact>
                            <Groups {...props} />
                        </Route>
                        <Route path="/groups/:groupId">
                            <Timeline {...props} />
                        </Route>
                        <Route path="/chats" exact>
                            <Chats {...props} />
                        </Route>
                        <Route path="/timeline" exact>
                            <Timeline {...props} />
                        </Route>
                        <Redirect from="/" to="/timeline" />
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
