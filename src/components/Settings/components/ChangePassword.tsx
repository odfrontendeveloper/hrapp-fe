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
import { observer } from 'mobx-react'
import { IChangePassword, updatePassword } from 'api/settings'
import { appColor } from 'stylesConfig'
import CustomControlledInput from 'CustomComponents/CustomControlledInput'

const validateSchema = yup.object().shape({
    oldpassword: yup.string().required('required'),
    newpassword: yup.string().required('required'),
})

const ChangePassword = observer(({ onClose }: { onClose: () => void }) => {
    const { t } = useTranslation()
    const { settings } = useStores()

    const resolver = useYupValidationResolver(validateSchema)

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IChangePassword>({
        resolver,
    })

    const onSubmit = (data: IChangePassword) => {
        updatePassword(data)
    }

    return (
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <CustomControlledInput
                        required
                        fullWidth
                        name="oldpassword"
                        type="password"
                        label={t('settings.password.old')}
                        errors={!!errors.oldpassword}
                        control={control}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CustomControlledInput
                        required
                        fullWidth
                        name="newpassword"
                        type="password"
                        label={t('settings.password.new')}
                        errors={!!errors.newpassword}
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

export default ChangePassword
