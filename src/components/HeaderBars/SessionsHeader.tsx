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

const SessionsHeader = observer((): JSX.Element => {
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
            <TextField
                className="searchField"
                size="small"
                placeholder={t('common.search.default')}
                value={sessions.sessionsSearchString}
                onChange={(e) => sessions.setSessionsSearchString(e.target.value)}
            />
            <Box className="operationsContainer">
                <Pagination
                    page={sessions.sessionsPaginate.page}
                    count={sessions.sessionsPaginate.totalPages}
                    onChange={(e, value) => {
                        getSessions(sessions.sessionsSearchString, value)
                    }}
                />
            </Box>
            <Link to="/home/sessions/create" style={{ textDecoration: 'none' }}>
                <Button type="button" variant="contained" endIcon={<AddIcon />} sx={{ ml: '25px' }}>
                    {t('sessions.createSession')}
                </Button>
            </Link>
        </Box>
    )
})

export default SessionsHeader
