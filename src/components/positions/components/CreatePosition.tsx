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

interface ICreatePosition {
    setOpen: () => any
    onSubmit: (data: any) => void
    isFetching: boolean
    mode: string
}

const CreatePosition = observer(({ setOpen, onSubmit, isFetching, mode }: ICreatePosition): JSX.Element => {
    const { t } = useTranslation()
    const { positions } = useStores()

    const resolver = useYupValidationResolver(validateSchema)

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<{ name: string }>({
        resolver,
    })

    const defaultName = () => {
        if (positions.editPositionModal.id) {
            const findPosition = positions.positions.find((item) => item.id === positions.editPositionModal.id)
            if (findPosition) return findPosition.name
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
                        label={t('common.positionname')}
                        errors={!!errors.name}
                        control={control}
                        defaultValue={defaultName()}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ position: 'relative' }}>
                        <Button type="submit" fullWidth variant="contained" sx={{ mb: 2 }} disabled={isFetching}>
                            {t(`common.${mode}`)}
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
                        {t('settings.close')}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
})

export default CreatePosition
