import firebase from 'firebase'

export function getGroupsByUserId(userId) {
    const joinsRef = firebase
        .database()
        .ref(`joins`)
        .orderByChild(`userId`)
        .equalTo(userId)
    return new Promise((resolve, reject) => {
        joinsRef.once(
            'value',
            (snapshot) => {
                if (snapshot.exists()) {
                    const obj = snapshot.val()
                    const arr = Object.values(obj).map((value) => value.groupId)
                    resolve(arr)
                } else {
                    resolve([])
                }
            },
            (error) => reject(error)
        )
    })
}

export function getMembersByGroupId(groupId) {
    const joinsRef = firebase
        .database()
        .ref(`joins`)
        .orderByChild(`groupId`)
        .equalTo(groupId)
    return new Promise((resolve, reject) => {
        joinsRef.once(
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

export function joinGroup(userId, groupId) {
    const now = JSON.stringify(new Date()).replaceAll(`"`, ``)
    const newJoinKey = firebase.database().ref(`joins`).push().key
    return firebase.database().ref(`joins/${newJoinKey}`).set({
        userId,
        groupId,
        createdAt: now,
    })
}

export function leaveGroup(userId, groupId) {
    const joinsRef = firebase
        .database()
        .ref(`joins`)
        .orderByChild(`userId`)
        .equalTo(userId)
    return new Promise((resolve, reject) => {
        joinsRef.once(
            'value',
            (snapshot) => {
                if (snapshot.exists()) {
                    const obj = snapshot.val()
                    for (let key in obj) {
                        if (obj[key].groupId === groupId) {
                            firebase.database().ref(`joins/${key}`).remove()
                            resolve(true)
                        }
                    }
                    reject(`already left`)
                } else {
                    reject(`snapshot not found`)
                }
            },
            (error) => reject(error)
        )
    })
}
