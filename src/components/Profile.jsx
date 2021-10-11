import React, { useState, useEffect } from 'react'
import { Avatar, Grid, Paper } from '@material-ui/core'
import firebase from 'firebase'
import { getPhotoURL, getUserNickname, getUserDescription } from '../api/users'
import { addUserPostListener } from '../api/posts'
import Post from './misc/Post'
import { useParams } from 'react-router-dom'

export default function Profile({
    userInfos,
    updateUserInfos,
    nicknames,
    updateNicknames,
}) {
    const [posts, setPosts] = useState([])
    const [userNickname, setUserNickname] = useState(``)
    const [userPhotoURL, setUserPhotoURL] = useState(``)
    const [userDescription, setUserDescription] =
        useState(`자기소개가 없습니다.`)
    const params = useParams()
    const userId = params.userId ?? ``
    const loadPosts = async () => {
        const postsRef = firebase
            .database()
            .ref(`posts`)
            .orderByChild(`userId`)
            .equalTo(userId)
        const listener = addUserPostListener(postsRef, setPosts)
        return () => postsRef.off('value', listener)
    }
    const loadUserPhotoURL = () =>
        userInfos[userId]
            ? setUserPhotoURL(userInfos[userId])
            : getPhotoURL(userId)
                  .then((photoURL) => {
                      updateUserInfos([userId, photoURL])
                      setUserPhotoURL(photoURL)
                  })
                  .catch(console.error)

    const loadUserNickname = () =>
        nicknames[userId]
            ? setUserNickname(nicknames[userId])
            : getUserNickname(userId)
                  .then((nickname) => {
                      updateNicknames([userId, nickname])
                      setUserNickname(nickname)
                  })
                  .catch(console.error)

    const loadUserDescription = () =>
        getUserDescription(userId).then(setUserDescription).catch(console.error)

    useEffect(loadPosts, [])
    useEffect(loadUserPhotoURL, [])
    useEffect(loadUserNickname, [])
    useEffect(loadUserDescription, [])
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
                <Paper>
                    <Avatar src={userPhotoURL} alt={userNickname} />
                    {userNickname}: {userDescription}
                </Paper>
            </Grid>
            {posts.map((post) => (
                <Post
                    {...post}
                    photoURL={userPhotoURL ?? ``}
                    nickname={userNickname ?? ``}
                    callbackFn={loadPosts}
                    key={post.postId}
                />
            ))}
        </Grid>
    )
}
