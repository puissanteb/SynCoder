import firebase from 'firebase'
import { getFollowsByUserId } from './follows'

export async function getPosts() {
    const postsRef = firebase.database().ref(`posts`)
    try {
        const snapshot = await postsRef.get()
        if (snapshot.exists()) {
            const obj = snapshot.val()
            const arr = []
            for (let key in obj) {
                const authorId = obj[key].userId
                firebase
                    .database()
                    .ref(`users/${authorId}`)
                    .get()
                    .then((res) => {
                        if (res.exists()) {
                            const user = res.val()
                            arr.push({
                                ...obj[key],
                                user,
                                postId: key,
                            })
                        }
                    })
                    .catch(console.error)
            }
            arr.sort(
                (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
            )
            return arr
        } else {
            return []
        }
    } catch (message) {
        return console.error(message)
    }
}

export async function getPostsByUserId(userId) {
    const postsRef = firebase.database().ref(`posts`)
    const followsArr = await getFollowsByUserId(userId)
    try {
        const snapshot = await postsRef.get()
        if (snapshot.exists()) {
            const obj = snapshot.val()
            const arr = []
            for (let key in obj) {
                arr.push({
                    ...obj[key],
                    postId: key,
                })
                // const authorId = obj[key].userId
                // firebase
                //     .database()
                //     .ref(`users/${authorId}`)
                //     .get()
                //     .then((res) => {
                //         if (res.exists()) {
                //             const user = res.val()
                //             arr.push({
                //                 ...obj[key],
                //                 user,
                //                 postId: key,
                //             })
                //         }
                //     })
                //     .catch(console.error)
            }
            arr.sort(
                (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
            )
            return arr.filter(
                (post) =>
                    post.userId === userId || followsArr.includes(post.userId)
            )
        } else {
            return []
        }
    } catch (message) {
        return console.error(message)
    }
}

export function addPost(userId, body) {
    const now = JSON.stringify(new Date()).replaceAll(`"`, ``)
    const newPostKey = firebase.database().ref(`posts`).push().key
    return firebase.database().ref(`posts/${newPostKey}`).set({
        userId,
        body,
        createdAt: now,
        modifiedAt: now,
    })
}

export async function deletePost(postId) {
    try {
        return firebase.database().ref(`posts/${postId}`).remove()
    } catch (message) {
        return console.error(message)
    }
}
