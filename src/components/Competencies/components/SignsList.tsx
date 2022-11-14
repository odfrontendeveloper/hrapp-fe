import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import Divider from '@mui/material/Divider'
import { TextField } from '@mui/material'
import { competencies } from 'store'
import { getCompetenceSigns } from 'api/forms'
import CreateSign from './CreateSign'
import EditSign from './EditSign'
import LoadingPage from 'CustomComponents/LoadingPage'
import { useTranslation } from 'react-i18next'
import SignItem from './SignItem'
import '../styles.scss'

const SignsList = observer(
    ({
        setCurrentCompetence,
        currentCompetence,
    }: {
        setCurrentCompetence: (value: number | null) => void
        currentCompetence: number | null
    }): JSX.Element => {
        const params = useParams()

        const [search, setSearch] = useState<string>('')

        const { t } = useTranslation()

        const { isFetchingSigns, signs, isOpenAddSign, editSignMode } = competencies

        const competenceId = params.competenceId ? +params.competenceId : null

        useEffect(() => {
            competencies.setselectedCompetence(competenceId)
            competencies.setIsOpenAddSign(false)
            competencies.setEditSignMode({
                isOpen: false,
                signId: null,
            })
            setCurrentCompetence(competenceId)
            if (competenceId) {
                getCompetenceSigns(+competenceId)
            }
        }, [competenceId, setCurrentCompetence])

        const listOfItems = () => {
            if (isFetchingSigns) return <LoadingPage />

            return signs
                .filter((item) => {
                    const searchItem = [item.text, ...item.criteria.map((el) => el.text)].join(' ')
                    return searchItem.toLowerCase().indexOf(search.toLowerCase()) !== -1
                })
                .map((item, i) => <SignItem item={item} key={item.id} />)
        }

        const findSignToEdit = competencies.signs.find((item) => item.id === editSignMode.signId)

        return (
            <>
                <Box sx={{ display: 'flex', alignItems: 'center', p: '4px' }}>
                    {!!currentCompetence && !isOpenAddSign && !editSignMode.isOpen && (
                        <Button
                            type="button"
                            sx={{ m: '4px' }}
                            variant="contained"
                            size="small"
                            onClick={() => {
                                competencies.setIsOpenAddSign(true)
                            }}
                        >
                            <AddIcon />
                        </Button>
                    )}
                    {!!currentCompetence && (isOpenAddSign || editSignMode.isOpen) && (
                        <Button
                            type="button"
                            sx={{ m: '4px' }}
                            variant="outlined"
                            size="small"
                            onClick={() => {
                                competencies.setIsOpenAddSign(false)
                                competencies.setEditSignMode({
                                    isOpen: false,
                                    signId: null,
                                })
                            }}
                        >
                            <CloseIcon />
                        </Button>
                    )}
                    {!isOpenAddSign && !editSignMode.isOpen && (
                        <TextField
                            sx={{ width: '250px', marginLeft: '10px' }}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            size="small"
                            placeholder={t('common.search.default')}
                        />
                    )}
                </Box>
                <Divider />
                <List component="nav" aria-label="secondary mailbox folder" className="list-of-competencies">
                    {isOpenAddSign && !!competenceId && <CreateSign competenceId={competenceId} />}
                    {competencies.editSignMode.isOpen && !!competenceId && !!findSignToEdit && (
                        <EditSign competenceId={competenceId} sign={findSignToEdit} />
                    )}
                    {!isOpenAddSign && !competencies.editSignMode.isOpen && !!competenceId && listOfItems()}
                </List>
            </>
        )
    }
)

export default SignsList
