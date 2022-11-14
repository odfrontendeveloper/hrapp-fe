import i18n from 'i18n'
import { toast } from 'react-toastify'
import { sessions } from 'store'
import {
    Details,
    Invitation,
    ISessionFormSelect,
    ISessionsPaginate,
    ISessionUserSelect,
    ISessionUsersPaginate,
    Session,
} from 'store/sessions'
import { handleError } from 'tools/api'
import { handleResponse, IFetchFailure, securedfetch } from 'tools/login'
import {
    createSessionUrl,
    editSessionUrl,
    getFormsForSessionUrl,
    getSessionDetailsUrl,
    getSessionsUrl,
    getUserInvitationsUrl,
    getUserInvitationUrl,
    getUsersForSessionUrl,
    sendFormUrl,
} from './urls'

export interface ICreateSession {
    name: string
    invitations: {
        key: string
        appraiserId: number
        assessedEmployeeId: number
        formId: number
    }[]
}

export const fetchUsersToSelect = (searchString: string, page: number) => {
    sessions.setSessionUsersPaginate({
        ...sessions.sessionUsersPaginate,
        page,
    })
    sessions.setIsFetchingUsers(true)
    securedfetch
        .get(getUsersForSessionUrl(), {
            searchString,
            page,
        })
        .then(handleResponse)
        .then((data: { results: ISessionUserSelect[]; pagination: ISessionUsersPaginate }) => {
            sessions.setIsFetchingUsers(false)
            sessions.setSessionUsersPaginate(data.pagination)

            if (data.pagination.page === 1) {
                sessions.setUsers(data.results)
            } else {
                sessions.addUsers(data.results)
            }
        })
        .catch((error: IFetchFailure) => {
            sessions.setIsFetchingUsers(false)
            handleError(error.message)
        })
}

export const fetchFormsToSelect = (id: number) => {
    sessions.setIsFetchingForms(true)
    securedfetch
        .get(getFormsForSessionUrl(id))
        .then(handleResponse)
        .then((data: ISessionFormSelect[]) => {
            sessions.setIsFetchingForms(false)
            sessions.setForms(data)
        })
        .catch((error: IFetchFailure) => {
            sessions.setIsFetchingForms(false)
            handleError(error.message)
        })
}

export const createSession = (data: ICreateSession) => {
    sessions.setIsFetchingCreateSession(true)
    securedfetch
        .post(createSessionUrl(), {
            ...data,
            invitations: data.invitations.map((item) => ({
                appraiserId: item.appraiserId,
                assessedEmployeeId: item.assessedEmployeeId,
                formId: item.formId,
            })),
        })
        .then(handleResponse)
        .then(() => {
            sessions.setIsFetchingCreateSession(false)
            const msg = i18n.t('sessions.api.create')
            toast.success(msg)
        })
        .catch((error) => {
            sessions.setIsFetchingCreateSession(false)
            handleError(error.message)
        })
}

export const getSessions = (searchString: string, page: number) => {
    sessions.setSessionsPagination({
        ...sessions.sessionUsersPaginate,
        page,
    })
    sessions.setIsFetchingSessions(true)
    securedfetch
        .get(getSessionsUrl(), {
            searchString,
            page,
        })
        .then(handleResponse)
        .then((data: { results: Session[]; pagination: ISessionsPaginate }) => {
            sessions.setIsFetchingSessions(false)
            sessions.setSessionUsersPaginate(data.pagination)
            sessions.setSessions(data.results)
        })
        .catch((error: IFetchFailure) => {
            sessions.setIsFetchingSessions(false)
            handleError(error.message)
        })
}

export const editSession = (data: { name: string; isActive: 1 | 0 }) => {
    if (sessions.editModal) {
        sessions.setIsEditFetching(true)
        securedfetch
            .put(editSessionUrl(sessions.editModal), data)
            .then(handleResponse)
            .then((response: Session) => {
                sessions.setIsEditFetching(false)
                sessions.setEditModal(null)
                sessions.editSession(response)
                const msg = i18n.t('sessions.api.edit')
                toast.success(msg)
            })
            .catch((error) => {
                sessions.setIsEditFetching(false)
                handleError(error.message)
            })
    }
}

export const deleteSession = () => {
    if (sessions.deleteModal) {
        sessions.setIsDeleteFetching(true)
        securedfetch
            .delete(editSessionUrl(sessions.deleteModal))
            .then(handleResponse)
            .then((response: number) => {
                sessions.setIsDeleteFetching(false)
                sessions.setDeleteModal(null)
                sessions.deleteSession(response)
                const msg = i18n.t('sessions.api.delete')
                toast.success(msg)
            })
            .catch((error) => {
                sessions.setIsDeleteFetching(false)
                handleError(error.message)
            })
    }
}

export const getInvitations = () => {
    sessions.setIsFetchingInvitations(true)
    securedfetch
        .get(getUserInvitationsUrl())
        .then(handleResponse)
        .then((data: Invitation[]) => {
            sessions.setIsFetchingInvitations(false)
            sessions.setInvitations(data)
        })
        .catch((error) => {
            sessions.setIsFetchingInvitations(false)
            handleError(error.message)
        })
}

export const getInvitation = (id: string | null) => {
    if (id) {
        sessions.setForm(null)
        securedfetch
            .get(getUserInvitationUrl(id))
            .then(handleResponse)
            .then((data) => {
                sessions.setForm(data)
            })
            .catch((error) => {
                handleError(error.message)
            })
    }
}

export const sendForm = (id: string | null) => {
    if (sessions.form && id) {
        sessions.setIsFetchingCompleteForm(true)
        securedfetch
            .post(sendFormUrl(), {
                id: +id,
                data: sessions.form,
            })
            .then(handleResponse)
            .then((data) => {
                const msg = i18n.t('sessions.sendSuccess')
                toast.success(msg)
                sessions.setForm(null)
                sessions.setIsFetchingCompleteForm(false)
            })
            .catch((error) => {
                sessions.setIsFetchingCompleteForm(false)
                handleError(error.message)
            })
    }
}

export const getSessionDetails = (id: string | null) => {
    if (id) {
        sessions.setIsFetchingDetails(true)
        securedfetch
            .get(getSessionDetailsUrl(id))
            .then(handleResponse)
            .then((data: Details[]) => {
                sessions.setDetails(data)
                sessions.setIsFetchingDetails(false)
            })
            .catch((error) => {
                sessions.setIsFetchingDetails(false)
                handleError(error.message)
            })
    }
}
