import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { Box, CircularProgress, TextField } from '@mui/material'
import { uniqBy } from 'lodash'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import AddUsersToSession from './AddUsersToSession'
import { ISessionUserSelect } from 'store/sessions'
import { createSession, ICreateSession } from 'api/sessions'
import { sessions } from 'store'
import { appColor } from 'stylesConfig'

export interface IAssessmentItem {
    id: string
    userFrom: {
        id: string
        data: ISessionUserSelect | null
    }
    userTo: {
        id: string
        data: ISessionUserSelect | null
    }
    form: {
        id: number
        name: string
    } | null
}

const CreateSessionName = ({
    name,
    setName,
}: // assessmentConnections,
// setassessmentConnections,
{
    name: string
    setName: React.Dispatch<React.SetStateAction<string>>
    assessmentConnections: IAssessmentItem[]
    setassessmentConnections: React.Dispatch<React.SetStateAction<IAssessmentItem[]>>
}): JSX.Element => {
    return (
        <TextField
            style={{ width: '300px' }}
            className="searchField"
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
    )
}

const steps = [
    {
        label: 'sessions.steps.step1.form',
        description: null,
        component: CreateSessionName,
    },
    {
        label: 'sessions.steps.step2.title',
        description: null,
        component: AddUsersToSession,
    },
]

const CreateSession = observer((): JSX.Element => {
    const { t } = useTranslation()

    const [activeStep, setActiveStep] = useState<number>(0)

    const [assessmentConnections, setassessmentConnections] = useState<IAssessmentItem[]>([])

    const [name, setName] = useState<string>('')

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const disabledRules = {
        step1: !!name,
        step2:
            assessmentConnections.length &&
            assessmentConnections.every((item) => !!item.form && !!item.userFrom.data && !!item.userTo.data),
    }

    const getKey = (i: number): 'step1' | 'step2' => {
        switch (i) {
            case 1:
                return 'step1'
            case 2:
                return 'step2'
            default:
                return 'step2'
        }
    }

    const createNewSession = () => {
        const newSessionData: ICreateSession = {
            name,
            invitations: [],
        }

        assessmentConnections.forEach((conn: IAssessmentItem) => {
            if (conn.userFrom.data && conn.userTo.data && conn.form?.id) {
                newSessionData.invitations.push({
                    key: `${conn.userFrom.data?.id}-${conn.userTo.data?.id}-${conn.form?.id}`,
                    appraiserId: conn.userFrom.data?.id,
                    assessedEmployeeId: conn.userTo.data?.id,
                    formId: conn.form?.id,
                })
            }
        })

        newSessionData.invitations = uniqBy(newSessionData.invitations, 'key')

        createSession(newSessionData)
    }

    if (sessions.isFetchingCreateSession) {
        return (
            <CircularProgress
                size={64}
                sx={{
                    color: appColor,
                }}
            />
        )
    }

    return (
        <Box style={{ width: '100%' }}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel optional={index === 2 ? <Typography variant="caption">Last step</Typography> : null}>
                            {t(step.label)}
                        </StepLabel>
                        <StepContent>
                            {!!step.description && <Typography>{step.description}</Typography>}
                            {!!step.component && (
                                <step.component
                                    assessmentConnections={assessmentConnections}
                                    setassessmentConnections={setassessmentConnections}
                                    name={name}
                                    setName={setName}
                                />
                            )}
                            <Box sx={{ mb: 2 }}>
                                <div>
                                    <Button
                                        variant="contained"
                                        onClick={index > 0 ? createNewSession : handleNext}
                                        sx={{ mt: 1, mr: 1 }}
                                        disabled={!disabledRules[getKey(index + 1)]}
                                    >
                                        {index === steps.length - 1
                                            ? t('sessions.createSession')
                                            : t('common.continue')}
                                    </Button>
                                    <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                                        {t('common.back')}
                                    </Button>
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </Box>
    )
})

export default CreateSession
