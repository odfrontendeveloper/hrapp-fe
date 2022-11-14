import { observer } from 'mobx-react'
import React, { useState } from 'react'
import { Box } from '@mui/system'
import Button from '@mui/material/Button'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import { MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material'
import Slider from '@mui/material/Slider'
import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check'
import { useTranslation } from 'react-i18next'
import Percentage from 'CustomComponents/Percentage/Percentage'
import LoadingPage from 'CustomComponents/LoadingPage'
import { useStores } from 'store'
import { createSign } from 'api/forms'
import './styles.scss'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

const marks = [
    {
        value: 0,
        label: '0',
    },
    {
        value: 20,
        label: '20',
    },
    {
        value: 40,
        label: '40',
    },
    {
        value: 60,
        label: '60',
    },
    {
        value: 80,
        label: '80',
    },
    {
        value: 100,
        label: '100',
    },
]

interface ISignSchema {
    id: number
    value: number
    text: string
}

const CreateSign = observer(({ competenceId }: { competenceId: number | null }): JSX.Element => {
    const { t } = useTranslation()
    const { competencies } = useStores()
    const { isFetchingCreateEditDeleteSign } = competencies
    const [signType, setSignType] = useState<'single' | 'multi'>('single')
    const [signText, setSignText] = useState<string>('')
    const [criteria, setCriteria] = useState<ISignSchema[]>([{ id: 1, value: 0, text: '' }])
    const calcSum = criteria.map((item) => item.value).reduce((prev: number, next: number) => prev + next, 0)

    const getMax = () => {
        let value = 0
        criteria.forEach((item) => {
            if (item.value >= value) {
                value = item.value
            }
        })
        return value
    }

    const getClassForField = () => {
        if (signType === 'single') {
            return getMax() === 100 ? 'Green' : 'Yellow'
        }
        return calcSum === 100 ? 'Green' : 'Yellow'
    }

    const onRemoveSign = (signId: number) => {
        setCriteria(criteria.filter((item) => item.id !== signId).map((item, i) => ({ ...item, id: i + 1 })))
    }

    const onChangeValue = (value: number | number[], sign: ISignSchema) => {
        if (typeof value === 'number') {
            let valueToSet = value

            if (signType === 'multi') {
                const calcSumWithoutItem = criteria
                    .filter((item) => item.id !== sign.id)
                    .map((item) => item.value)
                    .reduce((prev: number, next: number) => prev + next, 0)

                const maxAvailableValue = 100 - calcSumWithoutItem

                if (value > maxAvailableValue) {
                    valueToSet = maxAvailableValue
                }
            }

            setCriteria(
                criteria.map((signInfo) => {
                    if (signInfo.id === sign.id) {
                        return { ...signInfo, value: valueToSet }
                    }
                    return signInfo
                })
            )
        }
    }

    const onCreate = (): void => {
        if (competenceId) {
            createSign(competenceId, {
                text: signText,
                type: signType,
                criteria,
            })
        }
    }

    const errors = {
        emptySignText: !signText.length,
        emptyCriteria: criteria.some((item) => !item.text.length),
        wrongCalc: signType === 'multi' ? calcSum !== 100 : getMax() !== 100,
    }

    if (isFetchingCreateEditDeleteSign) return <LoadingPage />

    return (
        <ListItem className="signItem">
            <Box className="signItemBox">
                <Box sx={{ p: '25px' }}>
                    <Box sx={{ paddingBottom: '10px' }}>
                        <Typography variant="h6" sx={{ pb: '10px' }}>
                            {t('forms.sign.create.signType')}
                        </Typography>
                        <Select
                            labelId="choose-active-label"
                            id="demo-simple-select-disabled"
                            sx={{ width: '300px' }}
                            value={signType}
                            onChange={(e, data: any) => {
                                setCriteria(criteria.map((item) => ({ ...item, value: 0 })))
                                setSignType(data.props.value)
                            }}
                            input={<OutlinedInput size="small" />}
                            renderValue={() => t(`forms.sign.create.signTypes.${signType}`)}
                            MenuProps={MenuProps}
                            className="w100"
                        >
                            <MenuItem value={'single'}>
                                <ListItemText primary={t('forms.sign.create.signTypes.single')} />
                            </MenuItem>
                            <MenuItem value={'multi'}>
                                <ListItemText primary={t('forms.sign.create.signTypes.multi')} />
                            </MenuItem>
                        </Select>
                        {signType === 'multi' ? (
                            <ListItemText
                                sx={{ pt: '10px' }}
                                primary={t('forms.sign.create.totalPercentage')}
                                secondary={<Percentage value={calcSum} normal={calcSum === 100} />}
                            />
                        ) : (
                            <ListItemText
                                sx={{ pt: '10px' }}
                                primary={t('forms.sign.create.totalPercentageForSingle')}
                                secondary={<Percentage value={getMax()} normal={getMax() === 100} />}
                            />
                        )}
                    </Box>
                    <Box>
                        <Typography variant="h6">{t('forms.sign.create.signText')}</Typography>
                        <TextField fullWidth value={signText} onChange={(e) => setSignText(e.target.value)} />
                    </Box>
                    {criteria.map((sign) => (
                        <Box key={sign.id} className="signContainer">
                            <Box className="signContainerTitle">
                                <Typography variant="h6" sx={{ p: 1, fontSize: '17px' }}>
                                    {t('forms.sign.create.criterionText')}
                                </Typography>
                                <Box>
                                    <Button
                                        type="button"
                                        variant="outlined"
                                        onClick={() => {
                                            setCriteria(
                                                criteria.map((signItem) => {
                                                    if (sign.id === signItem.id) {
                                                        return {
                                                            ...signItem,
                                                            value: 0,
                                                            text: '',
                                                        }
                                                    }
                                                    return signItem
                                                })
                                            )
                                        }}
                                    >
                                        {t('common.reset')}
                                    </Button>
                                    {criteria.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="outlined"
                                            sx={{ marginLeft: '10px' }}
                                            color="error"
                                            onClick={() => onRemoveSign(sign.id)}
                                        >
                                            {t('common.delete')}
                                        </Button>
                                    )}
                                </Box>
                            </Box>
                            <Box className="flex">
                                <TextField
                                    size="small"
                                    fullWidth
                                    sx={{ marginRight: '15px' }}
                                    value={sign.text}
                                    onChange={(e) =>
                                        setCriteria(
                                            criteria.map((item) =>
                                                item.id === sign.id
                                                    ? {
                                                          ...item,
                                                          text: e.target.value,
                                                      }
                                                    : item
                                            )
                                        )
                                    }
                                />
                                <Typography className={`percentageField percentageField${getClassForField()}`}>
                                    {sign.value + '%'}
                                </Typography>
                            </Box>
                            <Box sx={{ p: 2 }} className="flex">
                                <Box className="sliderContainer">
                                    {signType === 'multi' && (
                                        <div
                                            className="progressBar"
                                            style={{
                                                width: 100 - (calcSum - sign.value) + '%',
                                                backgroundColor: calcSum === 100 ? '#e4ffb9' : '#ffe4b9',
                                            }}
                                        ></div>
                                    )}
                                    <Slider
                                        value={sign.value}
                                        min={0}
                                        max={100}
                                        className="custom-slider"
                                        marks={marks}
                                        onChange={(e, value) => onChangeValue(value, sign)}
                                    />
                                </Box>
                            </Box>
                            <Divider />
                        </Box>
                    ))}
                    <Button
                        sx={{ m: 1 }}
                        type="button"
                        size="small"
                        variant="contained"
                        onClick={() => {
                            setCriteria([...criteria, { id: criteria.length + 1, value: 0, text: '' }])
                        }}
                    >
                        {t('forms.sign.create.addCriterion')}
                    </Button>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '14px' }}>
                        <div className="flexItemsCenter">
                            {errors.emptySignText ? <CloseIcon color="error" /> : <CheckIcon color="success" />}
                            <span>{t('forms.sign.create.error.emptySignText')}</span>
                        </div>
                        <div className="flexItemsCenter">
                            {errors.emptyCriteria ? <CloseIcon color="error" /> : <CheckIcon color="success" />}
                            <span>{t('forms.sign.create.error.emptyCriteria')}</span>
                        </div>
                        <div className="flexItemsCenter">
                            {errors.wrongCalc ? <CloseIcon color="error" /> : <CheckIcon color="success" />}
                            <span>{t('forms.sign.create.error.wrongCalc')}</span>
                        </div>
                    </div>
                    <Button
                        type="button"
                        variant="contained"
                        size="small"
                        disabled={Object.values(errors).some((item) => item)}
                        sx={{ mr: 2 }}
                        onClick={onCreate}
                    >
                        {t('common.create')}
                    </Button>
                </Box>
            </Box>
        </ListItem>
    )
})

export default CreateSign
