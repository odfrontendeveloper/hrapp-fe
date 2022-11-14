import React from 'react'
import { Avatar } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'
import { observer } from 'mobx-react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useStores } from 'store'

const Profile = observer((): JSX.Element => {
    const { me } = useStores()

    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <AccountCircleIcon fontSize="large" />
            </Avatar>
            {!!me.me && (
                <Box
                    sx={{
                        marginTop: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        {me.me?.firstname}
                    </Typography>
                    <Typography component="h1" variant="h5">
                        {me.me?.middlename}
                    </Typography>
                    <Typography component="h1" variant="h5">
                        {me.me?.lastname}
                    </Typography>
                    <Typography component="h6" variant="h6">
                        ({me.me?.type})
                    </Typography>
                </Box>
            )}
        </Box>
    )
})

export default Profile
