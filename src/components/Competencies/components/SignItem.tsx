import React from 'react'
import { Box } from '@mui/system'
import { observer } from 'mobx-react'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import Percentage from 'CustomComponents/Percentage/Percentage'
import { useTranslation } from 'react-i18next'
import { Sign } from 'store/competencies'
import { Button } from '@mui/material'
import '../styles.scss'
import { useStores } from 'store'

const SignItem = observer(({ item }: { item: Sign }): JSX.Element => {
    const { competencies } = useStores()
    const { t } = useTranslation()
    return (
        <ListItem component="div" className="signItem">
            <Box className="signItemBox">
                <Box>
                    <ListItemText
                        sx={{ pl: 3 }}
                        primary={item.text}
                        secondary={`${t(`forms.sign.create.signTypes.${item.type}`)}`}
                    />
                </Box>
                <Box>
                    {item.criteria.map((criterion) => (
                        <ListItem sx={{ pl: 5 }} key={criterion.id}>
                            <ListItemText
                                primary={criterion.text}
                                secondary={<Percentage value={criterion.value} normal />}
                            />
                        </ListItem>
                    ))}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        sx={{ ml: '15px' }}
                        type="button"
                        onClick={() => {
                            competencies.setEditSignMode({
                                isOpen: true,
                                signId: item.id,
                            })
                        }}
                    >
                        {t('common.edit')}
                    </Button>
                    <Button color="error" type="button" onClick={() => competencies.openDeleteSignModal(item.id)}>
                        {t('common.delete')}
                    </Button>
                </Box>
            </Box>
        </ListItem>
    )
})

export default SignItem
