import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from 'components/LoginPage/LoginPage'
import Home from 'components/Home/Home'
import { observer } from 'mobx-react'
import { useStores } from 'store'
import { Box } from '@mui/system'
import { CircularProgress } from '@mui/material'
import { getCookie } from 'tools/cookie'
import { getProfile } from 'api/login'
import './App.scss'

const LoadingApp = (): JSX.Element => {
    useEffect(() => {
        if (getCookie('token')) {
            getProfile()
        }
    }, [])

    return (
        <Box className="appLoadingBox">
            <CircularProgress size={64} className="appLoadingBoxLoader" />
        </Box>
    )
}

const App = observer(() => {
    const { me } = useStores()

    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            {!!me.me?.type && <Route path="/home/*" element={<Home />} />}
            <Route path="/home/*" element={<LoadingApp />} />
        </Routes>
    )
})

export default App
