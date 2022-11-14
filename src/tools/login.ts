import { getCookie } from './cookie'

export interface IFetchFailure {
    statusCode: number
    message: string
}

export const handleResponse = async (response: Response): Promise<any> => {
    if (!response.ok) throw await response.json()
    return await response.json()
}

export const fetchWithToken = (url: string, options: RequestInit): Promise<Response> => {
    const token: string | false = getCookie('token')

    const fetchOptions: any = { ...options }

    if (token && !!options) {
        fetchOptions.headers['Authorization'] = `Bearer ${token}`
    }

    return fetch(url, fetchOptions)
}

export const securedfetch = {
    get: async (url: string, query?: any): Promise<Response> => {
        if (query) {
            const queryOptions = Object.keys(query)
                .map((item) => {
                    return item + '=' + query[item]
                })
                .join('&')

            url = url + '?' + queryOptions
        }

        const options: RequestInit = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }

        return fetchWithToken(url, options)
    },
    post: async (url: string, body?: object, query?: any): Promise<Response> => {
        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body ? JSON.stringify(body) : null,
        }

        if (query) {
            const queryOptions = Object.keys(query)
                .map((item) => {
                    return item + '=' + query[item]
                })
                .join('&')

            url = url + '?' + queryOptions
        }

        return fetchWithToken(url, options)
    },
    put: async (url: string, body: object, query?: any): Promise<Response> => {
        const options: RequestInit = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }

        if (query) {
            const queryOptions = Object.keys(query)
                .map((item) => {
                    return item + '=' + query[item]
                })
                .join('&')

            url = url + '?' + queryOptions
        }

        return fetchWithToken(url, options)
    },
    delete: async (url: string, query?: any): Promise<Response> => {
        const options: RequestInit = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }

        if (query) {
            const queryOptions = Object.keys(query)
                .map((item) => {
                    return item + '=' + query[item]
                })
                .join('&')

            url = url + '?' + queryOptions
        }

        return fetchWithToken(url, options)
    },
}
