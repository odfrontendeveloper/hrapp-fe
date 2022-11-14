import React from 'react'
import { Modal } from '@mui/material'
import { Box } from '@mui/system'

const modalStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 5,
}

const boxStyle = {
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '5px',
    boxShadow: 24,
    p: 2,
    background: 'white',
}

interface ICustomModal {
    children: React.ReactNode
    open: boolean
    onClose: () => void
}

const CustomModal = ({ children, open, onClose }: ICustomModal): JSX.Element => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={modalStyle}
        >
            <Box sx={boxStyle}>{children}</Box>
        </Modal>
    )
}

export default CustomModal
