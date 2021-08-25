import firebase from 'firebase'
import { useEffect } from 'react'
import firebaseConfig from '../utils/firebaseConfig.json'

export default function Uploader() {
    useEffect(() => {
        firebase.initializeApp(firebaseConfig)
    }, [])

    const uploadImage = (type, id, file) => {
        const imageRef = firebase.storage().ref().child(`images/${type}/${id}.jpg`)
        imageRef.put(file).then((snapshot) => {
        })
    }

    return (
        <>
            <p>SynCoder 이미지 업로더</p>
            <input
                type="file"
                id="input"
                accept="image/*"
                onChange={(e) =>
                    Array.from(e.target.files).forEach((file) =>
                        uploadImage('users', '12345678', file)
                    )
                }
            />
        </>
    )
}
