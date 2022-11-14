import React from 'react'
import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { observer } from 'mobx-react'
import Lang from 'components/Lang'
import { Link } from 'react-router-dom'
import './styles.scss'

const CreateSessionHeader = observer((): JSX.Element => {
    return (
        <Box className="pageHeader">
            <Typography component="h1" variant="h6">
                HR 360
            </Typography>
            <Box className="operationsContainer">
                <Lang />
            </Box>
            <Link to="/home/sessions">
                <Button type="button" variant="contained" style={{ marginLeft: '25px' }}>
                    <ArrowBackIcon />
                </Button>
            </Link>
        </Box>
    )
})

export default CreateSessionHeader
