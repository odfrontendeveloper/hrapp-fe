import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { Box } from '@mui/system'
import Paper from '@mui/material/Paper'
import { forms, useStores } from 'store'
import LoadingPage from 'CustomComponents/LoadingPage'
import {
    createTemplate,
    deleteTemplate,
    editTemplate,
    editTemplateConnection,
    getPositionCompetencies,
    getPositionsForForms,
    getTemplates,
} from 'api/forms'
import {
    Button,
    CircularProgress,
    Grid,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import { useTranslation } from 'react-i18next'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Navigate, useParams, Link } from 'react-router-dom'
import CustomModal from 'CustomComponents/CustomModal'
import CreateEditTemplate from './components/CreateEditTemplate'
import './styles.scss'
import { appColor } from 'stylesConfig'
import { FormCompetence } from 'store/forms'

const FormsSettings = observer((): JSX.Element => {
    const { competencies } = useStores()

    const { t } = useTranslation()

    const params = useParams()

    const positionId = params.positionId ? +params.positionId : null

    const { selectedPosition, isFetchingEditConnection } = forms

    useEffect(() => {
        if (positionId) {
            forms.setSelectedPosition(positionId)
        }
    }, [positionId])

    useEffect(() => {
        if (selectedPosition) {
            getPositionCompetencies(selectedPosition)
            getTemplates(selectedPosition)
        }
    }, [selectedPosition])

    const onCreate = (data: { name: string }): void => {
        if (selectedPosition) {
            createTemplate(selectedPosition, data)
        }
    }

    const onEdit = (data: { name: string }): void => {
        if (selectedPosition && forms.editTemplateModal.id) {
            editTemplate(selectedPosition, forms.editTemplateModal.id, data)
        }
    }

    const onEditConnection = (template: number, competence: number): void => {
        if (selectedPosition) {
            editTemplateConnection(template, competence, selectedPosition)
        }
    }

    if (competencies.isFetching || forms.isFetchingTemplates) {
        return <LoadingPage />
    }

    return (
        <Box>
            <table className="formsSettingsTable" cellSpacing={0}>
                <tbody>
                    <tr>
                        <td></td>
                        {forms.templates.map((item) => (
                            <td key={item.id}>
                                {item.name}
                                <IconButton
                                    edge="end"
                                    aria-label="edit"
                                    sx={{ ml: 1 }}
                                    onClick={() => forms.openEditTemplateModal(item.id)}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    sx={{ ml: 1 }}
                                    onClick={() => forms.openDeleteTemplateModal(item.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </td>
                        ))}
                    </tr>
                    {competencies.positionWithCompetencies?.competencies.map((item) => {
                        const connectionsList: number[] = forms.connections
                            .filter((el) => el.competence.id === item.id)
                            .map((item) => item.formTemplate.id)
                        return (
                            <tr key={item.id}>
                                <td className="competenceNameTd">
                                    <Link to={`/home/forms/${selectedPosition}/competence/${item.id}`}>
                                        <Button type="button">{item.name}</Button>
                                    </Link>
                                </td>
                                {forms.templates.map((el, i) => (
                                    <td key={el.id}>
                                        {isFetchingEditConnection.isFetching &&
                                        isFetchingEditConnection.template === el.id &&
                                        isFetchingEditConnection.competence === item.id ? (
                                            <CircularProgress size="30px" />
                                        ) : (
                                            <Checkbox
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                                checked={connectionsList.includes(el.id)}
                                                onChange={() => onEditConnection(el.id, item.id)}
                                            />
                                        )}
                                    </td>
                                ))}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <CustomModal open={forms.isOpenCreateTemplate} onClose={() => forms.setIsOpenCreateTemplate(false)}>
                <Typography variant="h6">{t('forms.forms.createForm')}</Typography>
                <CreateEditTemplate
                    isFetching={forms.isFetchingCreateTemplate}
                    mode={'create'}
                    onSubmit={onCreate}
                    setOpen={() => forms.setIsOpenCreateTemplate(false)}
                />
            </CustomModal>
            <CustomModal open={forms.editTemplateModal.isOpen} onClose={() => forms.closeEditModal()}>
                <Typography variant="h6">{t('forms.forms.editForm')}</Typography>
                <CreateEditTemplate
                    isFetching={forms.isFetchingCreateTemplate}
                    mode={'edit'}
                    onSubmit={onEdit}
                    setOpen={() => forms.closeEditModal()}
                />
            </CustomModal>
            <CustomModal open={forms.deleteTemplateModal.isOpen} onClose={() => forms.closeDeleteModal()}>
                <Typography variant="h6" sx={{ pb: 1 }}>
                    {t('forms.forms.deleteForm')}
                </Typography>
                <Grid item xs={12}>
                    <Box sx={{ position: 'relative' }}>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mb: 2 }}
                            disabled={forms.isFetchingCreateTemplate}
                            onClick={() => forms.deleteTemplateModal.id && deleteTemplate(forms.deleteTemplateModal.id)}
                        >
                            {t(`common.delete`)}
                        </Button>
                        {forms.isFetchingCreateTemplate && (
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
                        onClick={() => forms.closeDeleteModal()}
                        sx={{ mb: 2 }}
                    >
                        {t('common.close')}
                    </Button>
                </Grid>
            </CustomModal>
        </Box>
    )
})

export default FormsSettings
