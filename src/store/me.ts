import { action, makeObservable, observable, computed } from 'mobx'
import { Permissions } from './staff'

export enum Roles {
    owner = 'owner',
    admin = 'admin',
    staff = 'staff',
}

export const roles = ['owner', 'admin', 'staff']

export interface Ime {
    id: number
    email: string
    firstname: string
    middlename: string
    lastname: string
    organizationName: string
    permissions: { id: string; type: Permissions }[]
    type: Roles
}

export class Me {
    me: Ime | null = null
    loadingAuth: boolean = false
    redirectTo: string | null = null
    fetchingProfile: boolean = false

    constructor() {
        makeObservable(this, {
            // observable
            me: observable,
            loadingAuth: observable,
            redirectTo: observable,
            fetchingProfile: observable,

            // actions
            setMe: action,
            setloadingAuth: action,
            useredirectTo: action,
            setFetchingProfile: action,
            reset: action,

            // computed
            myPermissions: computed,
        })
    }

    get myPermissions() {
        if (!this.me) return []
        if (this.me.type === Roles.owner)
            return [Permissions.can_manage_assessments, Permissions.can_manage_forms, Permissions.can_manage_staff]
        if (this.me.type === Roles.staff) return []
        if (this.me.type === Roles.admin) return this.me.permissions.map((item) => item.type)
    }

    setMe(data: Ime): void {
        this.me = data
    }

    setloadingAuth(loading: boolean): void {
        this.loadingAuth = loading
    }

    useredirectTo(value: string | null): void {
        this.redirectTo = value
    }

    setFetchingProfile(fetching: boolean): void {
        this.fetchingProfile = fetching
    }

    reset(): void {
        this.me = null
        this.loadingAuth = false
        this.redirectTo = null
        this.fetchingProfile = false
    }
}
