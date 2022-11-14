import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import {
    Box,
    Button,
    CircularProgress,
    Grid,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import { sessions, useStores } from 'store'
import { Session } from 'store/sessions'
import { deleteSession, editSession, getSessions } from 'api/sessions'
import CustomModal from 'CustomComponents/CustomModal'
import CustomControlledInput from 'CustomComponents/CustomControlledInput'
import { useYupValidationResolver } from 'tools/validate'
import { appColor } from 'stylesConfig'

const validateSchema = yup.object().shape({
    name: yup.string().required('required'),
    isActive: yup.mixed().oneOf([0, 1]),
})

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

const textOptions = ['common.active.no', 'common.active.yes']

const EditSession = observer(({ session }: { session: Session | undefined }) => {
    const { t } = useTranslation()

    const resolver = useYupValidationResolver(validateSchema)

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<{ name: string; isActive: 1 | 0 }>({
        resolver,
    })

    if (!session) return null

    const onSubmit = (data: { name: string; isActive: 1 | 0 }) => {
        editSession(data)
    }

    return (
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <CustomControlledInput
                        required
                        fullWidth
                        name="name"
                        label={t('sessions.table.name')}
                        errors={!!errors.name}
                        control={control}
                        defaultValue={session.name}
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputLabel id="choose-active-label">{t('sessions.table.isActive')}*</InputLabel>
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
                                renderValue={() => t(textOptions[+value])}
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
                        defaultValue={session.isActive}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ position: 'relative' }}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mb: 2 }}
                            disabled={sessions.isEditFetcing}
                        >
                            {t('common.save')}
                        </Button>
                        {sessions.isEditFetcing && (
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
                    <Button
                        type="button"
                        fullWidth
                        variant="outlined"
                        onClick={() => sessions.setEditModal(null)}
                        sx={{ mb: 2 }}
                    >
                        {t('settings.close')}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
})

const Sessions = observer((): JSX.Element => {
    const { t } = useTranslation()

    const { sessions } = useStores()

    const { sessionsSearchString } = sessions

    useEffect(() => {
        getSessions(sessionsSearchString, 1)
    }, [sessionsSearchString])

    return (
        <Box>
            <TableContainer component={Paper}>
                <Table className="minWidth650" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" className="w100">
                                {t('sessions.table.name')}
                            </TableCell>
                            <TableCell align="center" style={{ whiteSpace: 'nowrap' }}>
                                {t('sessions.table.isActive')}
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sessions.sessions.map((session) => (
                            <TableRow key={session.id}>
                                <TableCell align="left" scope="row">
                                    {session.name}
                                </TableCell>
                                <TableCell>
                                    {session.isActive ? t('common.active.yes') : t('common.active.no')}
                                </TableCell>
                                <TableCell>
                                    <Link to={`/home/sessions/${session.id}`} style={{ textDecoration: 'none' }}>
                                        <Button
                                            type="button"
                                            variant="contained"
                                            size="medium"
                                            sx={{ whiteSpace: 'nowrap' }}
                                        >
                                            {t('common.select')}
                                        </Button>
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        size="medium"
                                        sx={{ whiteSpace: 'nowrap' }}
                                        onClick={() => {
                                            sessions.setEditModal(session.id)
                                        }}
                                    >
                                        {t('common.edit')}
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        size="medium"
                                        sx={{ whiteSpace: 'nowrap' }}
                                        onClick={() => {
                                            sessions.setDeleteModal(session.id)
                                        }}
                                    >
                                        {t('common.delete')}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CustomModal
                open={!!sessions.editModal}
                onClose={() => {
                    sessions.setEditModal(null)
                }}
            >
                <Typography variant="h6" sx={{ pb: 1 }}>
                    {t('sessions.editSession.title')}
                </Typography>
                <EditSession session={sessions.sessions.find((item) => item.id === sessions.editModal)} />
            </CustomModal>
            <CustomModal
                open={!!sessions.deleteModal}
                onClose={() => {
                    sessions.setDeleteModal(null)
                }}
            >
                <Typography variant="h6" sx={{ pb: 1 }}>
                    {t('sessions.deleteSession')}
                </Typography>
                <Grid item xs={12}>
                    <Box sx={{ position: 'relative' }}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mb: 2 }}
                            disabled={sessions.isFetchingDelete}
                            onClick={deleteSession}
                        >
                            {t('common.delete')}
                        </Button>
                        {sessions.isFetchingDelete && (
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
                    <Button
                        type="button"
                        fullWidth
                        variant="outlined"
                        onClick={() => sessions.setDeleteModal(null)}
                        sx={{ mb: 2 }}
                    >
                        {t('settings.close')}
                    </Button>
                </Grid>
            </CustomModal>
        </Box>
    )
})

export default Sessions
