import firebase from 'firebase'

export function getUserNickname(userId) {
    const usersRef = firebase.database().ref(`users/${userId}`)
    return usersRef
        .get()
        .then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val().nickname ?? '이름 없음'
            } else {
                return '이름 없음'
            }
        })
        .catch(console.error)
}

export function saveUserInfo({ userId, nickname, email }) {
    const usersRef = firebase.database().ref(`users/${userId}`)
    usersRef.set({
        nickname,
        email,
    })
}
