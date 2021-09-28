import firebase from 'firebase'

export function addMessage(userId, chatroomId, body) {
    const now = JSON.stringify(new Date()).replaceAll(`"`, ``)
    firebase.database().ref(`chatrooms/${chatroomId}/modifiedAt`).set(now)
    const newMessageKey = firebase.database().ref(`messages`).push().key
    return firebase
        .database()
        .ref(`messages/${newMessageKey}`)
        .set({ userId, chatroomId, body, createdAt: now })
}

export function getMessagesByChatroomId(chatroomId) {
    const messagesRef = firebase
        .database()
        .ref(`messages`)
        .orderByChild(`chatroomId`)
        .equalTo(chatroomId)
    return new Promise((resolve, reject) => {
        messagesRef.once(
            'value',
            (snapshot) => {
                if (snapshot.exists()) {
                    const obj = snapshot.val()
                    const arr = []
                    for (let key in obj) {
                        const { userId } = obj[key]
                        const userRef = firebase
                            .database()
                            .ref(`users/${userId}`)
                        userRef.get().then((user) => {
                            console.log(user)
                            arr.push({ ...obj[key], user, messageId: key })
                        })
                    }
                    resolve(arr)
                } else {
                    resolve([])
                }
            },
            (error) => reject(error)
        )
    })
}

export function addMessageListener(ref, callbackFn = (f) => f) {
    return ref.on(
        'value',
        (snapshot) => {
            if (snapshot.exists()) {
                const obj = snapshot.val()
                const arr = []
                for (let key in obj) {
                    const { userId } = obj[key]
                    firebase
                        .database()
                        .ref(`users/${userId}`)
                        .get()
                        .then((res) => {
                            if (res.exists()) {
                                const user = res.val()
                                arr.push({
                                    ...obj[key],
                                    user,
                                    messageId: key,
                                })
                            }
                        })
                        .catch(console.error)
                }
                callbackFn(arr)
            }
        },
        (error) => console.error(error)
    )
}
