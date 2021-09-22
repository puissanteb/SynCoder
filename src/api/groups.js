import firebase from 'firebase'

export function addGroup(title, description, createdAt) {
    const newGroupKey = firebase.database().ref(`follows`).push().key
    return firebase.database().ref(`follows/${newGroupKey}`).set({
        title,
        description,
        createdAt,
    })
}
