import React from 'react'
import { Button, Pagination, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import AddIcon from '@mui/icons-material/Add'
import { observer } from 'mobx-react'
import { useStores } from 'store'
import Lang from 'components/Lang'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import './styles.scss'
import { getSessions } from 'api/sessions'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const SessionDetailsHeader = observer((): JSX.Element => {
    const { sessions } = useStores()
    const { t } = useTranslation()

    return (
        <Box className="pageHeader">
            <Typography component="h1" variant="h6">
                HR 360
            </Typography>
            <Box className="operationsContainer">
                <Lang />
            </Box>
            <Link to="/home/sessions/" style={{ textDecoration: 'none' }}>
                <Button type="button" variant="contained" style={{ marginLeft: '25px' }}>
                    <ArrowBackIcon />
                </Button>
            </Link>
        </Box>
    )
})

export default SessionDetailsHeader
