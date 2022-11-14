import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import { useYupValidationResolver } from 'tools/validate'
import { useStores } from 'store'
import { IChangeProfileForm, updateProfile } from 'api/settings'
import { observer } from 'mobx-react'
import { appColor } from 'stylesConfig'
import CustomControlledInput from 'CustomComponents/CustomControlledInput'
import { Roles } from 'store/me'

export const validateSchema = yup.object().shape({
    firstname: yup.string().required('required'),
    middlename: yup.string().required('required'),
    lastname: yup.string().required('required'),
    organizationName: yup.string().required('required'),
    email: yup.string().email().required('required'),
})

const ChangeProfile = observer(({ onClose }: { onClose: () => void }) => {
    const { t } = useTranslation()
    const { me, settings } = useStores()

    const resolver = useYupValidationResolver(validateSchema)

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IChangeProfileForm>({
        resolver,
    })

    const onSubmit = (data: IChangeProfileForm) => {
        updateProfile(data)
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
                        defaultValue={me.me?.firstname || ''}
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
                        defaultValue={me.me?.middlename || ''}
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
                        defaultValue={me.me?.lastname || ''}
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
                        defaultValue={me.me?.organizationName || ''}
                        disabled={me.me?.type !== Roles.owner}
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
                        defaultValue={me.me?.email || ''}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ position: 'relative' }}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mb: 2 }}
                            disabled={settings.isFetching}
                        >
                            {t('settings.save')}
                        </Button>
                        {settings.isFetching && (
                            <CircularProgress
                                size={24}
                                sx={{
                                    color: appColor,
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: '-20px',
                                    marginLeft: '-12px',
                                }}
                            />
                        )}
                    </Box>
                    <Box>
                        <Button type="button" fullWidth variant="outlined" sx={{ mb: 2 }} onClick={onClose}>
                            {t('settings.close')}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
})

export default ChangeProfile
