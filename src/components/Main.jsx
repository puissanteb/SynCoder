import React, { useEffect, useState } from 'react'
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
    Grid,
    Link,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import NotificationsIcon from '@material-ui/icons/Notifications'
import { mainListItems, secondaryListItems } from '../utils/listItems'
import styles from '../utils/useStyles'
import Post from './Post'
import Editor from './Editor'
import { Copyright } from '../utils/utils'
import { getPosts } from '../api/posts'
import Profile from './Profile'

const useStyles = makeStyles(styles())

export default function Main({ user }) {
    const classes = useStyles()
    const [open, setOpen] = useState(true)
    const [posts, setPosts] = useState([])
    const handleDrawerOpen = () => {
        setOpen(true)
    }
    const handleDrawerClose = () => {
        setOpen(false)
    }
    useEffect(() => {
        getPosts().then(setPosts).catch(console.error)
    }, [])

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
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        className={classes.title}
                    >
                        Dashboard
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
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
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>{mainListItems}</List>
                <Divider />
                <List>{secondaryListItems}</List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Editor
                            label="게시물 작성하기"
                            placeholder="당신의 개발로그가 궁금해요"
                        />
                        {posts.map((post) => (
                            <Post {...post} key={post.postId} />
                        ))}
                    </Grid>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                    <Profile user={user} />
                </Container>
            </main>
        </div>
    )
}
