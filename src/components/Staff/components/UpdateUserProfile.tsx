import * as React from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import OutlinedInput from '@mui/material/OutlinedInput'
import CircularProgress from '@mui/material/CircularProgress'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import ListItemText from '@mui/material/ListItemText'
import Box from '@mui/material/Box'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { useYupValidationResolver } from 'tools/validate'
import { useStores } from 'store'
import { appColor } from 'stylesConfig'
import CustomControlledInput from 'CustomComponents/CustomControlledInput'
import { editUserByAdmin } from 'api/staff'

export const validateSchema = yup.object().shape({
    firstname: yup.string().required('required'),
    middlename: yup.string().required('required'),
    lastname: yup.string().required('required'),
    email: yup.string().email('incorrectemail').required('required'),
    isActive: yup.number().required('required'),
})

const textOptions = ['common.active.no', 'common.active.yes']

interface IUpdateUserProfile {
    setOpen: (type: boolean) => any
}

interface FormDataFields {
    firstname: string
    middlename: string
    lastname: string
    email: string
    isActive: 1 | 0
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

const UpdateUserProfile = observer(({ setOpen }: IUpdateUserProfile): JSX.Element => {
    const { t } = useTranslation()
    const { me, staff } = useStores()

    const resolver = useYupValidationResolver(validateSchema)

    const { control, handleSubmit, formState } = useForm<FormDataFields>({
        resolver,
    })

    const { errors } = formState

    const onSubmit = (data: FormDataFields) => {
        if (staff.editUserModal.userId) {
            editUserByAdmin({
                userId: staff.editUserModal.userId,
                ...data,
            })
        }
    }

    const selectedUserInfo = staff.users.find((user) => user.id === staff.editUserModal.userId)

    if (!selectedUserInfo) return <></>

    const { firstname, middlename, lastname, email, isActive } = selectedUserInfo

    return (
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <CustomControlledInput
                        required
                        fullWidth
                        name="firstname"
                        label={t('login.signUp.form.fields.firstname')}
                        errors={!!errors.firstname}
                        control={control}
                        defaultValue={firstname}
                    />
                </Grid>
                <Grid item xs={6}>
                    <CustomControlledInput
                        required
                        fullWidth
                        name="middlename"
                        label={t('login.signUp.form.fields.middlename')}
                        errors={!!errors.middlename}
                        control={control}
                        defaultValue={middlename}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CustomControlledInput
                        required
                        fullWidth
                        name="lastname"
                        label={t('login.signUp.form.fields.lastname')}
                        errors={!!errors.lastname}
                        control={control}
                        defaultValue={lastname}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CustomControlledInput
                        required
                        fullWidth
                        name="email"
                        label={t('login.signUp.form.fields.email')}
                        errors={!!errors.email}
                        control={control}
                        defaultValue={email}
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputLabel id="choose-active-label">{t('common.active.title')}*</InputLabel>
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
                                renderValue={() => t(textOptions[value])}
                                MenuProps={MenuProps}
                                className="w100"
                            >
                                <MenuItem value={1}>
                                    <ListItemText primary={t(textOptions[1])} />
                                </MenuItem>
                                <MenuItem value={0}>
                                    <ListItemText primary={t(textOptions[0])} />
                                </MenuItem>
                            </Select>
                        )}
                        name="isActive"
                        control={control}
                        defaultValue={isActive}
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

export default UpdateUserProfile
