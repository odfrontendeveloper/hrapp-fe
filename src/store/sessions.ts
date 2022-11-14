import { action, makeObservable, observable } from 'mobx'

export interface ISessionUsersPaginate {
    page: number
    totalPages: number
}

export interface ISessionsPaginate {
    page: number
    totalPages: number
}

export interface ISessionUserSelect {
    id: number
    firstname: string
    middlename: string
    lastname: string
    userPosition: {
        id: string
    }
}

export interface ISessionFormSelect {
    id: number
    name: string
}

export interface Session {
    id: number
    name: string
    isActive: 1 | 0
}

export interface Invitation {
    id: number
    assessedEmployee: string
    form: string
}

export interface Criteria {
    id: number
    text: string
    value: number
    selected: boolean
}

export interface Sign {
    id: number
    text: string
    type: 'single' | 'multi'
    criteria: Criteria[]
}

export interface Competence {
    id: number
    name: string
    signs: Sign[]
}

export interface Form {
    id: number
    name: string
    competencies: Competence[]
}

export interface Details {
    report: Form | null
    id: number
    appraiser: string
    assessedEmployee: string
    formTemplate: string
}

export class Sessions {
    // users to select list
    @observable isFetchingUsers: boolean = false
    @observable sessionUsersPaginate: ISessionUsersPaginate = {
        page: 1,
        totalPages: 1,
    }
    @observable users: ISessionUserSelect[] = []
    @observable searchString: string = ''

    // forms to select list
    @observable isFetchingForms: boolean = false
    @observable forms: ISessionFormSelect[] = []

    // sessions
    @observable isFetchingCreateSession: boolean = false

    @observable isFetchingSessions: boolean = false
    @observable sessions: Session[] = []
    @observable sessionsPaginate: ISessionUsersPaginate = {
        page: 1,
        totalPages: 1,
    }

    @observable sessionsSearchString: string = ''
    @observable editModal: number | null = null
    @observable isEditFetcing: boolean = false

    @observable deleteModal: number | null = null
    @observable isFetchingDelete: boolean = false

    // invitations
    @observable invitations: Invitation[] = []
    @observable isFetchingInvitations: boolean = false

    // form
    @observable form: Form | null = null
    @observable isFetchingCompleteForm: boolean = false

    @observable isFetchingDetails: boolean = false
    @observable details: Details[] = []

    constructor() {
        makeObservable(this)
    }

    @action setIsFetchingDetails(value: boolean): void {
        this.isFetchingDetails = value
    }

    @action setDetails(data: Details[]): void {
        this.details = data
    }

    @action setIsFetchingCompleteForm(value: boolean): void {
        this.isFetchingCompleteForm = value
    }

    @action setForm(form: Form | null): void {
        this.form = form
    }

    @action setIsFetchingInvitations(value: boolean): void {
        this.isFetchingInvitations = value
    }

    @action setInvitations(data: Invitation[]): void {
        this.invitations = data
    }

    @action deleteSession(id: number): void {
        this.sessions = this.sessions.filter((item) => item.id !== id)
    }

    @action setIsDeleteFetching(value: boolean): void {
        this.isFetchingDelete = value
    }

    @action setIsEditFetching(value: boolean): void {
        this.isEditFetcing = value
    }

    @action editSession(session: Session): void {
        this.sessions = this.sessions.map((item) => {
            if (item.id === session.id) return session
            return item
        })
    }

    @action setDeleteModal(value: number | null): void {
        this.deleteModal = value
    }

    @action setEditModal(value: number | null): void {
        this.editModal = value
    }

    @action setIsFetchingSessions(value: boolean): void {
        this.isFetchingSessions = value
    }

    @action setSearchString(value: string): void {
        this.searchString = value
    }

    @action setSessionUsersPaginate(paginate: ISessionUsersPaginate): void {
        this.sessionUsersPaginate = paginate
    }

    @action setIsFetchingUsers(value: boolean): void {
        this.isFetchingUsers = value
    }

    @action setUsers(users: ISessionUserSelect[]): void {
        this.users = users
    }

    @action addUsers(users: ISessionUserSelect[]): void {
        this.users = [...this.users, ...users]
    }

    @action setIsFetchingForms(value: boolean): void {
        this.isFetchingForms = value
    }

    @action setForms(forms: ISessionFormSelect[]): void {
        this.forms = forms
    }

    @action setIsFetchingCreateSession(value: boolean): void {
        this.isFetchingCreateSession = value
    }

    @action setSessions(sessions: Session[]): void {
        this.sessions = sessions
    }

    @action addSessions(sessions: Session[]): void {
        this.sessions = [...this.sessions, ...sessions]
    }

    @action setSessionsPagination(pagination: ISessionsPaginate): void {
        this.sessionsPaginate = pagination
    }

    @action setSessionsSearchString(value: string): void {
        this.sessionsSearchString = value
    }

    @action resetStore(): void {
        this.isFetchingUsers = false
        this.sessionUsersPaginate = {
            page: 1,
            totalPages: 1,
        }
        this.users = []
        this.searchString = ''
        this.isFetchingForms = false
        this.forms = []
        this.isFetchingCreateSession = false
        this.isFetchingSessions = false
        this.sessions = []
        this.sessionsPaginate = {
            page: 1,
            totalPages: 1,
        }
        this.sessionsSearchString = ''
        this.editModal = null
        this.isEditFetcing = false
        this.deleteModal = null
        this.isFetchingDelete = false
        this.invitations = []
        this.isFetchingInvitations = false
        this.form = null
        this.isFetchingCompleteForm = false
    }
}
