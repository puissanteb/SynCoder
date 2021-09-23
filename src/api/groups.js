import firebase from 'firebase'

export function addGroup(title, description, createdAt) {
    const newGroupKey = firebase.database().ref(`groups`).push().key
    return firebase.database().ref(`groups/${newGroupKey}`).set({
        title,
        description,
        createdAt,
    })
}
