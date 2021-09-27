import React, { useState, useEffect } from 'react'
import { getUserNickname } from '../../api/users'
import { deleteReply } from '../../api/replies'
import { formatDate } from '../../utils/utils'
import firebase from 'firebase'

export default function Reply({
    userId,
    body,
    createdAt,
    replyId,
    callbackFn = (f) => f,
}) {
    const [nickname, setNickname] = useState('')
    const submitDeleteReply = () =>
        deleteReply(replyId).then(callbackFn).catch(console.error)
    useEffect(() => {
        getUserNickname(userId).then(setNickname).catch(console.error)
    }, [])
    return (
        <>
            <p>{nickname}</p>
            <p>{body}</p>
            <p>{formatDate(new Date(createdAt), new Date())}</p>
            {userId === firebase.auth().currentUser?.uid ? (
                <button onClick={submitDeleteReply}>삭제</button>
            ) : (
                <></>
            )}
        </>
    )
}
