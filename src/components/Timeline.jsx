import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import { getPhotoURL, getUserNickname } from '../api/users'
import { addPostListener } from '../api/posts'
import { getFollowsByUserId } from '../api/follows'
import Post from './misc/Post'
import Editor from './misc/Editor'
import { Grid } from '@material-ui/core'

export default function Timeline({
    userInfos,
    updateUserInfos,
    nicknames,
    updateNicknames,
}) {
    const [posts, setPosts] = useState([])
    const loadPosts = async () => {
        const postsRef = firebase.database().ref(`posts`)
        const followsArr = await getFollowsByUserId(
            firebase.auth().currentUser?.uid
        )
        const listener = addPostListener(
            postsRef,
            firebase.auth().currentUser?.uid,
            followsArr,
            setPosts
        )
        return () => postsRef.off('value', listener)
    }
    const loadUserInfos = () => {
        if (posts.length === 0) return
        return Promise.all(
            posts
                .filter(
                    ({ userId }) => !Object.keys(userInfos).includes(userId)
                )
                .map(({ userId }) =>
                    getPhotoURL(userId).then((photoURL) => {
                        updateUserInfos([userId, photoURL])
                    })
                )
        )
    }
    const loadNicknames = () => {
        if (posts.length === 0) return
        return Promise.all(
            posts
                .filter(
                    ({ userId }) => !Object.keys(nicknames).includes(userId)
                )
                .map(({ userId }) =>
                    getUserNickname(userId).then((nickname) => {
                        updateNicknames([userId, nickname])
                    })
                )
        )
    }
    useEffect(loadPosts, [])
    useEffect(loadUserInfos, [posts])
    useEffect(loadNicknames, [posts])
    return (
        <Grid container spacing={3}>
            <Editor callbackFn={loadPosts} />
            {posts.map((post) => (
                <Post
                    {...post}
                    photoURL={userInfos[post.userId] ?? ``}
                    nickname={nicknames[post.userId] ?? ``}
                    callbackFn={loadPosts}
                    key={post.postId}
                />
            ))}
        </Grid>
    )
}
