import { observer } from 'mobx-react'
import { Box, Checkbox, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import React, { useEffect, useState } from 'react'
import { Params, useLocation, useMatch } from 'react-router-dom'
import { getInvitation } from 'api/sessions'
import { sessions } from 'store'
import { ArrowDropDown } from '@mui/icons-material'
import { Competence, Sign } from 'store/sessions'

const SignItem = ({ item }: { item: Sign }) => {
    const onChange = (e: any, el: any) => {
        if (sessions.form) {
            sessions.setForm({
                ...sessions.form,
                competencies: [...sessions.form.competencies].map((itemCompetence) => {
                    return {
                        ...itemCompetence,
                        signs: [...itemCompetence.signs].map((itemSign) => {
                            const isItemHere = itemSign.criteria.find((el1) => +el1.id === el.id)

                            if (!isItemHere) return itemSign
                            return {
                                ...itemSign,
                                criteria: [...itemSign.criteria].map((itemCriterion) => ({
                                    ...itemCriterion,
                                    selected:
                                        itemCriterion.id === el.id
                                            ? e.target.checked
                                            : itemSign.type === 'multi'
                                            ? itemCriterion.selected
                                            : false,
                                })),
                            }
                        }),
                    }
                }),
            })
        }
    }

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
                                control={<Radio checked={el.selected} onChange={(e) => onChange(e, el)} />}
                                label={el.text}
                            />
                        ) : (
                            <div style={{ display: 'flex' }} key={el.id}>
                                <Checkbox id={`${el.id}`} checked={el.selected} onChange={(e) => onChange(e, el)} />
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

const Invitation = observer(() => {
    const match = useMatch('/home/invitations/:id')

    const paramsList: Params<'id'> | undefined = match?.params

    const inviteId: string | null = paramsList?.id || null

    useEffect(() => {
        getInvitation(inviteId)
    }, [inviteId])

    if (!sessions.form) return null

    return (
        <Box>
            <Typography variant="h5">{sessions.form.name}</Typography>
            <List>
                {sessions.form.competencies.map((item) => (
                    <CompetenceItem item={item} key={item.id} />
                ))}
            </List>
        </Box>
    )
})

export default Invitation
