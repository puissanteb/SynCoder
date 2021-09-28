import React, { useState, useEffect, useReducer } from 'react'
import firebase from 'firebase'
import { getPhotoURL, getUserNickname } from '../api/users'
import { addPostListener } from '../api/posts'
import { getFollowsByUserId } from '../api/follows'
import Post from './misc/Post'
import Editor from './misc/Editor'
import { Grid } from '@material-ui/core'

export default function Timeline() {
    const [posts, setPosts] = useState([])
    const [nicknames, updateNicknames] = useReducer(
        (state, [userId, value]) => {
            const obj = { ...state }
            obj[userId] = value
            return obj
        },
        {}
    )
    const [userInfos, updateUserInfos] = useReducer(
        (state, [userId, value]) => {
            const obj = { ...state }
            obj[userId] = value
            return obj
        },
        {}
    )
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
            posts.map(({ userId }) =>
                getPhotoURL(userId).then((photoURL) => {
                    updateUserInfos([userId, photoURL])
                })
            )
        )
    }
    const loadNicknames = () => {
        if (posts.length === 0) return
        return Promise.all(
            posts.map(({ userId }) =>
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
                    nickname={post?.user?.nickname ?? `닉네임 없음`}
                    photoURL={userInfos[post.userId] ?? ``}
                    nickname={nicknames[post.userId] ?? ``}
                    callbackFn={loadPosts}
                    key={post.postId}
                />
            ))}
        </Grid>
    )
}
