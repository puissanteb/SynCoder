import React, { useState, useEffect } from 'react'
import { Grid, Paper, List } from '@material-ui/core'

export default function Groups() {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
                <Paper>
                    <List></List>
                </Paper>
            </Grid>
        </Grid>
    )
}
