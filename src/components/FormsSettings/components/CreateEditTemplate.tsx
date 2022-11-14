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

export const validateSchema = yup.object().shape({
    name: yup.string().required('required'),
})

interface ICreateModal {
    setOpen: () => any
    onSubmit: (data: any) => void
    isFetching: boolean
    mode: string
}

const CreateEditTemplate = observer(({ setOpen, onSubmit, isFetching, mode }: ICreateModal): JSX.Element => {
    const { t } = useTranslation()
    const { forms } = useStores()

    const resolver = useYupValidationResolver(validateSchema)

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<{ name: string }>({
        resolver,
    })

    const defaultName = () => {
        if (forms.editTemplateModal.isOpen) {
            const findTemplate = forms.templates.find((item) => item.id === forms.editTemplateModal.id)
            if (findTemplate) return findTemplate.name
            return ''
        }
        return ''
    }

    return (
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <CustomControlledInput
                        required
                        fullWidth
                        name="name"
                        label={t('forms.forms.form')}
                        errors={!!errors.name}
                        control={control}
                        defaultValue={defaultName()}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ position: 'relative' }}>
                        <Button type="submit" fullWidth variant="contained" sx={{ mb: 2 }} disabled={isFetching}>
                            {mode === 'create' ? t(`common.create`) : t(`common.save`)}
                        </Button>
                        {isFetching && (
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
                    <Button type="button" fullWidth variant="outlined" onClick={() => setOpen()} sx={{ mb: 2 }}>
                        {t('common.close')}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
})

export default CreateEditTemplate
