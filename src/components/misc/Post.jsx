import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Title from './Title'
import Reply from './Reply'
import Editor from './Editor'
import Likes from './Likes'
import { Typography, Avatar, Container } from '@material-ui/core'
import { getUserNickname, getPhotoURL } from '../../api/users'
import { getReplies } from '../../api/replies'
import { formatDate } from '../../utils/utils'

export default function Post({
    postId,
    userId,
    modifiedAt,
    body,
    callbackFn = (f) => f,
}) {
    const [nickname, setNickname] = useState('')
    const [replies, setReplies] = useState([])
    const [photoURL, setPhotoURL] = useState('')
    const loadReplies = () =>
        getReplies(postId).then(setReplies).catch(console.error)
    useEffect(() => {
        Promise.all([
            getUserNickname(userId).then(setNickname).catch(console.error),
            getReplies(postId).then(setReplies).catch(console.error),
            getPhotoURL(userId).then(setPhotoURL).catch(console.error),
        ])
    }, [])
    return (
        <Grid item xs={12} md={8} lg={9}>
            <Paper>
                <Container style={{ display: 'flex' }}>
                    <Avatar alt={nickname} src={photoURL}></Avatar>
                    <Title>
                        {nickname}/
                        {formatDate(new Date(modifiedAt), new Date())}
                    </Title>
                </Container>
                <Container>
                    <Typography component="h3">{body}</Typography>
                </Container>
                <Container>
                    <Likes
                        postId={postId}
                        authorId={userId}
                        callbackFn={callbackFn}
                    />
                </Container>
                <Container>
                    {replies.map((reply) => (
                        <Reply
                            {...reply}
                            callbackFn={loadReplies}
                            key={reply.replyId}
                        />
                    ))}
                    <Editor
                        label="댓글 작성하기"
                        placeholder="댓글을 남겨주세요"
                        postId={postId}
                        callbackFn={loadReplies}
                    />
                </Container>
            </Paper>
        </Grid>
    )
}
