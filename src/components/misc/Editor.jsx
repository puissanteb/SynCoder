import React, { useState } from 'react'
import { Container, Button, TextField, Grid, Paper } from '@material-ui/core'
import { Create } from '@material-ui/icons'
import { addPost } from '../../api/posts'
import { addReply } from '../../api/replies'
import firebase from 'firebase'

export default function Editor({
    label = '게시물 작성하기',
    placeholder = '당신의 개발로그가 궁금해요',
    postId,
    groupId = ``,
    callbackFn = (f) => f,
}) {
    const [content, setContent] = useState(``)
    const [loading, setLoading] = useState(false)
    const submitPost = () => {
        setLoading(true)
        addPost(firebase.auth().currentUser?.uid, content, groupId)
            .then(() => {
                setContent(``)
                setLoading(false)
            })
            .then(callbackFn)
            .catch(console.error)
    }
    const submitReply = () => {
        setLoading(true)
        addReply(firebase.auth().currentUser?.uid, postId, content)
            .then(() => {
                setContent(``)
                setLoading(false)
            })
            .then(callbackFn)
            .catch(console.error)
    }
    return (
        <Grid item xs={12} md={8} lg={9}>
            <Paper>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Container>
                            <TextField
                                id="outlined-textarea"
                                label={label}
                                placeholder={placeholder}
                                multiline
                                fullWidth
                                variant="outlined"
                                value={content}
                                disabled={loading}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Container>
                    </Grid>
                    <Grid item xs={12}>
                        <Container>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<Create />}
                                disabled={loading}
                                onClick={postId ? submitReply : submitPost}
                            >
                                글쓰기
                            </Button>
                        </Container>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}
