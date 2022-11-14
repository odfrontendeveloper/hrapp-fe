import React from 'react'
import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import AddIcon from '@mui/icons-material/Add'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { observer } from 'mobx-react'
import { useStores } from 'store'
import Lang from 'components/Lang'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import './styles.scss'

const FormsSettingsHeader = observer((): JSX.Element => {
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
            <Box className="marginLeft25">
                <Link to="/home/forms">
                    <Button type="button" variant="contained" onClick={() => forms.setSelectedPosition(null)}>
                        <ArrowBackIcon />
                    </Button>
                </Link>
                <Button
                    type="button"
                    variant="contained"
                    endIcon={<AddIcon />}
                    onClick={() => {
                        forms.setIsOpenCreateTemplate(true)
                    }}
                    sx={{ ml: '25px' }}
                >
                    {t('forms.forms.createForm')}
                </Button>
            </Box>
        </Box>
    )
})

export default FormsSettingsHeader
