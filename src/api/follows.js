import firebase from 'firebase'

export function follow(userId, followUserId, createdAt) {
    const newFollowKey = firebase.database().ref(`follows`).push().key
    return firebase.database().ref(`follows/${newFollowKey}`).set({
        userId,
        followUserId,
        createdAt,
    })
}
