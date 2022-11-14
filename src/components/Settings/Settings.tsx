import React from 'react'
import Button from '@mui/material/Button'
import { Box } from '@mui/system'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { Typography } from '@mui/material'
import ChangeProfile from './components/ChangeProfile'
import ChangePassword from './components/ChangePassword'
import { useStores } from 'store'
import CustomModal from 'CustomComponents/CustomModal'

const modalTitle = {
    profile: 'settings.profile.title',
    organization: 'settings.organization.title',
    password: 'settings.password.title',
}

const Settings = observer((): JSX.Element => {
    const { t } = useTranslation()

    const { settings } = useStores()

    const { open } = settings

    const handleOpen = (mode: 'profile' | 'password') =>
        settings.setOpen({
            mode,
            isOpen: true,
        })

    const handleClose = () =>
        settings.setOpen({
            ...open,
            isOpen: false,
        })

    return (
        <>
            <Box>
                <Button variant="contained" sx={{ margin: 1 }} onClick={() => handleOpen('profile')}>
                    {t('settings.profile.title')}
                </Button>
                <Button variant="contained" sx={{ margin: 1 }} onClick={() => handleOpen('password')}>
                    {t('settings.password.title')}
                </Button>
            </Box>
            <CustomModal open={open.isOpen} onClose={handleClose}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {t(modalTitle[open.mode])}
                </Typography>
                {open.mode === 'profile' && <ChangeProfile onClose={handleClose} />}
                {open.mode === 'password' && <ChangePassword onClose={handleClose} />}
            </CustomModal>
        </>
    )
})

export default Settings
