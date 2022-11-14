import i18n from 'i18n'
import { toast } from 'react-toastify'
import { staff } from 'store'
import { handleResponse, securedfetch } from 'tools/login'
import {
    adminUsersUrl,
    createUserUrl,
    deleteUserUrl,
    positionsFiltersUrl,
    updateUserPasswordUrl,
    updateUserPermissionsUrl,
    updateUserPositionUrl,
    updateUserProfileUrl,
    updateUserTypeUrl,
} from './urls'
import { IUsersPaginate, OrganizationUser, Permissions, StaffFilters } from 'store/staff'
import { handleError } from 'tools/api'
import { Roles } from 'store/me'

export interface ICreateUser {
    firstname: string
    middlename: string
    lastname: string
    email: string
    password: string
}

export interface UpdateUserProfileDto {
    userId: number
    firstname: string
    middlename: string
    lastname: string
    email: string
    isActive: 1 | 0
}

export interface UpdateUserProfileDto {
    userId: number
    firstname: string
    middlename: string
    lastname: string
    email: string
    isActive: 1 | 0
}

export interface UpdateUserPasswordDto {
    userId: number
    password: string
}

export interface UpdateUserTypeDto {
    userId: number
    type: Roles
}

export interface UpdateUserPermissionsDto {
    userId: number
    permissions: Permissions[]
}

export const getOrganizationUsers = (
    searchString: string,
    page: number,
    active: string[] | null,
    types: string[] | null,
    selectedPositions: number[] | null
): void => {
    const activeParam: string[] = !!active ? active : staff.selectedActive
    const typesParam: string[] = !!types ? types : staff.selectedTypes
    const positionsParam: number[] = !!selectedPositions
        ? selectedPositions
        : staff.filters.selected.map((item) => item.id)
    staff.setusersPagination({
        ...staff.usersPagination,
        page,
    })
    staff.setisFetchingUsers(true)
    securedfetch
        .get(adminUsersUrl(), {
            searchString,
            page,
            types: JSON.stringify(typesParam),
            active: JSON.stringify(activeParam),
            positions: JSON.stringify(positionsParam),
        })
        .then(handleResponse)
        .then(({ results, pagination }: { results: OrganizationUser[]; pagination: IUsersPaginate }) => {
            staff.setisFetchingUsers(false)
            staff.setUsers(results)
            staff.setusersPagination(pagination)
        })
        .catch((error) => {
            staff.setisFetchingUsers(false)
            handleError(error.message)
        })
}

export const createUserByAdmin = (data: ICreateUser, search: string): void => {
    const body: ICreateUser = {
        ...data,
    }

    staff.setisFetchingCreateUser(true)
    securedfetch
        .post(createUserUrl(), body)
        .then(handleResponse)
        .then((data) => {
            const msg = i18n.t('staff.api.created')
            toast.success(msg)
            getOrganizationUsers(search, staff.usersPagination.totalPages + 1, null, null, null)
            staff.setisOpenModalCreateUser(false)
            staff.setisFetchingCreateUser(false)
        })
        .catch((error) => {
            staff.setisFetchingCreateUser(false)
            handleError(error.message)
        })
}

export const editUserByAdmin = (data: UpdateUserProfileDto): void => {
    const body = {
        ...data,
    }

    staff.setisFetchingCreateUser(true)
    securedfetch
        .put(updateUserProfileUrl(), body)
        .then(handleResponse)
        .then((data: OrganizationUser) => {
            const msg = i18n.t('common.success.edited')
            toast.success(msg)
            staff.setUserModal({
                isOpen: false,
                userId: null,
                mode: staff.editUserModal.mode,
            })
            staff.editUser(data)
            staff.setisFetchingCreateUser(false)
        })
        .catch((error) => {
            staff.setisFetchingCreateUser(false)
            handleError(error.message)
        })
}

export const editUserPasswordByAdmin = (data: UpdateUserPasswordDto): void => {
    const body = {
        userId: data.userId,
        newPassword: data.password,
    }

    staff.setisFetchingCreateUser(true)
    securedfetch
        .put(updateUserPasswordUrl(), body)
        .then(handleResponse)
        .then(() => {
            const msg = i18n.t('common.success.edited')
            toast.success(msg)
            staff.setUserModal({
                isOpen: false,
                userId: null,
                mode: staff.editUserModal.mode,
            })
            staff.setisFetchingCreateUser(false)
        })
        .catch((error) => {
            staff.setisFetchingCreateUser(false)
            handleError(error.message)
        })
}

export const editUserTypeByAdmin = (data: UpdateUserTypeDto): void => {
    const body = {
        ...data,
    }

    staff.setisFetchingCreateUser(true)
    securedfetch
        .put(updateUserTypeUrl(), body)
        .then(handleResponse)
        .then((data: OrganizationUser) => {
            const msg = i18n.t('common.success.edited')
            toast.success(msg)
            staff.setUserModal({
                isOpen: false,
                userId: null,
                mode: staff.editUserModal.mode,
            })
            staff.editUser(data)
            staff.setisFetchingCreateUser(false)
        })
        .catch((error) => {
            staff.setisFetchingCreateUser(false)
            handleError(error.message)
        })
}

export const editUserPermissionsByAdmin = (data: UpdateUserPermissionsDto): void => {
    const body = {
        ...data,
    }

    staff.setisFetchingCreateUser(true)
    securedfetch
        .put(updateUserPermissionsUrl(), body)
        .then(handleResponse)
        .then((data: OrganizationUser) => {
            const msg = i18n.t('common.success.edited')
            toast.success(msg)
            staff.setUserModal({
                isOpen: false,
                userId: null,
                mode: staff.editUserModal.mode,
            })
            staff.editUser(data)
            staff.setisFetchingCreateUser(false)
        })
        .catch((error) => {
            staff.setisFetchingCreateUser(false)
            handleError(error.message)
        })
}

export const getPositionsForEditPosition = async ({
    searchString,
    page,
}: {
    searchString: string
    page?: number
}): Promise<void> => {
    staff.setisFetchingFilters(true)
    securedfetch
        .get(positionsFiltersUrl(), {
            selected: JSON.stringify([]),
            searchString,
            page: page || staff.filters.page,
        })
        .then(handleResponse)
        .then((data: StaffFilters) => {
            staff.setisFetchingFilters(false)
            staff.seteditUserPositionList(data)
        })
        .catch((error) => {
            staff.setisFetchingFilters(false)
            handleError(error.message)
        })
}

export const changeUserPosition = (body: { userId: number; positionId: number }): void => {
    staff.setisFetchingCreateUser(true)
    securedfetch
        .put(updateUserPositionUrl(), body)
        .then(handleResponse)
        .then((data: OrganizationUser) => {
            const msg = i18n.t('common.success.edited')
            toast.success(msg)
            staff.editUser(data)
            staff.setUserModal({
                isOpen: false,
                userId: null,
                mode: staff.editUserModal.mode,
            })
            staff.setisFetchingCreateUser(false)
        })
        .catch((error) => {
            staff.setisFetchingCreateUser(false)
            handleError(error.message)
        })
}

export const deleteUser = (id: number): void => {
    staff.setisFetchingCreateUser(true)
    securedfetch
        .delete(deleteUserUrl(), { id })
        .then(handleResponse)
        .then(() => {
            getOrganizationUsers(staff.search, staff.usersPagination.page, null, null, null)
            staff.setUserModal({
                isOpen: false,
                userId: null,
                mode: staff.editUserModal.mode,
            })
            staff.setisFetchingCreateUser(false)
        })
        .catch((error) => {
            staff.setisFetchingCreateUser(false)
            handleError(error.message)
        })
}
