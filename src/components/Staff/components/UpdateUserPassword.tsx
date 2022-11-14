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
import { editUserPasswordByAdmin } from 'api/staff'

export const validateSchema = yup.object().shape({
    password: yup.string().required('required'),
})

interface IUpdateUserPassword {
    setOpen: (type: boolean) => any
}

interface FormDataFields {
    password: string
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

const UpdateUserPassword = observer(({ setOpen }: IUpdateUserPassword): JSX.Element => {
    const { t } = useTranslation()
    const { me, staff } = useStores()

    const resolver = useYupValidationResolver(validateSchema)

    const { control, handleSubmit, formState } = useForm<FormDataFields>({
        resolver,
    })

    const { errors } = formState

    const onSubmit = (data: FormDataFields) => {
        if (staff.editUserModal.userId) {
            editUserPasswordByAdmin({
                userId: staff.editUserModal.userId,
                ...data,
            })
        }
    }

    return (
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <CustomControlledInput
                        required
                        fullWidth
                        name="password"
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

export default UpdateUserPassword
