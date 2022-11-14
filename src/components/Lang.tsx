import React from 'react'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { setCookie } from 'tools/cookie'

const Lang = observer(() => {
    const { i18n } = useTranslation()

    const onChangeLang = (lang: string): void => {
        i18n.changeLanguage(lang)
        setCookie('lang', lang)
    }

    return (
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button
                size="small"
                variant={i18n.language === 'uk' ? 'contained' : 'outlined'}
                onClick={() => onChangeLang('uk')}
            >
                UK
            </Button>
            <Button
                size="small"
                variant={i18n.language === 'ru' ? 'contained' : 'outlined'}
                onClick={() => onChangeLang('ru')}
            >
                RU
            </Button>
            <Button
                size="small"
                variant={i18n.language === 'en' ? 'contained' : 'outlined'}
                onClick={() => onChangeLang('en')}
            >
                EN
            </Button>
        </ButtonGroup>
    )
})

export default Lang
