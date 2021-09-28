import firebase from 'firebase'
import { inviteMember } from './members'

export async function addChatroom(userId, chatroomTitle) {
    const now = JSON.stringify(new Date()).replaceAll(`"`, ``)
    const newChatroomKey = firebase.database().ref(`chatrooms`).push().key
    try {
        await firebase
            .database()
            .ref(`chatrooms/${newChatroomKey}`)
            .set({ userId, chatroomTitle, createdAt: now, modifiedAt: now })
        return await inviteMember(userId, newChatroomKey)
    } catch (message) {
        return console.error(message)
    }
}

export async function deleteChatroom(chatroomId) {
    try {
        return firebase.database().ref(`chatrooms/${chatroomId}`).remove()
    } catch (message) {
        return console.error(message)
    }
}

export async function getChatroomByChatroomId(chatroomId) {
    try {
        const snapshot = await firebase
            .database()
            .ref(`chatrooms/${chatroomId}`)
            .get()
        return snapshot.exists() ? { ...snapshot.val(), chatroomId } : ``
    } catch (message) {
        return console.error(message)
    }
}
