import { deleteCookie, setCookie } from 'tools/cookie'
import { IFetchFailure, handleResponse, securedfetch } from 'tools/login'
import { profileUrl, signInUrl, signUpUrl } from './urls'
import { competencies, forms, me, positions, sessions, settings, staff } from 'store'
import { Ime } from 'store/me'
import { handleError } from 'tools/api'

export interface SignUpFormData {
    firstname: string
    middlename: string
    lastname: string
    organizationName: string
    email: string
    password: string
}

export const logout = () => {
    me.reset()
    me.useredirectTo('/login')
    settings.reset()
    staff.reset()
    positions.reset()
    forms.reset()
    competencies.reset()
    sessions.resetStore()
    deleteCookie('token')
}

export const getProfile = (): void => {
    me.setFetchingProfile(true)
    securedfetch
        .get(profileUrl())
        .then(handleResponse)
        .then((data: Ime) => {
            me.setFetchingProfile(false)
            me.setMe(data)
        })
        .catch((error: IFetchFailure) => {
            me.setFetchingProfile(false)
            handleError(error.message)
        })
}

export const signIn = (data: { email: string; password: string }): void => {
    me.setloadingAuth(true)
    securedfetch
        .post(signInUrl(), data)
        .then(handleResponse)
        .then((data: { access_token: string }) => {
            setCookie('token', data.access_token)
            me.setloadingAuth(false)
            me.useredirectTo('/home/profile')
            getProfile()
        })
        .catch((error: IFetchFailure) => {
            me.setloadingAuth(false)
            handleError(error.message)
        })
}

export const signUp = (data: SignUpFormData): void => {
    me.setloadingAuth(true)
    securedfetch
        .post(signUpUrl(), data)
        .then(handleResponse)
        .then((data: { access_token: string }) => {
            setCookie('token', data.access_token)
            me.setloadingAuth(false)
            me.useredirectTo('/home/profile')
            getProfile()
        })
        .catch((error: IFetchFailure) => {
            me.setloadingAuth(false)
            handleError(error.message)
        })
}
