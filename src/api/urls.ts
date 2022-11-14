const baseUrl = 'http://localhost:8080'

export const signInUrl = () => `${baseUrl}/auth`
export const signUpUrl = () => `${baseUrl}/signup`

// profile and staff
export const profileUrl = () => `${baseUrl}/users/profile`
export const passwordUrl = () => `${baseUrl}/users/password`
export const createUserUrl = () => `${baseUrl}/users/createUser`
export const adminUsersUrl = () => `${baseUrl}/users/adminUsers`
export const updateUserPasswordUrl = () => `${baseUrl}/users/staff/password`
export const updateUserProfileUrl = () => `${baseUrl}/users/staff/profile`
export const updateUserTypeUrl = () => `${baseUrl}/users/staff/type`
export const updateUserPermissionsUrl = () => `${baseUrl}/users/staff/permissions`
export const updateUserPositionUrl = () => `${baseUrl}/users/staff/position`
export const deleteUserUrl = () => `${baseUrl}/users/staff/delete`

// positions
export const positionsUrl = () => `${baseUrl}/positions`
export const positionsFiltersUrl = () => `${baseUrl}/positions/filters`
export const positionIdUrl = (id: number) => `${baseUrl}/positions/${id}`

// competencies
export const getPositionCompetenciesUrl = (id: number) => `${baseUrl}/competencies/position/${id}`
export const createPositionCompetenceUrl = () => `${baseUrl}/competencies/position/create`
export const editPositionCompetenceUrl = () => `${baseUrl}/competencies/position/edit`
export const deletePositionCompetenceUrl = (id: number) => `${baseUrl}/competencies/position/${id}`

// signs and sign
export const getCompetenceSignsUrl = (id: number) => `${baseUrl}/competencies/competence/${id}/signs`
export const createSignUrl = (id: number) => `${baseUrl}/competencies/competence/${id}/createSign`
export const editSignUrl = (id: number) => `${baseUrl}/competencies/competence/${id}/editSign`
export const deleteSignUrl = (id: number) => `${baseUrl}/competencies/sign/${id}/deleteSign`

// forms
export const templatesUrl = (id: number) => `${baseUrl}/templates/${id}`
export const editTemplateUrl = (id: number, templateId: number) => `${baseUrl}/templates/${id}/edit/${templateId}`
export const editTemplateConnectionUrl = () => `${baseUrl}/templates/connection`

// sessions
export const getUsersForSessionUrl = () => `${baseUrl}/sessions/users`
export const getFormsForSessionUrl = (id: number) => `${baseUrl}/sessions/forms/${id}`
export const createSessionUrl = () => `${baseUrl}/sessions/create`
export const getSessionsUrl = () => `${baseUrl}/sessions`
export const editSessionUrl = (id: number) => `${baseUrl}/sessions/session/${id}`
export const getUserInvitationsUrl = () => `${baseUrl}/sessions/invitations`
export const getUserInvitationUrl = (id: string) => `${baseUrl}/sessions/invitations/${id}`
export const sendFormUrl = () => `${baseUrl}/sessions/sendform`
export const getSessionDetailsUrl = (id: string) => `${baseUrl}/sessions/details/${id}`
