import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import firebase from 'firebase'
import { getPhotoURL, getUserNickname } from '../api/users'
import { addPostListener, addGroupPostListener } from '../api/posts'
import { getFollowsByUserId } from '../api/follows'
import Post from './misc/Post'
import Editor from './misc/Editor'
import { useParams } from 'react-router-dom'

export default function Timeline({
    userInfos,
    updateUserInfos,
    nicknames,
    updateNicknames,
}) {
    const [posts, setPosts] = useState([])
    const params = useParams()
    const groupId = params.groupId ?? ``
    const loadPosts = async () => {
        const postsRef = groupId
            ? firebase
                  .database()
                  .ref(`posts`)
                  .orderByChild(`groupId`)
                  .equalTo(groupId)
            : firebase.database().ref(`posts`)
        const followsArr = await getFollowsByUserId(
            firebase.auth().currentUser?.uid
        )
        const listener = groupId
            ? addGroupPostListener(postsRef, setPosts)
            : addPostListener(
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
            <Editor callbackFn={loadPosts} groupId={groupId} />
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
