import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Title from './Title'
import { ThumbUp, Comment, Share } from '@material-ui/icons'
import {
    Typography,
    Avatar,
    Container,
    ButtonGroup,
    Button,
} from '@material-ui/core'

export default function Post({ user, content }) {
    return (
        <Grid item xs={12} md={8} lg={9}>
            <Paper>
                <Container style={{ display: 'flex' }}>
                    <Avatar></Avatar>
                    <Title>{user}</Title>
                </Container>
                <Container>
                    <Typography component="h3" color="secondary">
                        {content}
                    </Typography>
                </Container>
                <Container>
                    <ButtonGroup>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<ThumbUp />}
                        >
                            like
                        </Button>
                        <Button variant="contained" startIcon={<Comment />}>
                            comment
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<Share />}
                        >
                            share
                        </Button>
                    </ButtonGroup>
                </Container>
            </Paper>
        </Grid>
    )
}
