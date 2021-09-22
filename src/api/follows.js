import firebase from 'firebase'

export function getFollows(userId) {
    const followsRef = firebase
        .database()
        .ref(`follows`)
        .orderByChild(`userId`)
        .equalTo(userId)
    return new Promise((resolve, reject) => {
        followsRef.once(
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

export function follow(userId, followUserId) {
    const now = JSON.stringify(new Date()).replaceAll(`"`, ``)
    const newFollowKey = firebase.database().ref(`follows`).push().key
    return firebase.database().ref(`follows/${newFollowKey}`).set({
        userId,
        followUserId,
        createdAt: now,
    })
}
