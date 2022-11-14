import i18n from 'i18n'
import { toast } from 'react-toastify'
import { competencies, forms } from 'store'
import { Competence, PositionWithCompetencies, Sign } from 'store/competencies'
import { FormCompetence, FormTemplate } from 'store/forms'
import { Position, PositionsPaginate } from 'store/positions'
import { handleError } from 'tools/api'
import { handleResponse, securedfetch } from 'tools/login'
import {
    createPositionCompetenceUrl,
    createSignUrl,
    deletePositionCompetenceUrl,
    deleteSignUrl,
    editPositionCompetenceUrl,
    editSignUrl,
    getCompetenceSignsUrl,
    getPositionCompetenciesUrl,
    templatesUrl,
    positionsUrl,
    editTemplateUrl,
    editTemplateConnectionUrl,
} from './urls'

export interface ICreateSignBody {
    text: string
    type: 'single' | 'multi'
    criteria: {
        value: number
        text: string
    }[]
}

export interface IEditSignBody {
    id: number
    text: string
    type: 'single' | 'multi'
    criteria: {
        id: number | string
        value: number
        text: string
    }[]
}

export const getPositionsForForms = (searchString: string, page: number): void => {
    forms.setpositionsPagination({
        ...forms.positionsPagination,
        page,
    })
    forms.setisFetchingPositions(true)
    forms.setpositions([])
    securedfetch
        .get(positionsUrl(), { searchString, page })
        .then(handleResponse)
        .then(({ results, pagination }: { results: Position[]; pagination: PositionsPaginate }) => {
            forms.setisFetchingPositions(false)
            forms.setpositions(results)
            forms.setpositionsPagination(pagination)
        })
        .catch((error) => {
            forms.setisFetchingPositions(false)
            handleError(error.message)
        })
}

export const getPositionCompetencies = (id: number) => {
    competencies.setCompetencies(null)
    competencies.setIsFetching(true)
    securedfetch
        .get(getPositionCompetenciesUrl(id))
        .then(handleResponse)
        .then((data: PositionWithCompetencies) => {
            if (id === forms.selectedPosition) {
                competencies.setCompetencies(data)
            }
            competencies.setIsFetching(false)
        })
        .catch((error) => {
            competencies.setIsFetching(false)
            handleError(error.message)
        })
}

export const createPositionCompetence = (name: string) => {
    if (forms.selectedPosition) {
        competencies.setIsFetchingModal(true)
        securedfetch
            .post(createPositionCompetenceUrl(), {
                name,
                positionId: forms.selectedPosition,
            })
            .then(handleResponse)
            .then((data: Competence) => {
                competencies.createCompetence(data)
                competencies.closeModal()
                competencies.setIsFetchingModal(false)
                const msg = i18n.t('forms.success.create')
                toast.success(msg)
            })
            .catch((error) => {
                handleError(error.message)
                competencies.setIsFetchingModal(false)
            })
    }
}

export const editPositionCompetence = (name: string, competenceId: number) => {
    if (forms.selectedPosition) {
        competencies.setIsFetchingModal(true)
        securedfetch
            .put(editPositionCompetenceUrl(), {
                name,
                competenceId,
            })
            .then(handleResponse)
            .then((data: Competence) => {
                competencies.editCompetence(data)
                competencies.closeModal()
                competencies.setIsFetchingModal(false)
                const msg = i18n.t('forms.success.edit')
                toast.success(msg)
            })
            .catch((error) => {
                handleError(error.message)
                competencies.setIsFetchingModal(false)
            })
    }
}

export const deletePositionCompetence = (competenceId: number) => {
    if (forms.selectedPosition) {
        competencies.setIsFetchingModal(true)
        securedfetch
            .delete(deletePositionCompetenceUrl(competenceId))
            .then(handleResponse)
            .then((data: { id: number }) => {
                if (competencies.selectedCompetence === data.id) {
                    competencies.setselectedCompetence(null)
                }
                competencies.deleteCompetence(data.id)
                competencies.closeModal()
                competencies.setIsFetchingModal(false)
                const msg = i18n.t('forms.success.delete')
                toast.success(msg)
            })
            .catch((error) => {
                handleError(error.message)
                competencies.setIsFetchingModal(false)
            })
    }
}

export const getCompetenceSigns = (id: number): void => {
    competencies.setIsFetchingSigns(true)
    competencies.setSigns([])
    securedfetch
        .get(getCompetenceSignsUrl(id))
        .then(handleResponse)
        .then((data: Sign[]) => {
            competencies.setIsFetchingSigns(false)
            if (id === competencies.selectedCompetence) {
                competencies.setSigns(data)
            }
        })
        .catch((error) => {
            competencies.setIsFetchingSigns(false)
            handleError(error.message)
        })
}

export const createSign = (id: number, data: ICreateSignBody): void => {
    data.criteria = data.criteria.map((item) => ({ text: item.text, value: item.value }))
    competencies.setisFetchingCreateEditDeleteSign(true)
    securedfetch
        .post(createSignUrl(id), data)
        .then(handleResponse)
        .then((data: Sign) => {
            const msg = i18n.t('forms.sign.create.success')
            toast.success(msg)
            competencies.setisFetchingCreateEditDeleteSign(false)
            if (id === competencies.selectedCompetence) {
                competencies.addSign(data)
            }
            competencies.setIsOpenAddSign(false)
        })
        .catch((error) => {
            competencies.setisFetchingCreateEditDeleteSign(false)
            handleError(error.message)
        })
}

export const editSign = (id: number, data: IEditSignBody): void => {
    data.criteria = data.criteria.map((item) => ({ ...item, text: item.text, value: item.value }))
    competencies.setisFetchingCreateEditDeleteSign(true)
    securedfetch
        .put(editSignUrl(id), data)
        .then(handleResponse)
        .then((data: Sign) => {
            const msg = i18n.t('forms.sign.edit.success')
            toast.success(msg)
            competencies.setisFetchingCreateEditDeleteSign(false)
            competencies.setEditSignMode({
                isOpen: false,
                signId: null,
            })
            competencies.editSign(data)
        })
        .catch((error) => {
            competencies.setisFetchingCreateEditDeleteSign(false)
            handleError(error.message)
        })
}

export const deleteSign = (id: number): void => {
    competencies.setisFetchingCreateEditDeleteSign(true)
    securedfetch
        .delete(deleteSignUrl(id))
        .then(handleResponse)
        .then((data: { id: number }) => {
            const msg = i18n.t('forms.sign.success.delete')
            toast.success(msg)
            competencies.setisFetchingCreateEditDeleteSign(false)
            competencies.deleteSign(data.id)
            competencies.closeDeleteSignModal()
        })
        .catch((error) => {
            competencies.setisFetchingCreateEditDeleteSign(false)
            handleError(error.message)
        })
}

export const getTemplates = (id: number): void => {
    forms.seIsFetchingTemplates(true)
    forms.setTemplates([])
    forms.setConnections([])
    securedfetch
        .get(templatesUrl(id))
        .then(handleResponse)
        .then((data: { templates: FormTemplate[]; connections: FormCompetence[] }) => {
            forms.seIsFetchingTemplates(false)
            if (id === forms.selectedPosition) {
                forms.setTemplates(data.templates)
                forms.setConnections(data.connections)
            }
        })
        .catch((error) => {
            forms.seIsFetchingTemplates(false)
            handleError(error.message)
        })
}

export const createTemplate = (id: number, data: { name: string }): void => {
    forms.setIsFetchingCreateTemplate(true)
    securedfetch
        .post(templatesUrl(id), data)
        .then(handleResponse)
        .then((res: FormTemplate) => {
            const msg = i18n.t('forms.forms.success.create')
            toast.success(msg)
            forms.setIsFetchingCreateTemplate(false)
            forms.setIsOpenCreateTemplate(false)
            if (id === forms.selectedPosition) {
                forms.addTemplate(res)
            }
        })
        .catch((error) => {
            forms.setIsFetchingCreateTemplate(false)
            handleError(error.message)
        })
}

export const editTemplate = (id: number, templateId: number, data: { name: string }): void => {
    forms.setIsFetchingCreateTemplate(true)
    securedfetch
        .put(editTemplateUrl(id, templateId), data)
        .then(handleResponse)
        .then((res: FormTemplate) => {
            const msg = i18n.t('forms.forms.success.edit')
            toast.success(msg)
            forms.setIsFetchingCreateTemplate(false)
            forms.closeEditModal()
            if (id === forms.selectedPosition) {
                forms.editTemplate(res)
            }
        })
        .catch((error) => {
            forms.setIsFetchingCreateTemplate(false)
            handleError(error.message)
        })
}

export const deleteTemplate = (id: number): void => {
    forms.setIsFetchingCreateTemplate(true)
    securedfetch
        .delete(templatesUrl(id))
        .then(handleResponse)
        .then((res: { id: number }) => {
            const msg = i18n.t('forms.forms.success.delete')
            toast.success(msg)
            forms.setIsFetchingCreateTemplate(false)
            forms.closeDeleteModal()
            forms.deleteTemplate(res.id)
        })
        .catch((error) => {
            forms.setIsFetchingCreateTemplate(false)
            handleError(error.message)
        })
}

export const editTemplateConnection = (template: number, competence: number, position: number): void => {
    forms.setIsFetchingEditConnection({
        isFetching: true,
        template,
        competence,
    })
    securedfetch
        .put(editTemplateConnectionUrl(), {}, { templateId: template, competenceId: competence })
        .then(handleResponse)
        .then(
            (
                data:
                    | {
                          mode: 'create'
                          data: FormCompetence
                      }
                    | {
                          mode: 'delete'
                          data: { id: number }
                      }
            ) => {
                forms.setIsFetchingEditConnection({
                    isFetching: false,
                    template: null,
                    competence: null,
                })
                if (position === forms.selectedPosition) {
                    if (data.mode === 'create') {
                        forms.addConnection(data.data)
                    }
                    if (data.mode === 'delete') {
                        forms.deleteConnection(data.data.id)
                    }
                }
            }
        )
        .catch((error) => {
            forms.setIsFetchingEditConnection({
                isFetching: false,
                template: null,
                competence: null,
            })
            handleError(error.message)
        })
}
