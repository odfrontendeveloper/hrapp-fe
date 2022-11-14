import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import loginUK from 'locales/uk/login.json'
import loginRU from 'locales/ru/login.json'
import loginEN from 'locales/en/login.json'

import settingsUK from 'locales/uk/settings.json'
import settingsRU from 'locales/ru/settings.json'
import settingsEN from 'locales/en/settings.json'

import commonUK from 'locales/uk/common.json'
import commonRU from 'locales/ru/common.json'
import commonEN from 'locales/en/common.json'

import staffUK from 'locales/uk/staff.json'
import staffRU from 'locales/ru/staff.json'
import staffEN from 'locales/en/staff.json'

import positionsUK from 'locales/uk/positions.json'
import positionsRU from 'locales/ru/positions.json'
import positionsEN from 'locales/en/positions.json'

import formsUK from 'locales/uk/forms.json'
import formsRU from 'locales/ru/forms.json'
import formsEN from 'locales/en/forms.json'

import sessionsUK from 'locales/uk/sessions.json'
import sessionsRU from 'locales/ru/sessions.json'
import sessionsEN from 'locales/en/sessions.json'

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    ru: {
        translation: {
            login: loginRU,
            settings: settingsRU,
            common: commonRU,
            staff: staffRU,
            positions: positionsRU,
            forms: formsRU,
            sessions: sessionsRU,
        },
    },
    uk: {
        translation: {
            login: loginUK,
            settings: settingsUK,
            common: commonUK,
            staff: staffUK,
            positions: positionsUK,
            forms: formsUK,
            sessions: sessionsUK,
        },
    },
    en: {
        translation: {
            login: loginEN,
            settings: settingsEN,
            common: commonEN,
            staff: staffEN,
            positions: positionsEN,
            forms: formsEN,
            sessions: sessionsEN,
        },
    },
}

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option

        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    })

export default i18n
