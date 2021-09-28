import firebase from 'firebase'

export async function getAllGroups() {
    const groupsRef = firebase.database().ref(`groups`)
    try {
        const snapshot = await groupsRef.get()
        if (snapshot.exists()) {
            const obj = snapshot.val()
            const arr = []
            for (let key in obj) {
                arr.push({ ...obj[key], groupId: key })
            }
            return arr
        } else {
            return []
        }
    } catch (message) {
        return console.error(message)
    }
}

export async function getGroupInfo(groupId) {
    const groupsRef = firebase.database().ref(`groups/${groupId}`)
    try {
        const snapshot = await groupsRef.get()
        if (snapshot.exists()) {
            return snapshot.val()
        } else {
            return {}
        }
    } catch (message) {
        return console.error(message)
    }
}

export async function getGroupPhotoURL(groupId) {
    const imageRef = firebase.storage().ref(`images/group/${groupId}.jpg`)
    try {
        return imageRef.getDownloadURL()
    } catch (message) {
        return console.error(message)
    }
}

export function addGroup(title, description) {
    const now = JSON.stringify(new Date()).replaceAll(`"`, ``)
    const newGroupKey = firebase.database().ref(`groups`).push().key
    return firebase.database().ref(`groups/${newGroupKey}`).set({
        title,
        description,
        createdAt: now,
    })
}
