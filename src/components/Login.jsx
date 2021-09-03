import React, { useEffect } from 'react'
import firebase from 'firebase'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import {
    Typography,
    Avatar,
    CssBaseline,
    Box,
    Container,
    Link,
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                SynCoder
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

export default function Login({ setUser }) {
    const classes = useStyles()

    useEffect(() => {
        const ui = new firebaseui.auth.AuthUI(firebase.auth())
        ui.start('#firebaseui-auth-container', {
            callbacks: {
                signInSuccessWithAuthResult: (authResult) => {
                    const { user } = authResult
                    setUser(user)
                    ui.delete()
                    return true
                },
            },
            signInOptions: [
                // List of OAuth providers supported.
                {
                    provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                    defaultCountry: 'KR',
                },
            ],
            // Other config options...
        })
    }, [])

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <div id="firebaseui-auth-container"></div>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    )
}
