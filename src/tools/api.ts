import { logout } from 'api/login'
import i18n from 'i18n'
import { toast } from 'react-toastify'
import * as constants from 'tools/constants'

export const handleError = (msg: string): void => {
    let message: string = ''
    switch (msg) {
        case constants.INCORRECT_PASSWORD:
            message = i18n.t('common.errors.incorrectpassword')
            break
        case constants.UNAUTHORIZED:
            message = i18n.t('common.errors.unauthorized')
            break
        case constants.FORBIDDEN:
            message = i18n.t('common.errors.forbidden')
            break
        case constants.INCORRECT_DATA:
            message = i18n.t('common.errors.incorrectdata')
            break
        case constants.USER_NOT_FOUND:
            message = i18n.t('common.errors.usernotfound')
            break
        case constants.USER_EXISTS:
            message = i18n.t('common.errors.userexists')
            break
        case constants.POSITION_NOT_FOUND:
            message = i18n.t('common.errors.positionnotfound')
            break
        case constants.POSITION_NAME_EXISTS:
            message = i18n.t('common.errors.positionexists')
            break
        case constants.POSITION_DELETE_BIND_USER_ERROR:
            message = i18n.t('common.errors.positionDeleteUserBindError')
            break
        case constants.COMPETENCE_NOT_FOUND:
            message = i18n.t('common.errors.competenceNotFound')
            break
        case constants.TEMPLATE_NOT_FOUND:
            message = i18n.t('common.errors.templateNotFound')
            break
        case constants.SIGN_NOT_FOUND:
            message = i18n.t('common.errors.signNotFound')
            break
        case constants.INVALID_FORM_TEMPLATE:
            message = i18n.t('common.errors.invalidform')
            break
        default:
            message = i18n.t('common.errors.default')
    }
    toast.error(message)
    if (msg === constants.UNAUTHORIZED) {
        logout()
    }
}
