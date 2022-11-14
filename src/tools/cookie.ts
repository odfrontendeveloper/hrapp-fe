import moment from 'moment'

export const getCookie = (name: string): string | false => {
    const value: string = '; ' + document.cookie
    const parts: any = value.split('; ' + name + '=')
    if (parts && parts.length === 2) {
        return parts.pop().split(';').shift()
    } else {
        return false
    }
}

export const setCookie = (name: string, value: string): true => {
    document.cookie = `${name}=${value}; path=/; expires=${moment().add(1, 'day')}`
    return true
}

export const deleteCookie = (name: string): void => {
    document.cookie = `${name}=0; path=/; max-age=-1`
}
