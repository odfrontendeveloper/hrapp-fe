import React from 'react'
import { Box } from '@mui/system'
import { CircularProgress } from '@mui/material'
import { appColor } from 'stylesConfig'

const LoadingPage = (): JSX.Element => {
    return (
        <Box
            sx={{
                marginTop: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
            }}
        >
            <CircularProgress
                size={64}
                sx={{
                    color: appColor,
                }}
            />
        </Box>
    )
}

export default LoadingPage
