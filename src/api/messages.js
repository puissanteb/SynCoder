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
                        arr.push({ ...obj[key], messageId: key })
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
