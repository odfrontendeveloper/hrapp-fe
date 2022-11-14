import { toast } from 'react-toastify'
import { IFetchFailure, handleResponse, securedfetch } from 'tools/login'
import { passwordUrl, profileUrl } from './urls'
import i18n from 'i18n'
import { me, settings } from 'store'
import { Ime } from 'store/me'
import { handleError } from 'tools/api'

export interface IChangeProfileForm {
    firstname: string
    middlename: string
    lastname: string
    organizationName: string
    email: string
}

export interface IChangePassword {
    oldpassword: string
    newpassword: string
}

export const updateProfile = (data: IChangeProfileForm) => {
    settings.setFetching(true)
    securedfetch
        .put(profileUrl(), data)
        .then(handleResponse)
        .then((result: Ime) => {
            settings.setOpen({
                ...settings.open,
                isOpen: false,
            })
            settings.setFetching(false)
            me.setMe(result)
            const msg = i18n.t('settings.profile.success')
            toast.success(msg)
        })
        .catch((error: IFetchFailure) => {
            settings.setFetching(false)
            handleError(error.message)
        })
}

export const updatePassword = (data: IChangePassword) => {
    settings.setFetching(true)
    securedfetch
        .put(passwordUrl(), data)
        .then(handleResponse)
        .then(() => {
            settings.setOpen({
                ...settings.open,
                isOpen: false,
            })
            settings.setFetching(false)
            const msg = i18n.t('settings.password.success')
            toast.success(msg)
        })
        .catch((error: IFetchFailure) => {
            settings.setFetching(false)
            handleError(error.message)
        })
}
