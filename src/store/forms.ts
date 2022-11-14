import { action, makeObservable, observable } from 'mobx'
import { Position, PositionsPaginate } from './positions'

export interface FormTemplate {
    id: number
    name: string
}

export interface FormCompetence {
    id: number
    formTemplate: {
        id: number
        name: string
    }
    competence: {
        id: number
        name: string
    }
}

export interface IEditTemplateModal {
    isOpen: boolean
    id: number | null
}

export interface IIsFetchingEditConnection {
    isFetching: boolean
    template: number | null
    competence: number | null
}

export class Forms {
    selectedPosition: number | null = null

    isFetchingPositions: boolean = false
    positions: Position[] = []
    positionsPagination: PositionsPaginate = {
        page: 1,
        totalPages: 1,
    }

    search: string = ''

    isFetchingTemplates: boolean = false
    templates: FormTemplate[] = []
    connections: FormCompetence[] = []

    isOpenCreateTemplate: boolean = false
    isFetchingCreateTemplate: boolean = false

    editTemplateModal: IEditTemplateModal = {
        isOpen: false,
        id: null,
    }

    deleteTemplateModal: IEditTemplateModal = {
        isOpen: false,
        id: null,
    }

    isFetchingEditConnection: IIsFetchingEditConnection = {
        isFetching: false,
        template: null,
        competence: null,
    }

    constructor() {
        makeObservable(this, {
            selectedPosition: observable,
            isFetchingPositions: observable,
            positions: observable,
            positionsPagination: observable,
            search: observable,
            isFetchingTemplates: observable,
            templates: observable,
            connections: observable,
            isOpenCreateTemplate: observable,
            isFetchingCreateTemplate: observable,
            editTemplateModal: observable,
            deleteTemplateModal: observable,
            isFetchingEditConnection: observable,
            setIsOpenCreateTemplate: action,
            setIsFetchingCreateTemplate: action,
            setSearch: action,
            setSelectedPosition: action,
            setisFetchingPositions: action,
            setpositions: action,
            setpositionsPagination: action,
            seIsFetchingTemplates: action,
            setTemplates: action,
            setConnections: action,
            addTemplate: action,
            editTemplate: action,
            deleteTemplate: action,
            openEditTemplateModal: action,
            closeEditModal: action,
            openDeleteTemplateModal: action,
            closeDeleteModal: action,
            setIsFetchingEditConnection: action,
            addConnection: action,
            deleteConnection: action,
            reset: action,
        })
    }

    setisFetchingPositions(value: boolean): void {
        this.isFetchingPositions = value
    }

    setpositions(positions: Position[]): void {
        this.positions = positions
    }

    setpositionsPagination(data: PositionsPaginate): void {
        this.positionsPagination = data
    }

    setSelectedPosition(value: number | null): void {
        this.selectedPosition = value
    }

    setSearch(str: string): void {
        this.search = str
    }

    seIsFetchingTemplates(value: boolean): void {
        this.isFetchingTemplates = value
    }

    setTemplates(value: FormTemplate[]): void {
        this.templates = value
    }

    setConnections(value: FormCompetence[]): void {
        this.connections = value
    }

    addTemplate(value: FormTemplate): void {
        this.templates = [...this.templates, value]
    }

    editTemplate(value: FormTemplate): void {
        this.templates = this.templates.map((item) => {
            if (item.id === value.id) {
                return value
            }
            return item
        })
    }

    deleteTemplate(value: number): void {
        this.templates = this.templates.filter((item) => item.id !== value)
        this.connections = this.connections.filter((item) => item.formTemplate.id !== value)
    }

    setIsOpenCreateTemplate(value: boolean): void {
        this.isOpenCreateTemplate = value
    }

    setIsFetchingCreateTemplate(value: boolean): void {
        this.isFetchingCreateTemplate = value
    }

    openEditTemplateModal(id: number): void {
        this.editTemplateModal = {
            isOpen: true,
            id,
        }
    }

    closeEditModal(): void {
        this.editTemplateModal = {
            isOpen: false,
            id: null,
        }
    }

    openDeleteTemplateModal(id: number): void {
        this.deleteTemplateModal = {
            isOpen: true,
            id,
        }
    }

    closeDeleteModal(): void {
        this.deleteTemplateModal = {
            isOpen: false,
            id: null,
        }
    }

    setIsFetchingEditConnection(value: IIsFetchingEditConnection): void {
        this.isFetchingEditConnection = value
    }

    addConnection(value: FormCompetence): void {
        this.connections = [...this.connections, value]
    }

    deleteConnection(value: number): void {
        this.connections = this.connections.filter((item) => item.id !== value)
    }

    reset(): void {
        this.selectedPosition = null
        this.isFetchingPositions = false
        this.positions = []
        this.positionsPagination = {
            page: 1,
            totalPages: 1,
        }
        this.search = ''
        this.isFetchingTemplates = false
        this.templates = []
        this.connections = []
        this.isOpenCreateTemplate = false
        this.isFetchingCreateTemplate = false
        this.editTemplateModal = {
            isOpen: false,
            id: null,
        }
        this.deleteTemplateModal = {
            isOpen: false,
            id: null,
        }
        this.isFetchingEditConnection = {
            isFetching: false,
            template: null,
            competence: null,
        }
    }
}
