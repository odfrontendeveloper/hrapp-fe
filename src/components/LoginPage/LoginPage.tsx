import React, { useState } from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import { ThemeProvider } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import theme from 'tools/theme'
import Lang from 'components/Lang'

const LoginPage = observer((): JSX.Element => {
    const { t } = useTranslation()

    const [signIn, setSignIn] = useState<boolean>(true)

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Lang />
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {signIn ? t('login.signIn.title') : t('login.signUp.title')}
                    </Typography>
                    {signIn ? <SignIn setSignIn={setSignIn} /> : <SignUp setSignIn={setSignIn} />}
                </Box>
            </Container>
        </ThemeProvider>
    )
})

export default LoginPage
