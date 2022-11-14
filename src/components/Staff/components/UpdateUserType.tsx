import * as React from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import OutlinedInput from '@mui/material/OutlinedInput'
import CircularProgress from '@mui/material/CircularProgress'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import Box from '@mui/material/Box'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { useYupValidationResolver } from 'tools/validate'
import { useStores } from 'store'
import { appColor } from 'stylesConfig'
import { editUserTypeByAdmin } from 'api/staff'
import { Roles } from 'store/me'

export const validateSchema = yup.object().shape({
    type: yup.string().required('required'),
})

interface IUpdateUserType {
    setOpen: (type: boolean) => any
}

interface FormDataFields {
    type: Roles
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

const UpdateUserType = observer(({ setOpen }: IUpdateUserType): JSX.Element => {
    const { t } = useTranslation()
    const { me, staff } = useStores()

    const resolver = useYupValidationResolver(validateSchema)

    const { control, handleSubmit, formState } = useForm<FormDataFields>({
        resolver,
    })

    const { errors } = formState

    const onSubmit = (data: FormDataFields) => {
        if (staff.editUserModal.userId) {
            editUserTypeByAdmin({
                ...data,
                userId: staff.editUserModal.userId,
            })
        }
    }

    const selectedUserInfo = staff.users.find((user) => user.id === staff.editUserModal.userId)

    if (!selectedUserInfo) return <></>

    const { type } = selectedUserInfo

    return (
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Controller
                        render={({ field: { onChange, value } }) => (
                            <Select
                                labelId="choose-active-label"
                                id="demo-simple-select-disabled"
                                value={value}
                                onChange={(e, data: any) => {
                                    onChange(data.props.value)
                                }}
                                input={<OutlinedInput size="small" />}
                                renderValue={() => t(`common.roles.${Roles[value]}`)}
                                MenuProps={MenuProps}
                                className="w100"
                            >
                                <MenuItem value={Roles.admin}>
                                    <ListItemText primary={t('common.roles.admin')} />
                                </MenuItem>
                                <MenuItem value={Roles.staff}>
                                    <ListItemText primary={t('common.roles.staff')} />
                                </MenuItem>
                            </Select>
                        )}
                        name="type"
                        control={control}
                        defaultValue={type}
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

export default UpdateUserType
