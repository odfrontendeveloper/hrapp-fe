import React, { useEffect } from 'react'
import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { observer } from 'mobx-react'
import Lang from 'components/Lang'
import { Link, Params, useMatch } from 'react-router-dom'
import './styles.scss'
import { useTranslation } from 'react-i18next'
import { sendForm } from 'api/sessions'

const InvitationHeader = observer((): JSX.Element => {
    const match = useMatch('/home/invitations/:id')

    const paramsList: Params<'id'> | undefined = match?.params

    const inviteId: string | null = paramsList?.id || null

    const { t } = useTranslation()
    return (
        <Box className="pageHeader">
            <Typography component="h1" variant="h6">
                HR 360
            </Typography>
            <Box className="operationsContainer">
                <Lang />
            </Box>
            <Link to="/home/invitations">
                <Button type="button" variant="contained" style={{ marginLeft: '25px' }}>
                    <ArrowBackIcon />
                </Button>
            </Link>
            <Button
                type="button"
                variant="contained"
                style={{ marginLeft: '25px' }}
                onClick={() => inviteId && sendForm(inviteId)}
            >
                {t('common.save')}
            </Button>
        </Box>
    )
})

export default InvitationHeader
