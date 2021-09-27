import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import { getPostsByUserId } from '../api/posts'
import Post from './misc/Post'
import Editor from './misc/Editor'
import { Grid } from '@material-ui/core'

export default function Timeline() {
    const [posts, setPosts] = useState([])
    const loadPosts = () =>
        getPostsByUserId(firebase.auth().currentUser?.uid)
            .then(setPosts)
            .catch(console.error)
    useEffect(loadPosts, [])
    return (
        <Grid container spacing={3}>
            <Editor callbackFn={loadPosts} />
            {posts.map((post) => (
                <Post {...post} callbackFn={loadPosts} key={post.postId} />
            ))}
        </Grid>
    )
}
