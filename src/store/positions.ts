import { action, makeObservable, observable } from 'mobx'

export interface Position {
    id: number
    name: string
}

export interface PositionsPaginate {
    page: number
    totalPages: number
}

export interface EditPositionModal {
    isOpen: boolean
    id: null | number
}

export class Positions {
    isFetchingPositions: boolean = false
    positions: Position[] = []

    isOpenCreatePositionModal: boolean = false
    deletePositionModal: EditPositionModal = {
        isOpen: false,
        id: null,
    }
    isFetchingCreatePosition: boolean = false

    editPositionModal: EditPositionModal = {
        isOpen: false,
        id: null,
    }

    positionsPagination: PositionsPaginate = {
        page: 1,
        totalPages: 1,
    }

    search: string = ''

    constructor() {
        makeObservable(this, {
            isFetchingPositions: observable,
            positions: observable,
            isOpenCreatePositionModal: observable,
            deletePositionModal: observable,
            editPositionModal: observable,
            positionsPagination: observable,
            search: observable,
            isFetchingCreatePosition: observable,
            setisFetchingPositions: action,
            setpositions: action,
            setisOpenCreatePositionModal: action,
            setdeletePositionModal: action,
            seteditPositionModal: action,
            setpositionsPagination: action,
            setSearch: action,
            setisFetchingCreatePosition: action,
            editPosition: action,
            reset: action,
        })
    }

    setisFetchingPositions(value: boolean): void {
        this.isFetchingPositions = value
    }

    setpositions(positions: Position[]): void {
        this.positions = positions
    }

    setisOpenCreatePositionModal(isopen: boolean): void {
        this.isOpenCreatePositionModal = isopen
    }

    setdeletePositionModal(isopen: EditPositionModal): void {
        this.deletePositionModal = isopen
    }

    seteditPositionModal(data: EditPositionModal): void {
        this.editPositionModal = data
    }

    setpositionsPagination(data: PositionsPaginate): void {
        this.positionsPagination = data
    }

    setSearch(str: string): void {
        this.search = str
    }

    setisFetchingCreatePosition(fetching: boolean): void {
        this.isFetchingCreatePosition = fetching
    }

    editPosition(position: Position): void {
        this.positions = this.positions.map((item) => {
            if (item.id === position.id) {
                return position
            }
            return item
        })
    }

    reset(): void {
        this.isFetchingPositions = false
        this.positions = []

        this.isOpenCreatePositionModal = false
        this.deletePositionModal = {
            isOpen: false,
            id: null,
        }
        this.isFetchingCreatePosition = false

        this.editPositionModal = {
            isOpen: false,
            id: null,
        }

        this.positionsPagination = {
            page: 1,
            totalPages: 1,
        }

        this.search = ''
    }
}
