import { getInvitations } from 'api/sessions'
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useStores } from 'store'

const Invitations = observer((): JSX.Element => {
    const { t } = useTranslation()

    const { sessions } = useStores()

    useEffect(() => {
        getInvitations()
    }, [])

    return (
        <Box>
            <TableContainer component={Paper}>
                <Table className="minWidth650" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('sessions.steps.step2.table.assessedEmployee')}</TableCell>
                            <TableCell>{t('sessions.steps.step2.table.evaluationForm')}</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sessions.invitations.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.assessedEmployee}</TableCell>
                                <TableCell>{item.form}</TableCell>
                                <TableCell align="right">
                                    <Link to={`/home/invitations/${item.id}`} style={{ textDecoration: 'none' }}>
                                        <Button variant="contained" type="button">
                                            {t('common.select')}
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
})

export default Invitations
