import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Title from './Title'
import Reply from './Reply'
import Editor from './Editor'
import Likes from './Likes'
import { Typography, Avatar, Container } from '@material-ui/core'
import { getGroupInfo } from '../../api/groups'
import { getReplies } from '../../api/replies'

export default function Post({
    postId,
    userId,
    groupId,
    modifiedAt,
    body,
    photoURL,
    nickname,
    callbackFn = (f) => f,
}) {
    const [replies, setReplies] = useState([])
    const [groupTitle, setGroupTitle] = useState(``)
    const loadReplies = () =>
        getReplies(postId).then(setReplies).catch(console.error)
    const loadGroupTitle = () =>
        getGroupInfo(groupId)
            .then(({ title }) => setGroupTitle(title))
            .catch(console.error)
    useEffect(loadReplies, [])
    useEffect(loadGroupTitle, [])
    return (
        <Grid item xs={12} md={8} lg={9}>
            <Paper>
                <Container style={{ display: 'flex' }}>
                    <Avatar alt={nickname} src={photoURL}></Avatar>
                    <Title>
                        {nickname}
                        {groupId ? `(${groupTitle})` : ``}
                    </Title>
                </Container>
                <Container>
                    <Typography component="h3">{body}</Typography>
                </Container>
                <Container>
                    <Likes
                        postId={postId}
                        modifiedAt={modifiedAt}
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
