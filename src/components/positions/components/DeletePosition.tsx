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

export const validateSchema = yup.object().shape({})

interface IDeletePosition {
    setOpen: () => any
    onSubmit: (data: any) => void
    isFetching: boolean
}

const DeletePosition = observer(({ setOpen, onSubmit, isFetching }: IDeletePosition): JSX.Element => {
    const { t } = useTranslation()
    const { positions } = useStores()

    const resolver = useYupValidationResolver(validateSchema)

    const { handleSubmit } = useForm<{ name: string }>({
        resolver,
    })

    return (
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box sx={{ position: 'relative' }}>
                        <Button
                            type="submit"
                            fullWidth
                            color="error"
                            variant="contained"
                            sx={{ mb: 2 }}
                            disabled={isFetching}
                        >
                            {t(`common.delete`)}
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

export default DeletePosition
