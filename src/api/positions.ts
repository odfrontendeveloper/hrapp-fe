import i18n from 'i18n'
import { toast } from 'react-toastify'
import { forms, positions, staff } from 'store'
import { Position, PositionsPaginate } from 'store/positions'
import { StaffFilters } from 'store/staff'
import { handleError } from 'tools/api'
import { handleResponse, securedfetch } from 'tools/login'
import { positionIdUrl, positionsFiltersUrl, positionsUrl } from './urls'

export const getPositionsForFilters = async ({
    searchString,
    selected,
    page,
}: {
    searchString: string
    selected?: number[]
    page?: number
}): Promise<void> => {
    staff.setisFetchingFilters(true)
    securedfetch
        .get(positionsFiltersUrl(), {
            selected: selected
                ? JSON.stringify(selected)
                : JSON.stringify(staff.filters.selected.map((item) => item.id)),
            searchString,
            page: page || staff.filters.page,
        })
        .then(handleResponse)
        .then((data: StaffFilters) => {
            staff.setisFetchingFilters(false)
            staff.setfiltersPositions(data)
        })
        .catch((error) => {
            staff.setisFetchingFilters(false)
            handleError(error.message)
        })
}

export const getPositions = (searchString: string, page: number): void => {
    positions.setpositionsPagination({
        ...positions.positionsPagination,
        page,
    })
    positions.setisFetchingPositions(true)
    securedfetch
        .get(positionsUrl(), { searchString, page })
        .then(handleResponse)
        .then(({ results, pagination }: { results: Position[]; pagination: PositionsPaginate }) => {
            positions.setisFetchingPositions(false)
            positions.setpositions(results)
            positions.setpositionsPagination(pagination)
        })
        .catch((error) => {
            positions.setisFetchingPositions(false)
            handleError(error.message)
        })
}

export const createPosition = (name: string): void => {
    positions.setisFetchingCreatePosition(true)
    securedfetch
        .post(positionsUrl(), { name })
        .then(handleResponse)
        .then(() => {
            const successMsg = i18n.t('positions.success.create')
            toast.success(successMsg)
            getPositions(positions.search, positions.positionsPagination.page + 1)
            positions.setisFetchingCreatePosition(false)
            positions.setisOpenCreatePositionModal(false)
        })
        .catch((error) => {
            positions.setisFetchingCreatePosition(false)
            handleError(error.message)
        })
}

export const editPosition = (name: string, id: number): void => {
    positions.setisFetchingCreatePosition(true)
    securedfetch
        .put(positionIdUrl(id), { name })
        .then(handleResponse)
        .then((data: Position) => {
            const successMsg = i18n.t('positions.success.edit')
            toast.success(successMsg)
            positions.editPosition(data)
            positions.setisFetchingCreatePosition(false)
            positions.seteditPositionModal({
                isOpen: false,
                id: null,
            })
        })
        .catch((error) => {
            positions.setisFetchingCreatePosition(false)
            handleError(error.message)
        })
}

export const deletePosition = (id: number): void => {
    positions.setisFetchingCreatePosition(true)
    securedfetch
        .delete(positionIdUrl(id), { name })
        .then(handleResponse)
        .then(() => {
            if (forms.selectedPosition === id) {
                forms.setSelectedPosition(null)
            }
            const successMsg = i18n.t('positions.success.delete')
            toast.success(successMsg)
            getPositions(positions.search, positions.positionsPagination.page)
            positions.setisFetchingCreatePosition(false)
            positions.setdeletePositionModal({
                isOpen: false,
                id: null,
            })
        })
        .catch((error) => {
            positions.setisFetchingCreatePosition(false)
            handleError(error.message)
        })
}
