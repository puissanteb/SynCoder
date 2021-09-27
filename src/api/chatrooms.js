import firebase from 'firebase'
import { inviteMember } from './members'

export function addChatroom(userId, chatroomTitle) {
    const now = JSON.stringify(new Date()).replaceAll(`"`, ``)
    const newChatroomKey = firebase.database().ref(`chatrooms`).push().key
    return firebase
        .database()
        .ref(`chatrooms/${newChatroomKey}`)
        .set({ userId, chatroomTitle, createdAt: now, modifiedAt: now })
        .then(() => inviteMember(userId, newChatroomKey))
        .catch(console.error)
}

export async function deleteChatroom(chatroomId) {
    try {
        return firebase.database().ref(`chatrooms/${chatroomId}`).remove()
    } catch (message) {
        return console.error(message)
    }
}

export async function getChatroomTitle(chatroomId) {
    try {
        const snapshot = await firebase
            .database()
            .ref(`chatrooms/${chatroomId}/chatroomTitle`)
            .get()
        return snapshot.exists() ? snapshot.val() : ``
    } catch (message) {
        return console.error(message)
    }
}
