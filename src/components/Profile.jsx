import React, { useState } from 'react'
import firebase from 'firebase'
import {
    Avatar,
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    TextField,
    Typography,
} from '@material-ui/core'

export default function Profile({ user, setUser }) {
    const { email } = user
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const saveChanges = () => {
        updateProfile()
        setOpen(false)
    }
    const [displayName, setDisplayName] = useState(user.displayName ?? ``)
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber ?? ``)
    const [photoURL, setPhotoURL] = useState(user.photoURL ?? ``)
    const updateProfile = () => {
        user.updateProfile({
            displayName,
            phoneNumber,
            photoURL,
        })
            .then(() => console.log(`계정 정보 변경 성공`))
            .catch(console.error)
    }
    const signOut = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                setUser(null)
            })
            .catch(console.error)
    }
    const uploadImage = (file) => {
        setLoading(true)
        const imageRef = firebase
            .storage()
            .ref()
            .child(`images/temp/${user.uid}.jpg`)
        imageRef
            .put(file)
            .then((snapshot) => snapshot.ref.getDownloadURL())
            .then((URL) => {
                setPhotoURL(URL)
                setLoading(false)
            })
    }
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">회원 정보 수정</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="displayname"
                        label="이름(닉네임)"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        type="text"
                        fullWidth
                        required
                    />
                    <TextField
                        margin="dense"
                        id="phonenumber"
                        label="휴대폰 번호"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        type="tel"
                        fullWidth
                        required
                    />
                    <TextField
                        margin="dense"
                        id="photourl"
                        label="프로필 사진"
                        type="file"
                        fullWidth
                        accept="image/*"
                        onChange={(e) =>
                            Array.from(e.target.files).forEach((file) =>
                                uploadImage(file)
                            )
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={saveChanges}
                        color="primary"
                        disabled={loading}
                    >
                        확인
                    </Button>
                </DialogActions>
            </Dialog>
            <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
            >
                <Avatar alt={displayName} src={photoURL} />
                이름(닉네임): {displayName}
            </Typography>
            <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
            >
                이메일: {email}
            </Typography>
            <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
            >
                전화번호: {phoneNumber}
            </Typography>
            <Button variant="contained" onClick={handleOpen}>
                정보 수정
            </Button>
            <Button variant="contained" onClick={signOut}>
                로그아웃
            </Button>
        </>
    )
}
