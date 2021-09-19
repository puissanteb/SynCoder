import firebase from 'firebase'

export function getReplies(postId) {
    const repliesRef = firebase
        .database()
        .ref(`replies`)
        .orderByChild(`postId`)
        .equalTo(postId)
    return new Promise((resolve, reject) => {
        repliesRef.once(
            'value',
            (snapshot) => {
                if (snapshot.exists()) {
                    const obj = snapshot.val()
                    const arr = []
                    for (let key in obj) {
                        arr.push({ ...obj[key], replyId: key })
                    }
                    arr.sort(
                        (a, b) =>
                            Date.parse(a.createdAt) - Date.parse(b.createdAt)
                    )
                    resolve(arr)
                } else {
                    resolve([])
                }
            },
            (error) => reject(error)
        )
    })
}

export function addReply(userId, postId, body, createdAt) {
    const newReplyKey = firebase.database().ref(`replies`).push().key
    return firebase.database().ref(`replies/${newReplyKey}`).set({
        userId,
        postId,
        body,
        createdAt,
    })
}
