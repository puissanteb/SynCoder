import React, { useState, useEffect } from 'react'
import { getUserNickname } from '../api/users'
import { formatDate } from '../utils/utils'

export default function Reply({ userId, body, createdAt }) {
    const [nickname, setNickname] = useState('')
    useEffect(() => {
        getUserNickname(userId).then(setNickname).catch(console.error)
    }, [])
    return (
        <>
            <p>{nickname}</p>
            <p>{body}</p>
            <p>{formatDate(new Date(createdAt), new Date())}</p>
        </>
    )
}
