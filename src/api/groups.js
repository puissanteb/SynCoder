import firebase from 'firebase'

export function addGroup(title, description, createdAt) {
    const now = JSON.stringify(new Date()).replaceAll(`"`, ``)
    const newGroupKey = firebase.database().ref(`groups`).push().key
    return firebase.database().ref(`groups/${newGroupKey}`).set({
        title,
        description,
        createdAt: now,
    })
}
