import firebase from 'firebase'

export function addChatroom(userId, chatroomTitle) {
    const now = JSON.stringify(new Date()).replaceAll(`"`, ``)
    const newChatroomKey = firebase.database().ref(`chatrooms`).push().key
    return firebase
        .database()
        .ref(`chatrooms/${newChatroomKey}`)
        .set({ userId, chatroomTitle, createdAt: now, modifiedAt: now })
}

export async function deleteChatroom(chatroomId) {
    try {
        return firebase.database().ref(`chatrooms/${chatroomId}`).remove()
    } catch (message) {
        return console.error(message)
    }
}
