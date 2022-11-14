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
import { signIn } from 'api/login'
import { useStores } from 'store'
import { appColor } from 'stylesConfig'
import CustomControlledInput from 'CustomComponents/CustomControlledInput'

export const validateSchema = yup.object().shape({
    email: yup.string().email('incorrectemail').required('required'),
    password: yup.string().required('required'),
})

interface ISignIn {
    setSignIn: (type: boolean) => any
}

const SignIn = observer(({ setSignIn }: ISignIn): JSX.Element => {
    const { t } = useTranslation()
    const { me } = useStores()

    const resolver = useYupValidationResolver(validateSchema)

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<{
        email: string
        password: string
    }>({
        resolver,
    })

    const onSubmit = (data: { email: string; password: string }) => {
        signIn(data)
    }

    return (
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <CustomControlledInput
                        required
                        fullWidth
                        name="email"
                        label={t('login.signIn.form.fields.email')}
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
                        label={t('login.signIn.form.fields.password')}
                        errors={!!errors.password}
                        control={control}
                    />
                </Grid>
            </Grid>
            <Box sx={{ position: 'relative' }}>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={me.loadingAuth}>
                    {t('login.signIn.form.submit')}
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
            <Button
                type="button"
                fullWidth
                variant="text"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => setSignIn(false)}
                disabled={me.loadingAuth}
            >
                {t('login.signUp.form.title')}
            </Button>
        </Box>
    )
})

export default SignIn
