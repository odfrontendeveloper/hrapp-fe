import React from 'react'
import { Pagination, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { observer } from 'mobx-react'
import { useStores } from 'store'
import Lang from 'components/Lang'
import { useTranslation } from 'react-i18next'
import { getPositionsForForms } from 'api/forms'
import './styles.scss'

const FormsHeader = observer((): JSX.Element => {
    const { forms } = useStores()

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
                value={forms.search}
                onChange={(e) => forms.setSearch(e.target.value)}
            />
            <Box className="operationsContainer">
                <Pagination
                    page={forms.positionsPagination.page}
                    count={forms.positionsPagination.totalPages}
                    onChange={(e, value) => {
                        getPositionsForForms(forms.search, value)
                    }}
                />
            </Box>
        </Box>
    )
})

export default FormsHeader
