import { action, makeObservable, observable } from 'mobx'
import { Roles } from './me'
import { Position } from './positions'

export enum Permissions {
    can_manage_staff = 'can_manage_staff',
    can_manage_forms = 'can_manage_forms',
    can_manage_assessments = 'can_manage_assessments',
}

export const permissions = ['can_manage_staff', 'can_manage_forms', 'can_manage_assessments']

export interface OrganizationUser {
    id: number
    firstname: string
    middlename: string
    lastname: string
    email: string
    type: Roles
    permissions: { id: string; type: Permissions }[]
    isActive: 1 | 0
    positionInfo: Position | null
}

export interface IUsersPaginate {
    page: number
    totalPages: number
}

export interface StaffFilters {
    results: Position[]
    selected: Position[]
    page: number
    hasMore: boolean
}

export interface EditUserModal {
    isOpen: boolean
    mode: 'password' | 'profile' | 'type' | 'permissions' | 'position' | 'delete'
    userId: number | null
}

export class Staff {
    isOpenModalCreateUser: boolean = false
    isFetchingCreateUser: boolean = false
    isFetchingUsers: boolean = false
    users: OrganizationUser[] = []
    usersPagination: IUsersPaginate = {
        page: 1,
        totalPages: 1,
    }
    search: string = ''

    isFetchingFilters: boolean = false
    filters: StaffFilters = {
        results: [],
        selected: [],
        page: 1,
        hasMore: false,
    }

    editUserModal: EditUserModal = {
        isOpen: false,
        mode: 'profile',
        userId: null,
    }

    editUserPositionList: StaffFilters = {
        results: [],
        selected: [],
        page: 1,
        hasMore: false,
    }

    selectedActive: string[] = []
    selectedTypes: Roles[] = []

    constructor() {
        makeObservable(this, {
            isOpenModalCreateUser: observable,
            isFetchingCreateUser: observable,
            isFetchingUsers: observable,
            users: observable,
            usersPagination: observable,
            search: observable,
            isFetchingFilters: observable,
            filters: observable,
            editUserModal: observable,
            editUserPositionList: observable,
            selectedActive: observable,
            selectedTypes: observable,
            setisOpenModalCreateUser: action,
            setisFetchingCreateUser: action,
            setusersPagination: action,
            setSearch: action,
            setisFetchingUsers: action,
            setisFetchingFilters: action,
            setfiltersPositions: action,
            setUserModal: action,
            editUser: action,
            seteditUserPositionList: action,
            setselectedActive: action,
            setselectedTypes: action,
        })
    }

    setisOpenModalCreateUser(isOpen: boolean): void {
        this.isOpenModalCreateUser = isOpen
    }

    setisFetchingCreateUser(isFetching: boolean): void {
        this.isFetchingCreateUser = isFetching
    }

    setisFetchingUsers(isFetching: boolean): void {
        this.isFetchingUsers = isFetching
    }

    setUsers(users: OrganizationUser[]): void {
        this.users = users
    }

    setusersPagination(pagination: IUsersPaginate): void {
        this.usersPagination = pagination
    }

    setSearch(str: string): void {
        this.search = str
    }

    setisFetchingFilters(fetching: boolean): void {
        this.isFetchingFilters = fetching
    }

    setfiltersPositions(data: StaffFilters): void {
        this.filters = data
    }

    seteditUserPositionList(data: StaffFilters): void {
        this.editUserPositionList = data
    }

    setUserModal(data: EditUserModal): void {
        this.editUserModal = data
    }

    editUser(data: OrganizationUser): void {
        this.users = this.users.map((user) => {
            if (user.id === data.id) {
                return data
            }
            return user
        })
    }

    setselectedActive(data: string[]): void {
        this.selectedActive = data
    }

    setselectedTypes(data: Roles[]): void {
        this.selectedTypes = data
    }

    reset(): void {
        this.isOpenModalCreateUser = false
        this.isFetchingCreateUser = false
        this.isFetchingUsers = false
        this.users = []
        this.usersPagination = {
            page: 1,
            totalPages: 1,
        }
        this.search = ''
        this.isFetchingFilters = false
        this.filters = {
            results: [],
            selected: [],
            page: 1,
            hasMore: false,
        }
        this.editUserModal = {
            isOpen: false,
            mode: 'profile',
            userId: null,
        }
        this.editUserPositionList = {
            results: [],
            selected: [],
            page: 1,
            hasMore: false,
        }
        this.selectedActive = []
        this.selectedTypes = []
    }
}
