import React, { useEffect, useState } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import { Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { getPositionsForFilters } from 'api/positions'
import { useStores } from 'store'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { Roles } from 'store/me'
import { getOrganizationUsers } from 'api/staff'
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

const activeTypes = [
    { name: 'common.active.yes', value: 'yes' },
    { name: 'common.active.no', value: 'no' },
]

const typesSelect = [
    { name: 'common.roles.owner', value: Roles.owner },
    { name: 'common.roles.admin', value: Roles.admin },
    { name: 'common.roles.staff', value: Roles.staff },
]

const StaffFilters = observer((): JSX.Element => {
    const { t } = useTranslation()

    const { staff } = useStores()

    const { filters, isFetchingFilters, selectedActive, selectedTypes, search } = staff

    const { selected, results, hasMore, page } = filters

    const [selectedPositions, setPositions] = useState<number[]>(selected.map((item) => item.id))
    const [active, setActive] = useState<string[]>(selectedActive)
    const [roles, setRoles] = useState<string[]>(selectedTypes)

    const [positionsSearch, setPositionsSearch] = useState<string>('')

    const handleChangePositions = (event: any) => {
        const value: number[] = event.target.value
        setPositions(value)
        getPositionsForFilters({ searchString: positionsSearch, selected: value })
        getOrganizationUsers(search, 1, null, null, value)
    }

    const handleChangeActive = (event: any) => {
        const value: string[] = event.target.value
        staff.setselectedActive(value)
        setActive(value)
        getOrganizationUsers(search, 1, value, null, null)
    }

    const handleChangeRoles = (event: any) => {
        const value: Roles[] = event.target.value
        staff.setselectedTypes(value)
        setRoles(value)
        getOrganizationUsers(search, 1, null, value, null)
    }

    const getSelectedPositions = (): string => {
        const res = selectedPositions
            .map((item: number) => {
                const findPosition = [...results, ...selected].find((el) => el.id === item)
                if (findPosition) return findPosition.name
                return false
            })
            .filter((item) => item)

        if (res.length <= 2) return res.join(', ')
        return [res[0], res[1], `+${res.length - 2}`].join(', ')
    }

    const getSelectedActive = (selected: string[]) => {
        const res = selected
            .map((item) => {
                const getSelectedItem = activeTypes.find((el) => item === el.value)
                if (getSelectedItem) {
                    return `${t(getSelectedItem.name)}`
                } else {
                    return null
                }
            })
            .filter((item) => item)

        if (res.length <= 2) {
            return res.join(', ')
        } else {
            return [res[0], res[1], '+' + (res.length - 2)].join(', ')
        }
    }

    const getSelectedRoles = (selected: string[]) => {
        const res = selected
            .map((item) => {
                const getSelectedItem = typesSelect.find((el) => item === el.value)
                if (getSelectedItem) {
                    return `${t(getSelectedItem.name)}`
                } else {
                    return null
                }
            })
            .filter((item) => item)

        if (res.length <= 2) {
            return res.join(', ')
        } else {
            return [res[0], res[1], '+' + (res.length - 2)].join(', ')
        }
    }

    useEffect(() => {
        getPositionsForFilters({ searchString: positionsSearch, page: 1 })
    }, [positionsSearch])

    return (
        <div>
            <Box>
                <Typography variant="h6" className="filtersTypography">
                    {t('common.positionname')}
                </Typography>
                <FormControl className="filtersFormControl">
                    <TextField
                        size="small"
                        variant="standard"
                        placeholder={t('common.search.default')}
                        className="filtersFormControlSearchField"
                        value={positionsSearch}
                        onChange={(e) => {
                            setPositionsSearch(e.target.value)
                        }}
                    />
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={selectedPositions}
                        onChange={handleChangePositions}
                        input={<OutlinedInput size="small" />}
                        renderValue={getSelectedPositions}
                        MenuProps={MenuProps}
                    >
                        {[...selected, ...results].map((position) => (
                            <MenuItem key={position.id} value={position.id} disabled={isFetchingFilters}>
                                <Checkbox
                                    checked={selectedPositions.includes(position.id)}
                                    disabled={isFetchingFilters}
                                />
                                <ListItemText primary={position.name} />
                            </MenuItem>
                        ))}
                        {hasMore && (
                            <Button
                                type="button"
                                fullWidth
                                onClick={() =>
                                    getPositionsForFilters({
                                        searchString: positionsSearch,
                                        page: page + 1,
                                    })
                                }
                            >
                                {t('common.loadmore')}
                            </Button>
                        )}
                    </Select>
                </FormControl>
            </Box>
            <Box>
                <Typography variant="h6" className="filtersTypography">
                    {t('common.active.title')}
                </Typography>
                <FormControl className="filtersFormControl">
                    <Select
                        multiple
                        value={active}
                        onChange={handleChangeActive}
                        input={<OutlinedInput size="small" />}
                        renderValue={getSelectedActive}
                        MenuProps={MenuProps}
                    >
                        {activeTypes.map((name) => (
                            <MenuItem key={name.value} value={name.value}>
                                <Checkbox checked={active.indexOf(name.value) > -1} />
                                <ListItemText primary={t(name.name)} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box>
                <Typography variant="h6" className="filtersTypography">
                    {t('common.roles.title')}
                </Typography>
                <FormControl className="filtersFormControl">
                    <Select
                        multiple
                        value={roles}
                        onChange={handleChangeRoles}
                        input={<OutlinedInput size="small" />}
                        renderValue={getSelectedRoles}
                        MenuProps={MenuProps}
                    >
                        {typesSelect.map((name) => (
                            <MenuItem key={name.value} value={name.value}>
                                <Checkbox checked={roles.indexOf(name.value) > -1} />
                                <ListItemText primary={t(name.name)} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </div>
    )
})

export default StaffFilters
