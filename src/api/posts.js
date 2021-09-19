import firebase from 'firebase'

export function getPosts() {
    const postsRef = firebase.database().ref(`posts`)
    return postsRef
        .get()
        .then((snapshot) => {
            if (snapshot.exists()) {
                const obj = snapshot.val()
                const arr = []
                for (let key in obj) {
                    arr.push({ ...obj[key], postId: key })
                }
                arr.sort(
                    (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
                )
                return arr
            } else {
                return []
            }
        })
        .catch(console.error)
    // postsRef.on('child_added', (snapshot) => {
    //     if (snapshot.exists()) {
    //         console.log(snapshot.val())
    //     } else {
    //         console.log('No data available')
    //     }
    // })
}

export function addPost(userId, body, createdAt) {
    const newPostKey = firebase.database().ref(`posts`).push().key
    return firebase.database().ref(`posts/${newPostKey}`).set({
        userId,
        body,
        createdAt,
        modifiedAt: createdAt,
    })
}
