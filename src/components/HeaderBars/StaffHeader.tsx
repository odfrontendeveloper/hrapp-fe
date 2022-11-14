import React from 'react'
import { Button, Menu, Pagination, TextField, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Box } from '@mui/system'
import { observer } from 'mobx-react'
import { useStores } from 'store'
import { getOrganizationUsers } from 'api/staff'
import Lang from 'components/Lang'
import StaffFilters from './components/StaffFilters'
import { useTranslation } from 'react-i18next'
import './styles.scss'

const StaffHeader = observer((): JSX.Element => {
    const { staff } = useStores()

    const { t } = useTranslation()

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <Box className="pageHeader">
            <Typography component="h1" variant="h6">
                HR 360
            </Typography>
            <Box className="operationsContainer">
                <Lang />
            </Box>
            <div>
                <Box className="marginLeft25">
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        type="button"
                        variant="contained"
                    >
                        {t('common.filter')}
                    </Button>
                </Box>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <StaffFilters />
                </Menu>
            </div>
            <TextField
                className="searchField"
                size="small"
                placeholder={t('common.search.default')}
                value={staff.search}
                onChange={(e) => staff.setSearch(e.target.value)}
            />
            <Box className="operationsContainer">
                <Pagination
                    page={staff.usersPagination.page}
                    count={staff.usersPagination.totalPages}
                    onChange={(e, value) => {
                        getOrganizationUsers(staff.search, value, null, null, null)
                    }}
                />
            </Box>
            <Box className="marginLeft25">
                <Button type="button" variant="contained" onClick={() => staff.setisOpenModalCreateUser(true)}>
                    <AddIcon />
                </Button>
            </Box>
        </Box>
    )
})

export default StaffHeader
