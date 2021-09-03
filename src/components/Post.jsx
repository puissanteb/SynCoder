import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Title from './Title'
import { Typography } from '@material-ui/core'

export default function Post({ user, content }) {
    return (
        <Grid item xs={12} md={8} lg={9}>
            <Paper>
                <Title>{user}</Title>
                <Typography component="h3" color="secondary">
                    {content}
                </Typography>
            </Paper>
        </Grid>
    )
}
