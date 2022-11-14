import { action, makeObservable, observable } from 'mobx'

export interface Competence {
    id: number
    name: string
}

export interface PositionWithCompetencies {
    id: number
    name: string
    competencies: Competence[]
}

export interface ICompetenceModal {
    mode: 'create' | 'edit' | 'delete'
    isOpen: boolean
    competenceId: number | null
}

export enum SignTypes {
    single = 'single',
    multi = 'multi',
}

export const signTypes = ['single', 'multi']

export interface Criterion {
    id: number
    text: string
    value: number
}

export interface Sign {
    id: number
    text: string
    criteria: Criterion[]
    type: SignTypes
}

export interface EditSignMode {
    isOpen: boolean
    signId: number | null
}

export class Competencies {
    isFetching: boolean = false
    positionWithCompetencies: PositionWithCompetencies | null = null

    competenceModal: ICompetenceModal = {
        mode: 'create',
        isOpen: false,
        competenceId: null,
    }
    isFetchingModal: boolean = false

    isFetchingSigns: boolean = false
    signs: Sign[] = []

    isOpenAddSign: boolean = false
    isFetchingCreateEditDeleteSign: boolean = false

    selectedCompetence: number | null = null

    editSignMode: EditSignMode = {
        isOpen: false,
        signId: null,
    }

    deleteSignModal: EditSignMode = {
        isOpen: false,
        signId: null,
    }

    constructor() {
        makeObservable(this, {
            isFetching: observable,
            positionWithCompetencies: observable,
            competenceModal: observable,
            isFetchingModal: observable,
            isFetchingSigns: observable,
            signs: observable,
            isOpenAddSign: observable,
            isFetchingCreateEditDeleteSign: observable,
            selectedCompetence: observable,
            editSignMode: observable,
            deleteSignModal: observable,
            openModal: action,
            createCompetence: action,
            editCompetence: action,
            closeModal: action,
            setIsFetching: action,
            addSign: action,
            setCompetencies: action,
            setIsFetchingModal: action,
            setIsFetchingSigns: action,
            setSigns: action,
            editSign: action,
            setIsOpenAddSign: action,
            setisFetchingCreateEditDeleteSign: action,
            setselectedCompetence: action,
            setEditSignMode: action,
            reset: action,
        })
    }

    setIsFetching(value: boolean): void {
        this.isFetching = value
    }

    createCompetence(data: Competence): void {
        if (this.positionWithCompetencies) {
            this.positionWithCompetencies = {
                ...this.positionWithCompetencies,
                competencies: [...this.positionWithCompetencies.competencies, data],
            }
        }
    }

    editCompetence(data: Competence): void {
        if (this.positionWithCompetencies) {
            this.positionWithCompetencies = {
                ...this.positionWithCompetencies,
                competencies: this.positionWithCompetencies.competencies.map((item) => {
                    if (item.id === data.id) {
                        return data
                    }
                    return item
                }),
            }
        }
    }

    deleteCompetence(id: number): void {
        if (this.positionWithCompetencies) {
            this.positionWithCompetencies = {
                ...this.positionWithCompetencies,
                competencies: this.positionWithCompetencies.competencies.filter((item) => {
                    return item.id !== id
                }),
            }
        }
    }

    setCompetencies(value: PositionWithCompetencies | null): void {
        this.positionWithCompetencies = value
    }

    openModal(mode: 'create' | 'edit' | 'delete', id: number | null): void {
        this.competenceModal = {
            mode,
            isOpen: true,
            competenceId: id,
        }
    }

    closeModal(): void {
        this.competenceModal = {
            mode: this.competenceModal.mode,
            isOpen: false,
            competenceId: null,
        }
    }

    setIsFetchingModal(value: boolean): void {
        this.isFetchingModal = value
    }

    setIsFetchingSigns(value: boolean): void {
        this.isFetchingSigns = value
    }

    setSigns(signs: Sign[]): void {
        this.signs = signs
    }

    editSign(sign: Sign): void {
        this.signs = this.signs.map((item) => {
            if (item.id === sign.id) {
                return sign
            }
            return item
        })
    }

    deleteSign(id: number): void {
        this.signs = this.signs.filter((item) => item.id !== id)
    }

    setIsOpenAddSign(value: boolean): void {
        this.isOpenAddSign = value
    }

    setisFetchingCreateEditDeleteSign(value: boolean): void {
        this.isFetchingCreateEditDeleteSign = value
    }

    addSign(data: Sign): void {
        this.signs = [...this.signs, data]
    }

    setselectedCompetence(value: number | null): void {
        this.selectedCompetence = value
    }

    setEditSignMode(data: EditSignMode): void {
        this.editSignMode = data
    }

    openDeleteSignModal(id: number): void {
        this.deleteSignModal = {
            isOpen: true,
            signId: id,
        }
    }

    closeDeleteSignModal(): void {
        this.deleteSignModal = {
            isOpen: false,
            signId: null,
        }
    }

    reset(): void {
        this.isFetching = false
        this.positionWithCompetencies = null
        this.competenceModal = {
            mode: 'create',
            isOpen: false,
            competenceId: null,
        }
        this.isFetchingModal = false
        this.isFetchingSigns = false
        this.signs = []
        this.isOpenAddSign = false
        this.isFetchingCreateEditDeleteSign = false
        this.selectedCompetence = null
        this.editSignMode = {
            isOpen: false,
            signId: null,
        }
        this.deleteSignModal = {
            isOpen: false,
            signId: null,
        }
    }
}
