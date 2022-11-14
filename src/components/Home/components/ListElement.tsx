import * as React from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'

interface IListElement {
    item: {
        text: string
        icon: JSX.Element
    }
    open: boolean
    onClick?: () => void
}

const ListElement = observer(({ item, open, onClick }: IListElement): JSX.Element => {
    const { t } = useTranslation()

    return (
        <ListItem disablePadding key={item.text} sx={{ display: 'block' }}>
            <ListItemButton
                sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                }}
                onClick={() => !!onClick && onClick()}
            >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                    }}
                >
                    {item.icon}
                </ListItemIcon>
                <ListItemText primary={t('common.menu.' + item.text)} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
        </ListItem>
    )
})

export default ListElement
