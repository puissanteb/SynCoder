import firebase from 'firebase'
import { useState, useEffect } from 'react'
import firebaseConfig from '../firebaseConfig.json'
import {
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
} from '@material-ui/core'
import '@fontsource/roboto'

export default function Uploader({ type, id }) {
    useEffect(() => {
        if (!firebase.apps.length) firebase.initializeApp(firebaseConfig)
    }, [])

    const [uploaded, setUploaded] = useState(false)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const uploadImage = (file) => {
        setLoading(true)
        const imageRef = firebase
            .storage()
            .ref()
            .child(`images/${type}/${id}.jpg`)
        imageRef.put(file).then((snapshot) => {
            setUploaded(true)
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
                <DialogTitle id="form-dialog-title">이미지 업로더</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        이미지 업로드를 통해 파일을 첨부하고 업로드합니다.
                    </DialogContentText>
                    <input
                        type="file"
                        id="input"
                        accept="image/*"
                        onChange={(e) =>
                            Array.from(e.target.files).forEach((file) =>
                                uploadImage(file)
                            )
                        }
                    />
                    <p>
                        {loading
                            ? '이미지 업로드를 진행하고 있습니다.'
                            : uploaded
                            ? '이미지 업로드가 완료되었습니다.'
                            : '이미지를 업로드해 주세요.'}
                    </p>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        color="primary"
                        disabled={loading}
                    >
                        확인
                    </Button>
                </DialogActions>
            </Dialog>
            <Button variant="contained" onClick={handleOpen}>
                이미지 업로더
            </Button>
        </>
    )
}
