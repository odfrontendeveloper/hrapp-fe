import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system'
import { observer } from 'mobx-react'
import { Link, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SettingsIcon from '@mui/icons-material/Settings'
import Divider from '@mui/material/Divider'
import { CircularProgress, Grid, IconButton, Typography } from '@mui/material'
import { forms, useStores } from 'store'
import {
    createPositionCompetence,
    deletePositionCompetence,
    deleteSign,
    editPositionCompetence,
    getPositionCompetencies,
} from 'api/forms'
import { appColor } from 'stylesConfig'
import { useTranslation } from 'react-i18next'
import CustomModal from 'CustomComponents/CustomModal'
import CreateEditCompetence from './components/CreateEditCompetence'
import LoadingPage from 'CustomComponents/LoadingPage'
import SignsList from './components/SignsList'
import './styles.scss'

const Competencies = observer((): JSX.Element => {
    const { competencies } = useStores()

    const params = useParams()

    const navigate = useNavigate()

    const { t } = useTranslation()

    const [currentCompetence, setCurrentCompetence] = useState<number | null>(null)

    const positionId = params.positionId ? +params.positionId : null

    const { selectedPosition } = forms

    const { positionWithCompetencies } = competencies

    useEffect(() => {
        if (positionId) {
            forms.setSelectedPosition(positionId)
        }
    }, [positionId])

    useEffect(() => {
        if (selectedPosition) {
            getPositionCompetencies(selectedPosition)
        }
    }, [selectedPosition])

    const isModalOpen = (mode: 'create' | 'edit' | 'delete'): boolean => {
        return competencies.competenceModal.isOpen && competencies.competenceModal.mode === mode
    }

    const onSubmitCreate = (data: { name: string }) => {
        createPositionCompetence(data.name)
    }

    const onSubmitEdit = (data: { name: string }) => {
        if (competencies.competenceModal.competenceId) {
            editPositionCompetence(data.name, competencies.competenceModal.competenceId)
        }
    }

    const onSubmitDelete = () => {
        if (competencies.competenceModal.competenceId) {
            if (competencies.competenceModal.competenceId === currentCompetence) {
                navigate(`/home/forms/${positionId}`)
            }
            deletePositionCompetence(competencies.competenceModal.competenceId)
        }
    }

    const closeModal = () => competencies.closeModal()

    return (
        <>
            <Typography variant="h6">
                {t('forms.position')}
                {positionWithCompetencies?.name}
            </Typography>
            <Box className="competencies">
                <Box className="competenciesColumn">
                    <Typography variant="h6" sx={{ p: 1 }}>
                        {t('forms.competencies')}:&nbsp;
                    </Typography>
                    <Divider />
                    <List component="nav" aria-label="secondary mailbox folder" className="list-of-competencies">
                        {competencies.isFetching && <LoadingPage />}
                        {!competencies.isFetching &&
                            positionWithCompetencies?.competencies.map((item, i) => (
                                <List dense={true} key={item.id}>
                                    <ListItem
                                        className={
                                            currentCompetence === item.id ? 'selectedCompetence' : 'competenceItem'
                                        }
                                    >
                                        <ListItemText
                                            primary={item.name}
                                            sx={
                                                currentCompetence === item.id
                                                    ? { color: appColor, fontWeight: 'bold' }
                                                    : {}
                                            }
                                        />
                                        <Link to={`/home/forms/${positionId}/competence/${item.id}`}>
                                            <IconButton
                                                edge="end"
                                                aria-label="settings"
                                                sx={
                                                    currentCompetence === item.id
                                                        ? { color: appColor, marginRight: '1px' }
                                                        : { marginRight: '1px' }
                                                }
                                            >
                                                <SettingsIcon />
                                            </IconButton>
                                        </Link>
                                        <IconButton
                                            edge="end"
                                            aria-label="edit"
                                            sx={{ marginRight: '1px' }}
                                            onClick={() => {
                                                competencies.openModal('edit', item.id)
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() => {
                                                competencies.openModal('delete', item.id)
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItem>
                                </List>
                            ))}
                    </List>
                </Box>
                <Box className="signColumn">
                    <Routes>
                        <Route
                            path="/competence/:competenceId"
                            element={
                                <SignsList
                                    currentCompetence={currentCompetence}
                                    setCurrentCompetence={setCurrentCompetence}
                                />
                            }
                        />
                    </Routes>
                </Box>
            </Box>
            <CustomModal open={isModalOpen('create')} onClose={closeModal}>
                <Typography variant="h6">{t('forms.formTitle.create')}</Typography>
                <CreateEditCompetence
                    isFetching={competencies.isFetchingModal}
                    mode={competencies.competenceModal.mode}
                    onSubmit={onSubmitCreate}
                    setOpen={closeModal}
                />
            </CustomModal>
            <CustomModal open={isModalOpen('edit')} onClose={closeModal}>
                <Typography variant="h6">{t('forms.formTitle.edit')}</Typography>
                <CreateEditCompetence
                    isFetching={competencies.isFetchingModal}
                    mode={competencies.competenceModal.mode}
                    onSubmit={onSubmitEdit}
                    setOpen={closeModal}
                />
            </CustomModal>
            <CustomModal open={isModalOpen('delete')} onClose={closeModal}>
                <Typography variant="h6" sx={{ pb: 1 }}>
                    {t('forms.formTitle.delete')}
                </Typography>
                <Grid item xs={12}>
                    <Box sx={{ position: 'relative' }}>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mb: 2 }}
                            disabled={competencies.isFetching}
                            onClick={onSubmitDelete}
                        >
                            {t(`common.delete`)}
                        </Button>
                        {competencies.isFetching && (
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
                    <Button type="button" fullWidth variant="outlined" onClick={closeModal} sx={{ mb: 2 }}>
                        {t('common.close')}
                    </Button>
                </Grid>
            </CustomModal>
            <CustomModal open={competencies.deleteSignModal.isOpen} onClose={() => competencies.closeDeleteSignModal()}>
                <Typography variant="h6" sx={{ pb: 1 }}>
                    {t('forms.sign.delete')}
                </Typography>
                <Grid item xs={12}>
                    <Box sx={{ position: 'relative' }}>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mb: 2 }}
                            disabled={competencies.isFetchingCreateEditDeleteSign}
                            onClick={() => {
                                if (competencies.deleteSignModal.signId) {
                                    deleteSign(competencies.deleteSignModal.signId)
                                }
                            }}
                        >
                            {t(`common.delete`)}
                        </Button>
                        {competencies.isFetchingCreateEditDeleteSign && (
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
                        onClick={() => competencies.closeDeleteSignModal()}
                        sx={{ mb: 2 }}
                    >
                        {t('common.close')}
                    </Button>
                </Grid>
            </CustomModal>
        </>
    )
})

export default Competencies
