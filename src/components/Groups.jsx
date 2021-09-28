import React, { useState, useEffect } from 'react'
import { Grid, Paper, List, Button } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { getGroupsByUserId } from '../api/joins'
import { getAllGroups, addGroup } from '../api/groups'
import GroupsListItem from './groups/GroupsListItem'
import CustomDialog from './misc/CustomDialog'
import firebase from 'firebase'

export default function Groups() {
    const [groups, setGroups] = useState([])
    const [myGroups, setMyGroups] = useState([])
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const loadGroups = () => {
        getGroupsByUserId(firebase.auth().currentUser?.uid)
            .then(setMyGroups)
            .then(getAllGroups)
            .then(setGroups)
            .catch(console.error)
    }
    const submitGroup = (title, description) => {
        setLoading(true)
        addGroup(title, description)
            .then(() => setLoading(false))
            .then(loadGroups)
            .catch(console.error)
    }
    useEffect(loadGroups, [])

    return (
        <>
            <CustomDialog
                title="새로운 그룹"
                label="그룹 이름"
                secondLabel="그룹 설명"
                open={open}
                loading={loading}
                double={true}
                handleClose={handleClose}
                callbackFn={submitGroup}
            />
            <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={9}>
                    <Paper>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Button
                                variant="outlined"
                                startIcon={<Add />}
                                onClick={handleOpen}
                            >
                                새로운 그룹
                            </Button>
                        </Grid>
                        <List>
                            {groups.map((group) => {
                                return (
                                    <GroupsListItem
                                        {...group}
                                        joining={myGroups.includes(
                                            group.groupId
                                        )}
                                        key={group.groupId}
                                    />
                                )
                            })}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}
