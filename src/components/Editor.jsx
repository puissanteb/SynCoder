import React, { useState } from 'react'
import { Container, Button, TextField, Grid, Paper } from '@material-ui/core'
import { Create } from '@material-ui/icons'
import { addPost } from '../api/posts'
import { addReply } from '../api/replies'
import firebase from 'firebase'

export default function Editor({ label, placeholder, postId }) {
    const [content, setContent] = useState(``)
    const [loading, setLoading] = useState(false)
    const submitPost = () => {
        setLoading(true)
        const now = JSON.stringify(new Date()).replaceAll(`"`, ``)
        addPost(firebase.auth().currentUser.uid, content, now)
            .then(() => {
                setContent(``)
                setLoading(false)
            })
            .catch(console.error)
    }
    const submitReply = () => {
        setLoading(true)
        const now = JSON.stringify(new Date()).replaceAll(`"`, ``)
        addReply(firebase.auth().currentUser.uid, postId, content, now)
            .then(() => {
                setContent(``)
                setLoading(false)
            })
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
