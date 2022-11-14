import * as React from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { useYupValidationResolver } from 'tools/validate'
import { useStores } from 'store'
import { appColor } from 'stylesConfig'
import CustomControlledInput from 'CustomComponents/CustomControlledInput'
import { ICreateUser, createUserByAdmin } from 'api/staff'

export const validateSchema = yup.object().shape({
    firstname: yup.string().required('required'),
    middlename: yup.string().required('required'),
    lastname: yup.string().required('required'),
    email: yup.string().email('incorrectemail').required('required'),
    password: yup.string().required('required'),
})

interface ICreateUserForm {
    setOpen: (type: boolean) => any
    search: string
}

const CreateUser = observer(({ setOpen, search }: ICreateUserForm): JSX.Element => {
    const { t } = useTranslation()
    const { me, staff } = useStores()

    const resolver = useYupValidationResolver(validateSchema)

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ICreateUser>({
        resolver,
    })

    const onSubmit = (data: ICreateUser) => {
        createUserByAdmin(data, search)
    }

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
                    />
                </Grid>
                <Grid item xs={12}>
                    <CustomControlledInput
                        required
                        fullWidth
                        name="password"
                        type="password"
                        label={t('login.signUp.form.fields.password')}
                        errors={!!errors.password}
                        control={control}
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
                            {t('common.create')}
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

export default CreateUser
