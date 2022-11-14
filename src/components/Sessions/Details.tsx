import {
    Box,
    Button,
    CircularProgress,
    Grid,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'
import { getSessionDetails } from 'api/sessions'
import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check'
import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Params, useMatch, Link } from 'react-router-dom'
import { useStores } from 'store'
import { appColor } from 'stylesConfig'

const Details = observer(() => {
    const { t } = useTranslation()
    const { sessions } = useStores()

    const match = useMatch('/home/sessions/:sessionId')

    const paramsList: Params<'sessionId'> | undefined = match?.params

    const sessionId: string | null = paramsList?.sessionId || null

    useEffect(() => {
        getSessionDetails(sessionId)
    }, [sessionId])

    if (sessions.isFetchingDetails) {
        return (
            <CircularProgress
                size={24}
                sx={{
                    color: appColor,
                }}
            />
        )
    }

    return (
        <Box>
            <TableContainer component={Paper}>
                <Table className="minWidth650" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('sessions.steps.step2.table.appraiser')}</TableCell>
                            <TableCell>{t('sessions.steps.step2.table.assessedEmployee')}</TableCell>
                            <TableCell>{t('sessions.steps.step2.table.evaluationForm')}</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sessions.details.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.appraiser}</TableCell>
                                <TableCell>{item.assessedEmployee}</TableCell>
                                <TableCell>{item.formTemplate}</TableCell>
                                <TableCell>
                                    {!item.report ? <CloseIcon color="error" /> : <CheckIcon color="success" />}
                                </TableCell>
                                <TableCell>
                                    {item.report ? (
                                        <Link
                                            to={`/home/sessions/${sessionId}/details/${item.id}`}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <Button
                                                type="button"
                                                variant="contained"
                                                size="medium"
                                                sx={{ whiteSpace: 'nowrap' }}
                                            >
                                                {t('common.select')}
                                            </Button>
                                        </Link>
                                    ) : null}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
})

export default Details
