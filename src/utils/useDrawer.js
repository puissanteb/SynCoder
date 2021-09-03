import React, { useState } from 'react'

export default function useDrawer() {
    const [open, setOpen] = useState(true)
    const handleDrawerOpen = () => {
        setOpen(true)
    }
    const handleDrawerClose = () => {
        setOpen(false)
    }

    return {
        open,
        handleDrawerOpen,
        handleDrawerClose,
    }
}
