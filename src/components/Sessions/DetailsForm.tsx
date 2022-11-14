import { observer } from 'mobx-react'
import React, { useState } from 'react'
import { Params, useMatch } from 'react-router-dom'
import { useStores } from 'store'
import { Box, Checkbox, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { Competence, Sign } from 'store/sessions'
import { ArrowDropDown } from '@mui/icons-material'

const SignItem = ({ item }: { item: Sign }) => {
    return (
        <ListItem style={{ paddingLeft: '80px' }}>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">{item.text}</FormLabel>
                <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group">
                    {item.criteria.map((el) =>
                        item.type === 'single' ? (
                            <FormControlLabel
                                style={{ paddingLeft: '10px' }}
                                key={el.id}
                                value={el.id}
                                control={<Radio checked={el.selected} disabled />}
                                label={el.text}
                            />
                        ) : (
                            <div style={{ display: 'flex' }} key={el.id}>
                                <Checkbox id={`${el.id}`} checked={el.selected} disabled />
                                <label htmlFor={`${el.id}`} style={{ cursor: 'pointer' }}>
                                    <ListItemText style={{ paddingTop: '5px' }}>{el.text}</ListItemText>
                                </label>
                            </div>
                        )
                    )}
                </RadioGroup>
            </FormControl>
        </ListItem>
    )
}

const CompetenceItem = ({ item }: { item: Competence }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <ListItem style={{ padding: '0 10px' }}>
            <div>
                <ListItemButton onClick={() => setIsOpen(!isOpen)}>
                    <ArrowDropDown style={{ transform: `rotate(${isOpen ? 0 : 270}deg)` }} />
                    {item.name}
                </ListItemButton>
                {isOpen && (
                    <List>
                        {item.signs.map((el) => (
                            <SignItem item={el} key={el.id} />
                        ))}
                    </List>
                )}
            </div>
        </ListItem>
    )
}

const DetailsForm = observer(() => {
    const { sessions } = useStores()

    const match = useMatch('/home/sessions/:sessionId/details/:id')

    const paramsList: Params<'sessionId' | 'id'> | undefined = match?.params

    let id: number = 0

    if (paramsList && paramsList.id) {
        id = +paramsList.id
    }

    if (!paramsList || !id) return null

    const findData = sessions.details.find((item) => +item.id === id)

    if (!findData) return null
    if (!findData.report) return null

    return (
        <Box>
            <Typography variant="h5">{findData.report.name}</Typography>
            <List>
                {findData.report.competencies.map((item) => (
                    <CompetenceItem item={item} key={item.id} />
                ))}
            </List>
        </Box>
    )
})

export default DetailsForm
