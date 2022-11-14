import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { Box } from '@mui/system'
import { Button, CircularProgress, Typography } from '@mui/material'
import CustomModal from 'CustomComponents/CustomModal'
import CreateUser from './components/CreateUser'
import { deleteUser, getOrganizationUsers } from 'api/staff'
import { useStores } from 'store'
import { OrganizationUser } from 'store/staff'
import UserCard from './components/UserCard'
import { useTranslation } from 'react-i18next'
import UpdateUserProfile from './components/UpdateUserProfile'
import UpdateUserPassword from './components/UpdateUserPassword'
import UpdateUserType from './components/UpdateUserType'
import UpdateUserPermissions from './components/UpdateUserPermissions'
import UpdateUserPosition from './components/UpdateUserPosition'
import { appColor } from 'stylesConfig'

const Staff = observer((): JSX.Element => {
    const { staff } = useStores()

    const { t } = useTranslation()

    const { search } = staff

    const handleClose = (): void => {
        staff.setisOpenModalCreateUser(false)
    }

    const closeEditModal = (): void => {
        staff.setUserModal({
            isOpen: false,
            userId: null,
            mode: staff.editUserModal.mode,
        })
    }

    const isModalOpen = (type: string): boolean => staff.editUserModal.isOpen && staff.editUserModal.mode === type

    useEffect(() => {
        getOrganizationUsers(search, 1, null, null, null)
    }, [search])

    return (
        <>
            <Box sx={{ p: 2, display: 'flex', flexWrap: 'wrap' }}>
                {!staff.isFetchingUsers ? (
                    staff.users.map((item: OrganizationUser, i) => <UserCard item={item} key={item.id} />)
                ) : (
                    <Box sx={{ p: 1 }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress />
                    </Box>
                )}
            </Box>
            <CustomModal open={staff.isOpenModalCreateUser} onClose={handleClose}>
                <Typography variant="h6" component="h2">
                    {t('staff.createUser')}
                </Typography>
                <CreateUser setOpen={() => staff.setisOpenModalCreateUser(false)} search={search} />
            </CustomModal>
            <CustomModal open={isModalOpen('password')} onClose={closeEditModal}>
                <Typography variant="h6" component="h2">
                    {t('staff.userEdit.main') + t('staff.userEdit.password')}
                </Typography>
                <UpdateUserPassword setOpen={closeEditModal} />
            </CustomModal>
            <CustomModal open={isModalOpen('profile')} onClose={closeEditModal}>
                <Typography variant="h6" component="h2">
                    {t('staff.userEdit.main') + t('staff.userEdit.profile')}
                </Typography>
                <UpdateUserProfile setOpen={closeEditModal} />
            </CustomModal>
            <CustomModal open={isModalOpen('type')} onClose={closeEditModal}>
                <Typography variant="h6" component="h2">
                    {t('staff.userEdit.main') + t('staff.userEdit.role')}
                </Typography>
                <UpdateUserType setOpen={closeEditModal} />
            </CustomModal>
            <CustomModal open={isModalOpen('permissions')} onClose={closeEditModal}>
                <Typography variant="h6" component="h2">
                    {t('staff.userEdit.main') + t('staff.userEdit.permissions')}
                </Typography>
                <UpdateUserPermissions setOpen={closeEditModal} isOpen={isModalOpen('permissions')} />
            </CustomModal>
            <CustomModal open={isModalOpen('position')} onClose={closeEditModal}>
                <Typography variant="h6" component="h2">
                    {t('staff.userEdit.main') + t('staff.userEdit.position')}
                </Typography>
                <UpdateUserPosition setOpen={closeEditModal} />
            </CustomModal>
            <CustomModal open={isModalOpen('delete')} onClose={closeEditModal}>
                <Typography variant="h6" component="h2">
                    {t('staff.confirmDeleteUser')}
                </Typography>
                <Box sx={{ position: 'relative' }}>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="error"
                        sx={{ mb: 2 }}
                        disabled={staff.isFetchingCreateUser}
                        onClick={() => staff.editUserModal.userId && deleteUser(staff.editUserModal.userId)}
                    >
                        {t('common.delete')}
                    </Button>
                    {staff.isFetchingCreateUser && (
                        <CircularProgress
                            size={24}
                            sx={{
                                color: appColor,
                                position: 'absolute',
                                top: '18px',
                                left: '50%',
                                marginTop: '-12px',
                                marginLeft: '-12px',
                            }}
                        />
                    )}
                    <Button type="button" fullWidth variant="outlined" onClick={closeEditModal} sx={{ mb: 2 }}>
                        {t('settings.close')}
                    </Button>
                </Box>
            </CustomModal>
        </>
    )
})

export default Staff
