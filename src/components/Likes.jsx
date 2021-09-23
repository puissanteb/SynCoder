import React, { useState, useEffect } from 'react'
import { getLikes, addLike, cancelLike } from '../api/likes'
import { deletePost } from '../api/posts'
import { getFollowsByRelations, followUser, unfollowUser } from '../api/follows'
import {
    Typography,
    Dialog,
    DialogTitle,
    List,
    Checkbox,
    IconButton,
} from '@material-ui/core'
import {
    Favorite,
    FavoriteBorder,
    Add,
    Delete,
    Check,
} from '@material-ui/icons'
import LikeListItem from './LikeListItem'
import firebase from 'firebase'

export default function Likes({ postId, authorId, callbackFn = (f) => f }) {
    const [myLike, setMyLike] = useState(false)
    const [myFollow, setMyFollow] = useState(false)
    const [likes, setLikes] = useState([])
    const [open, setOpen] = useState(false)
    const handleClickOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const loadLikes = () => getLikes(postId).then(setLikes).catch(console.error)
    const loadFollows = () =>
        getFollowsByRelations(firebase.auth().currentUser.uid, authorId)
            .then(setMyFollow)
            .catch(console.error)
    const submitLike = () => {
        myLike
            ? cancelLike(firebase.auth().currentUser.uid, postId)
                  .then(() => getLikes(postId))
                  .then(setLikes)
                  .catch(console.error)
            : addLike(firebase.auth().currentUser.uid, postId)
                  .then(() => getLikes(postId))
                  .then(setLikes)
                  .catch(console.error)
    }
    const submitFollow = () => {
        myFollow
            ? unfollowUser(firebase.auth().currentUser.uid, authorId)
                  .then(() => setMyFollow(false))
                  .catch(console.error)
            : followUser(firebase.auth().currentUser.uid, authorId)
                  .then(() => setMyFollow(true))
                  .catch(console.error)
    }
    const submitDelete = () => {
        deletePost(postId).then(callbackFn).catch(console.error)
    }
    useEffect(loadLikes, [])
    useEffect(loadFollows, [])
    useEffect(() => {
        setMyLike(
            likes.filter(
                ({ userId }) => userId === firebase.auth().currentUser.uid
            ).length !== 0
        )
    }, [likes])

    return (
        <>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>좋아요를 누른 사람</DialogTitle>
                <List sx={{ pt: 0 }}>
                    {likes.map(({ userId }) => (
                        <LikeListItem userId={userId} key={userId} />
                    ))}
                </List>
            </Dialog>
            <Typography
                component="h3"
                color="primary"
                onClick={handleClickOpen}
            >
                {likes.length ? `${likes.length}명이 좋아합니다.` : ``}
            </Typography>
            <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                checked={myLike}
                onChange={submitLike}
            />
            {authorId === firebase.auth().currentUser.uid ? (
                <IconButton aria-label="delete" onClick={submitDelete}>
                    <Delete />
                </IconButton>
            ) : (
                <IconButton aria-label="follow" onClick={submitFollow}>
                    {myFollow ? <Check /> : <Add />}
                </IconButton>
            )}
        </>
    )
}
