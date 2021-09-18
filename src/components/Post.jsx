import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Title from './Title'
import Reply from './Reply'
import Editor from './Editor'
import { ThumbUp, Comment, Share } from '@material-ui/icons'
import {
    Typography,
    Avatar,
    Container,
    ButtonGroup,
    Button,
} from '@material-ui/core'
import { getUserNickname } from '../api/users'
import { getReplies } from '../api/replies'

export default function Post({ postId, userId, body }) {
    const [nickname, setNickname] = useState('')
    const [replies, setReplies] = useState([])
    useEffect(() => {
        Promise.all([
            getUserNickname(userId).then(setNickname).catch(console.error),
            getReplies(postId).then(setReplies).catch(console.error),
        ])
    }, [])
    return (
        <Grid item xs={12} md={8} lg={9}>
            <Paper>
                <Container style={{ display: 'flex' }}>
                    <Avatar></Avatar>
                    <Title>{nickname}</Title>
                </Container>
                <Container>
                    <Typography component="h3" color="secondary">
                        {body}
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
                <Container>
                    {replies.map((reply) => (
                        <Reply {...reply} key={reply.replyId} />
                    ))}
                    <Editor
                        label="댓글 작성하기"
                        placeholder="댓글을 남겨주세요"
                        postId={postId}
                    />
                </Container>
            </Paper>
        </Grid>
    )
}
