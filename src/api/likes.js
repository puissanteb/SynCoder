import firebase from 'firebase'

export function getLikes(postId) {
    const likesRef = firebase
        .database()
        .ref(`likes`)
        .orderByChild(`postId`)
        .equalTo(postId)
    return new Promise((resolve, reject) => {
        likesRef.once(
            'value',
            (snapshot) => {
                if (snapshot.exists()) {
                    const obj = snapshot.val()
                    const arr = Object.values(obj)
                    resolve(arr)
                } else {
                    resolve([])
                }
            },
            (error) => reject(error)
        )
    })
}

export function addLike(userId, postId) {
    const now = JSON.stringify(new Date()).replaceAll(`"`, ``)
    const newLikeKey = firebase.database().ref(`likes`).push().key
    return firebase.database().ref(`likes/${newLikeKey}`).set({
        userId,
        postId,
        createdAt: now,
    })
}

export function cancelLike(userId, postId) {
    const likesRef = firebase
        .database()
        .ref(`likes`)
        .orderByChild(`postId`)
        .equalTo(postId)
    return new Promise((resolve, reject) => {
        likesRef.once(
            'value',
            (snapshot) => {
                if (snapshot.exists()) {
                    const obj = snapshot.val()
                    for (let key in obj) {
                        if (obj[key].userId === userId) {
                            firebase.database().ref(`likes/${key}`).remove()
                            resolve(true)
                        }
                    }
                    reject(`like already canceled`)
                } else {
                    reject(`snapshot not found`)
                }
            },
            (error) => reject(error)
        )
    })
}
