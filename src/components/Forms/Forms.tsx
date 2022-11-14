import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { Box } from '@mui/system'
import Paper from '@mui/material/Paper'
import { useStores } from 'store'
import LoadingPage from 'CustomComponents/LoadingPage'
import { getPositionsForForms } from 'api/forms'
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useTranslation } from 'react-i18next'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Navigate } from 'react-router-dom'

const Forms = observer((): JSX.Element => {
    const { forms } = useStores()

    const [needRedirect, setNeedRedirect] = useState<number | null>(null)
    const [needRedirectToSettings, setNeedRedirectToSettings] = useState<number | null>(null)

    const { t } = useTranslation()

    const { isFetchingPositions, search } = forms

    useEffect(() => {
        getPositionsForForms(search, 1)
    }, [search])

    if (!!needRedirect) {
        return <Navigate to={`/home/forms/${needRedirect}`} />
    }

    if (!!needRedirectToSettings) {
        return <Navigate to={`/home/formssettings/${needRedirectToSettings}`} />
    }

    if (isFetchingPositions) {
        return <LoadingPage />
    }

    return (
        <Box>
            <TableContainer component={Paper}>
                <Table className="minWidth650" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" className="w100">
                                {t('common.positionname')}
                            </TableCell>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {forms.positions.map((position) => (
                            <TableRow key={position.id}>
                                <TableCell align="left" scope="row">
                                    {position.name}
                                </TableCell>
                                <TableCell align="center">
                                    <Button
                                        type="button"
                                        variant="contained"
                                        size="medium"
                                        onClick={() => {
                                            forms.setSelectedPosition(position.id)
                                            setNeedRedirectToSettings(position.id)
                                        }}
                                        sx={{ whiteSpace: 'nowrap' }}
                                    >
                                        {t('common.menu.forms')}
                                    </Button>
                                </TableCell>
                                <TableCell align="center">
                                    <Button
                                        type="button"
                                        variant="contained"
                                        size="medium"
                                        onClick={() => {
                                            forms.setSelectedPosition(position.id)
                                            setNeedRedirect(position.id)
                                        }}
                                    >
                                        {t('forms.competencies')}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
})

export default Forms
