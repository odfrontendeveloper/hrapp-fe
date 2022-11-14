import React from 'react'
import { Button, Pagination, TextField, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Box } from '@mui/system'
import { observer } from 'mobx-react'
import { useStores } from 'store'
import Lang from 'components/Lang'
import { useTranslation } from 'react-i18next'
import { getPositions } from 'api/positions'
import './styles.scss'

const PositionsHeader = observer((): JSX.Element => {
    const { positions } = useStores()

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
                value={positions.search}
                onChange={(e) => positions.setSearch(e.target.value)}
            />
            <Box className="operationsContainer">
                <Pagination
                    page={positions.positionsPagination.page}
                    count={positions.positionsPagination.totalPages}
                    onChange={(e, value) => {
                        getPositions(positions.search, value)
                    }}
                />
            </Box>
            <Box className="marginLeft25">
                <Button type="button" variant="contained" onClick={() => positions.setisOpenCreatePositionModal(true)}>
                    <AddIcon />
                </Button>
            </Box>
        </Box>
    )
})

export default PositionsHeader
