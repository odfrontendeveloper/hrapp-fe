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
import { SignUpFormData, signUp } from 'api/login'
import { useStores } from 'store'
import { appColor } from 'stylesConfig'
import CustomControlledInput from 'CustomComponents/CustomControlledInput'

export const validateSchema = yup.object().shape({
    firstname: yup.string().required('required'),
    middlename: yup.string().required('required'),
    lastname: yup.string().required('required'),
    organizationName: yup.string().required('required'),
    email: yup.string().email('incorrectemail').required('required'),
    password: yup.string().required('required'),
})

interface ISignUp {
    setSignIn: (type: boolean) => any
}

const SignUp = observer(({ setSignIn }: ISignUp): JSX.Element => {
    const { t } = useTranslation()
    const { me } = useStores()

    const resolver = useYupValidationResolver(validateSchema)

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormData>({
        resolver,
    })

    const onSubmit = (data: SignUpFormData) => {
        signUp(data)
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
                        name="organizationName"
                        label={t('login.signUp.form.fields.organization')}
                        errors={!!errors.organizationName}
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
            </Grid>
            <Box sx={{ position: 'relative' }}>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={me.loadingAuth}>
                    {t('login.signUp.form.submit')}
                </Button>
                {me.loadingAuth && (
                    <CircularProgress
                        size={24}
                        sx={{
                            color: appColor,
                            position: 'absolute',
                            top: '54%',
                            left: '50%',
                            marginTop: '-12px',
                            marginLeft: '-12px',
                        }}
                    />
                )}
            </Box>
            <Button type="button" fullWidth variant="text" sx={{ mt: 3, mb: 2 }} onClick={() => setSignIn(true)}>
                {t('login.signIn.form.title')}
            </Button>
        </Box>
    )
})

export default SignUp
