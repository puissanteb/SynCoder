import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import {
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    TextField,
    ListSubheader,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core'
import { Settings, Lock } from '@material-ui/icons'
import { saveUserInfo, getUserNickname } from '../../api/users'

export default function Preferences({ user }) {
    const { email } = user
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [nickname, setNickname] = useState(``)
    const [description, setDescription] = useState(``)
    const [phoneNumber, setPhoneNumber] = useState(``)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const saveChanges = () => {
        updateProfile()
        setOpen(false)
    }
    const signOut = () => {
        firebase.auth().signOut().catch(console.error)
    }
    useEffect(() => {
        getUserNickname(user.uid).then(setNickname).catch(console.error)
    }, [])
    const updateProfile = () => {
        saveUserInfo(
            {
                userId: user.uid,
                nickname,
                email,
                mobile: phoneNumber,
                description,
            },
            false
        )
    }
    const uploadImage = (file) => {
        setLoading(true)
        const imageRef = firebase
            .storage()
            .ref()
            .child(`images/temp/${user.uid}.jpg`)
        imageRef
            .put(file)
            .then(() => setLoading(false))
            .catch(console.error)
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
                        id="standard-required"
                        label="이름(닉네임)"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        type="text"
                        fullWidth
                        required
                    />
                    <TextField
                        margin="dense"
                        label="소개"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        type="text"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="휴대폰 번호"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        type="tel"
                        fullWidth
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
                        disabled={loading || !nickname}
                    >
                        확인
                    </Button>
                </DialogActions>
            </Dialog>
            <ListSubheader inset>설정</ListSubheader>
            <ListItem button onClick={handleOpen}>
                <ListItemIcon>
                    <Settings />
                </ListItemIcon>
                <ListItemText primary="정보 수정" />
            </ListItem>
            <ListItem button onClick={signOut}>
                <ListItemIcon>
                    <Lock />
                </ListItemIcon>
                <ListItemText primary="로그아웃" />
            </ListItem>
        </>
    )
}
