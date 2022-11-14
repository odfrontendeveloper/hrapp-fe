import React from 'react'
import { Button, Pagination, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import AddIcon from '@mui/icons-material/Add'
import { observer } from 'mobx-react'
import { useStores } from 'store'
import Lang from 'components/Lang'
import { useTranslation } from 'react-i18next'
import { Link, Params, useMatch } from 'react-router-dom'
import './styles.scss'
import { getSessions } from 'api/sessions'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const SessionDetailsFormHeader = observer((): JSX.Element => {
    const { t } = useTranslation()

    const match = useMatch('/home/sessions/:sessionId/details/:id')

    const paramsList: Params<'sessionId'> | undefined = match?.params

    const sessionId: string | null = paramsList?.sessionId || null

    return (
        <Box className="pageHeader">
            <Typography component="h1" variant="h6">
                HR 360
            </Typography>
            <Box className="operationsContainer">
                <Lang />
            </Box>
            <Link to={`/home/sessions/${sessionId}`} style={{ textDecoration: 'none' }}>
                <Button type="button" variant="contained" style={{ marginLeft: '25px' }}>
                    <ArrowBackIcon />
                </Button>
            </Link>
        </Box>
    )
})

export default SessionDetailsFormHeader
