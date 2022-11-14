import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import * as yup from 'yup'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { useStores } from 'store'
import { appColor } from 'stylesConfig'
import { editUserPermissionsByAdmin } from 'api/staff'
import { Permissions } from 'store/staff'
import { Checkbox, FormControlLabel } from '@mui/material'

export const validateSchema = yup.object().shape({
    password: yup.string().required('required'),
})

const textOptions = ['common.active.no', 'common.active.yes']

interface IUpdteUserPermissions {
    setOpen: (type: boolean) => any
    isOpen: boolean
}

const UpdateUserPermissions = observer(({ setOpen, isOpen }: IUpdteUserPermissions): JSX.Element => {
    const { t } = useTranslation()
    const { me, staff } = useStores()

    const [editStaff, setEditStaff] = useState<boolean>(false)
    const [editForms, setEditForms] = useState<boolean>(false)
    const [editEvents, setEditEvents] = useState<boolean>(false)

    const selectedUserInfo = staff.users.find((user) => user.id === staff.editUserModal.userId)

    const checkPermission = (permissionName: Permissions): boolean =>
        !!selectedUserInfo && selectedUserInfo.permissions.map((permission) => permission.type).includes(permissionName)

    const default_can_manage_assessments = checkPermission(Permissions.can_manage_assessments)
    const default_can_manage_forms = checkPermission(Permissions.can_manage_forms)
    const default_can_manage_staff = checkPermission(Permissions.can_manage_staff)

    useEffect(() => {
        setEditEvents(!!default_can_manage_assessments)
    }, [isOpen, default_can_manage_assessments])

    useEffect(() => {
        setEditForms(!!default_can_manage_forms)
    }, [isOpen, default_can_manage_forms])

    useEffect(() => {
        setEditStaff(!!default_can_manage_staff)
    }, [isOpen, default_can_manage_staff])

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (selectedUserInfo) {
            const permissions: Permissions[] = []
            if (editStaff) permissions.push(Permissions.can_manage_staff)
            if (editForms) permissions.push(Permissions.can_manage_forms)
            if (editEvents) permissions.push(Permissions.can_manage_assessments)
            editUserPermissionsByAdmin({
                userId: +selectedUserInfo.id,
                permissions,
            })
        }
    }

    if (!selectedUserInfo) return <></>

    return (
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormControlLabel
                        value="end"
                        control={<Checkbox checked={editStaff} onChange={(e) => setEditStaff(e.target.checked)} />}
                        label={t('staff.permissions.can_manage_staff')}
                        labelPlacement="end"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        value="end"
                        control={<Checkbox checked={editForms} onChange={(e) => setEditForms(e.target.checked)} />}
                        label={t('staff.permissions.can_manage_forms')}
                        labelPlacement="end"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        value="end"
                        control={<Checkbox checked={editEvents} onChange={(e) => setEditEvents(e.target.checked)} />}
                        label={t('staff.permissions.can_manage_assessments')}
                        labelPlacement="end"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ position: 'relative' }}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mb: 2 }}
                            disabled={staff.isFetchingCreateUser}
                        >
                            {t('common.save')}
                        </Button>
                        {staff.isFetchingCreateUser && (
                            <CircularProgress
                                size={24}
                                sx={{
                                    color: appColor,
                                    position: 'absolute',
                                    top: '35%',
                                    left: '50%',
                                    marginTop: '-12px',
                                    marginLeft: '-12px',
                                }}
                            />
                        )}
                    </Box>
                    <Button type="button" fullWidth variant="outlined" onClick={() => setOpen(false)} sx={{ mb: 2 }}>
                        {t('settings.close')}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
})

export default UpdateUserPermissions
