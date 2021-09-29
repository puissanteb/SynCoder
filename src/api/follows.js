import firebase from 'firebase'

export function getFollowsByUserId(userId) {
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
                    const arr = Object.values(obj).map(
                        (value) => value.followUserId
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

export function getFollowsByFollowUserId(followUserId) {
    const followsRef = firebase
        .database()
        .ref(`follows`)
        .orderByChild(`followUserId`)
        .equalTo(followUserId)
    return new Promise((resolve, reject) => {
        followsRef.once(
            'value',
            (snapshot) => {
                if (snapshot.exists()) {
                    const obj = snapshot.val()
                    const arr = Object.values(obj).map((value) => value.userId)
                    resolve(arr)
                } else {
                    resolve([])
                }
            },
            (error) => reject(error)
        )
    })
}

export function getFollowsByRelations(userId, followUserId) {
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
                    for (let key in obj) {
                        if (obj[key].followUserId === followUserId) {
                            resolve(true)
                        }
                    }
                    resolve(false)
                } else {
                    reject(`snapshot not found`)
                }
            },
            (error) => reject(error)
        )
    })
}

export function followUser(userId, followUserId) {
    const now = JSON.stringify(new Date()).replaceAll(`"`, ``)
    const newFollowKey = firebase.database().ref(`follows`).push().key
    return firebase.database().ref(`follows/${newFollowKey}`).set({
        userId,
        followUserId,
        createdAt: now,
    })
}

export function unfollowUser(userId, followUserId) {
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
                    for (let key in obj) {
                        if (obj[key].followUserId === followUserId) {
                            firebase.database().ref(`follows/${key}`).remove()
                            resolve(true)
                        }
                    }
                    reject(`already unfollowed`)
                } else {
                    reject(`snapshot not found`)
                }
            },
            (error) => reject(error)
        )
    })
}
