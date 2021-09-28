import firebase from 'firebase'
import { getChatroomByChatroomId } from './chatrooms'

export function inviteMember(memberId, chatroomId) {
    const now = JSON.stringify(new Date()).replaceAll(`"`, ``)
    const newMemberKey = firebase.database().ref(`members`).push().key
    return firebase
        .database()
        .ref(`members/${newMemberKey}`)
        .set({ userId: memberId, chatroomId, createdAt: now })
}

export function kickMember(memberId, chatroomId) {
    const membersRef = firebase
        .database()
        .ref(`members`)
        .orderByChild(`userId`)
        .equalTo(memberId)
    return new Promise((resolve, reject) => {
        membersRef.once(
            'value',
            (snapshot) => {
                if (snapshot.exists()) {
                    const obj = snapshot.val()
                    for (let key in obj) {
                        if (obj[key].chatroomId === chatroomId) {
                            firebase.database().ref(`members/${key}`).remove()
                            resolve(true)
                        }
                    }
                    reject(`already kicked`)
                } else {
                    reject(`snapshot not found`)
                }
            },
            (error) => reject(error)
        )
    })
}

export function getMembersByChatroomId(chatroomId) {
    const membersRef = firebase
        .database()
        .ref(`members`)
        .orderByChild(`chatroomId`)
        .equalTo(chatroomId)
    return new Promise((resolve, reject) => {
        membersRef.once(
            'value',
            (snapshot) => {
                if (snapshot.exists()) {
                    const obj = snapshot.val()
                    const arr = Object.values(obj).map(({ userId }) => userId)
                    resolve(arr)
                } else {
                    resolve([])
                }
            },
            (error) => reject(error)
        )
    })
}

export function getChatroomsByUserId(userId) {
    const membersRef = firebase
        .database()
        .ref(`members`)
        .orderByChild(`userId`)
        .equalTo(userId)
    return new Promise((resolve, reject) => {
        membersRef.once(
            'value',
            (snapshot) => {
                if (snapshot.exists()) {
                    const obj = snapshot.val()
                    const arr = Object.values(obj)
                        .map((value) => value.chatroomId)
                        .map((chatroomId) =>
                            getChatroomByChatroomId(chatroomId)
                        )
                    resolve(Promise.all(arr))
                } else {
                    resolve([])
                }
            },
            (error) => reject(error)
        )
    })
}
