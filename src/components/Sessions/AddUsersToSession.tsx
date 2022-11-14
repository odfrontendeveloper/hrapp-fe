import {
    Box,
    Button,
    CircularProgress,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material'
import { fetchFormsToSelect, fetchUsersToSelect } from 'api/sessions'
import CustomModal from 'CustomComponents/CustomModal'
import { observer } from 'mobx-react-lite'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import shortid from 'shortid'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { sessions } from 'store'
import { appColor } from 'stylesConfig'
import './styles.scss'
import { IAssessmentItem } from './CreateSession'

const AddUsersToSession = observer(
    ({
        // name,
        // setName,
        assessmentConnections,
        setassessmentConnections,
    }: {
        name: string
        setName: React.Dispatch<React.SetStateAction<string>>
        assessmentConnections: IAssessmentItem[]
        setassessmentConnections: React.Dispatch<React.SetStateAction<IAssessmentItem[]>>
    }): JSX.Element => {
        const { t } = useTranslation()

        const [modal, setModal] = useState<string | null>(null)
        const [modalPosition, setModalPosition] = useState<string | null>(null)

        const { searchString, sessionUsersPaginate } = sessions

        useEffect(() => {
            if (!modal) {
                sessions.setSearchString('')
            }
        }, [modal])

        useEffect(() => {
            fetchUsersToSelect(searchString, 1)
        }, [searchString])

        return (
            <Box>
                <Button
                    onClick={() => {
                        setassessmentConnections([
                            ...assessmentConnections,
                            {
                                id: shortid.generate(),
                                userFrom: {
                                    id: shortid.generate(),
                                    data: null,
                                },
                                userTo: {
                                    id: shortid.generate(),
                                    data: null,
                                },
                                form: null,
                            },
                        ])
                    }}
                >
                    {t('common.add')}
                </Button>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: '35%' }} align="center">
                                {t('sessions.steps.step2.table.appraiser')}
                            </TableCell>
                            <TableCell style={{ width: '35%' }} align="center">
                                {t('sessions.steps.step2.table.assessedEmployee')}
                            </TableCell>
                            <TableCell style={{ width: '20%' }} align="center">
                                {t('sessions.steps.step2.table.evaluationForm')}
                            </TableCell>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {assessmentConnections.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell align="center">
                                    <Button onClick={() => setModal(item.userFrom.id)}>
                                        {item.userFrom.data ? (
                                            <div>
                                                {[
                                                    item.userFrom.data.firstname,
                                                    item.userFrom.data.middlename,
                                                    item.userFrom.data.lastname,
                                                ].join(' ')}
                                            </div>
                                        ) : (
                                            t('common.select')
                                        )}
                                    </Button>
                                </TableCell>
                                <TableCell align="center">
                                    <Button onClick={() => setModal(item.userTo.id)}>
                                        {item.userTo.data ? (
                                            <div>
                                                {[
                                                    item.userTo.data.firstname,
                                                    item.userTo.data.middlename,
                                                    item.userTo.data.lastname,
                                                ].join(' ')}
                                            </div>
                                        ) : (
                                            t('common.select')
                                        )}
                                    </Button>
                                </TableCell>
                                <TableCell align="center">
                                    <Button
                                        onClick={() => {
                                            if (item.userTo.data) {
                                                setModalPosition(item.id)
                                                fetchFormsToSelect(+item.userTo.data.userPosition.id)
                                            }
                                        }}
                                    >
                                        {item.userTo.data ? (!!item.form ? item.form.name : t('common.select')) : '-'}
                                    </Button>
                                </TableCell>
                                <TableCell align="center">
                                    {!!item.userFrom.data && !!item.userTo.data && !!item.form ? (
                                        <CheckIcon color="success" />
                                    ) : (
                                        <CloseIcon color="error" />
                                    )}
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => {
                                            setassessmentConnections(
                                                assessmentConnections.filter((el) => el.id !== item.id)
                                            )
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <CustomModal open={!!modalPosition} onClose={() => setModalPosition(null)}>
                    {sessions.isFetchingForms ? (
                        <CircularProgress
                            size={24}
                            sx={{
                                color: appColor,
                            }}
                        />
                    ) : (
                        <List style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            {sessions.forms.map((item) => (
                                <ListItem disablePadding key={item.id}>
                                    <ListItemButton
                                        onClick={() => {
                                            setassessmentConnections(
                                                assessmentConnections.map((el) => {
                                                    const newItem = { ...el }
                                                    if (el.id === modalPosition) {
                                                        newItem.form = { ...item }
                                                    }
                                                    return newItem
                                                })
                                            )
                                            setModalPosition(null)
                                        }}
                                    >
                                        <ListItemText>{item.name}</ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    )}
                    <Button
                        type="button"
                        fullWidth
                        variant="outlined"
                        onClick={() => setModalPosition(null)}
                        sx={{ mb: 2 }}
                    >
                        {t('common.close')}
                    </Button>
                </CustomModal>
                <CustomModal open={!!modal} onClose={() => setModal(null)}>
                    <Typography variant="h6" component="h2">
                        {t('staff.createUser')}
                    </Typography>
                    <TextField
                        size="small"
                        value={searchString}
                        onChange={(e) => sessions.setSearchString(e.target.value)}
                        placeholder={t('common.search.default')}
                    />
                    {sessions.isFetchingUsers ? (
                        <CircularProgress
                            size={24}
                            sx={{
                                color: appColor,
                            }}
                        />
                    ) : (
                        <List style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            {sessions.users.map((item) => (
                                <ListItem disablePadding key={item.id}>
                                    <ListItemButton
                                        onClick={() => {
                                            setassessmentConnections(
                                                assessmentConnections.map((el) => {
                                                    const newItem = { ...el }
                                                    if (newItem.userFrom.id === modal) {
                                                        newItem.userFrom.data = { ...item }
                                                        newItem.userFrom.data.userPosition = {
                                                            ...newItem.userFrom.data.userPosition,
                                                        }
                                                    }
                                                    if (newItem.userTo.id === modal) {
                                                        newItem.userTo.data = { ...item }
                                                        newItem.userTo.data.userPosition = {
                                                            ...newItem.userTo.data.userPosition,
                                                        }
                                                        newItem.form = null
                                                    }
                                                    return newItem
                                                })
                                            )
                                            setModal(null)
                                        }}
                                    >
                                        <ListItemText>
                                            {item.firstname + ' ' + item.middlename + ' ' + item.lastname}
                                        </ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    )}
                    {!sessions.isFetchingUsers &&
                        sessions.sessionUsersPaginate.page < sessions.sessionUsersPaginate.totalPages && (
                            <Box>
                                <Button
                                    type="button"
                                    fullWidth
                                    onClick={() => {
                                        fetchUsersToSelect(searchString, sessionUsersPaginate.page + 1)
                                    }}
                                >
                                    {t('common.loadmore')}
                                </Button>
                            </Box>
                        )}
                    <Button type="button" fullWidth variant="outlined" onClick={() => setModal(null)} sx={{ mb: 2 }}>
                        {t('common.close')}
                    </Button>
                </CustomModal>
            </Box>
        )
    }
)

export default AddUsersToSession
