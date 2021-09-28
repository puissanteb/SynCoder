import firebase from 'firebase'
import { getFollowsByUserId } from './follows'

export function addPostListener(
    ref,
    userId,
    followsArr,
    callbackFn = (f) => f
) {
    return ref.on(
        'value',
        (snapshot) => {
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
                    //         if (
                    //             res.exists() &&
                    //             (authorId === userId ||
                    //                 followsArr.includes(authorId))
                    //         ) {
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
                callbackFn(arr)
            }
        },
        (error) => console.error(error)
    )
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
