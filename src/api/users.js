import firebase from 'firebase'

export async function getUsers() {
    const usersRef = firebase.database().ref(`users`)
    try {
        const snapshot = await usersRef.get()
        if (snapshot.exists()) {
            return Object.keys(snapshot.val())
        } else {
            return []
        }
    } catch (message) {
        return console.error(message)
    }
}

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

export async function getPhotoURL(userId) {
    const imageRef = firebase.storage().ref(`images/temp/${userId}.jpg`)
    try {
        return imageRef.getDownloadURL()
    } catch (message) {
        return console.error(message)
    }
}

export async function getUserDescription(userId) {
    const usersRef = firebase.database().ref(`users/${userId}`)
    try {
        const snapshot = await usersRef.get()
        if (snapshot.exists()) {
            return snapshot.val().description ?? '자기소개가 없습니다.'
        } else {
            return '자기소개가 없습니다.'
        }
    } catch (message) {
        return console.error(message)
    }
}

export function saveUserInfo(
    {
        userId,
        nickname,
        email,
        mobile = `010-0000-0000`,
        description = `자기소개가 없습니다.`,
    },
    isSignIn
) {
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
                    description,
                })
            }
            return true
        })
        .catch(console.error)
}
