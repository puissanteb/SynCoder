import firebase from 'firebase'

export async function getUserNickname(userId) {
    const usersRef = firebase.database().ref(`users/${userId}`)
    try {
        const snapshot = await usersRef.get()
        if (snapshot.exists()) {
            return snapshot.val().nickname ?? '이름 없음'
        } else {
            return '이름 없음'
        }
    } catch (message) {
        return console.error(message)
    }
}

export function saveUserInfo({ userId, nickname, email, mobile }, isSignIn) {
    const usersRef = firebase.database().ref(`users/${userId}`)
    usersRef
        .get()
        .then()
        .then((snapshot) => {
            if (!isSignIn || !snapshot.exists()) {
                usersRef.set({
                    nickname,
                    email,
                    mobile,
                })
            }
            return true
        })
        .catch(console.error)
}

export async function getPhotoURL(userId) {
    const imageRef = firebase.storage().ref().child(`images/temp/${userId}.jpg`)
    try {
        return imageRef.getDownloadURL()
    } catch (message) {
        return console.error(message)
    }
}
