import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { useStores } from 'store'
import { Box } from '@mui/system'
import { Button, CircularProgress, TextField } from '@mui/material'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { useTranslation } from 'react-i18next'
import { Position } from 'store/positions'
import { changeUserPosition, getPositionsForEditPosition } from 'api/staff'
import { appColor } from 'stylesConfig'

const UpdateUserPosition = observer(({ setOpen }: { setOpen: (value: boolean) => void }): JSX.Element => {
    const { t } = useTranslation()

    const { staff } = useStores()

    const [search, setSearch] = useState<string>('')
    const [newPosition, setNewPosition] = useState<Position | null>(null)

    const { editUserModal, users, editUserPositionList, isFetchingFilters } = staff

    const { hasMore } = editUserPositionList

    const selectedUserInfo = users.find((user) => user.id === staff.editUserModal.userId)

    if (!selectedUserInfo) return <></>

    const { positionInfo } = selectedUserInfo

    useEffect(() => {
        getPositionsForEditPosition({ searchString: search, page: 1 })
    }, [search])

    const handleReset = (): void => {
        if (editUserModal.userId) {
            const data = {
                userId: editUserModal.userId,
                positionId: 0,
            }
            changeUserPosition(data)
        }
    }

    const handleChangePosition = (): void => {
        if (editUserModal.userId && newPosition) {
            const data = {
                userId: editUserModal.userId,
                positionId: newPosition.id,
            }
            changeUserPosition(data)
        }
    }

    return (
        <Box>
            <TextField
                placeholder={t('common.search.name')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                fullWidth
            />
            <Box sx={{ margin: '10px 0px', border: '1px solid silver', height: '150px', overflowY: 'scroll' }}>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {editUserPositionList.results.map((item) => (
                        <ListItem disablePadding key={item.id}>
                            <ListItemButton
                                onClick={() => {
                                    setNewPosition(item)
                                }}
                                disabled={isFetchingFilters}
                            >
                                <ListItemText primary={item.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    {hasMore && (
                        <Button
                            type="button"
                            fullWidth
                            onClick={() => {
                                getPositionsForEditPosition({
                                    searchString: search,
                                    page: staff.editUserPositionList.page + 1,
                                })
                            }}
                        >
                            {t('common.loadmore')}
                        </Button>
                    )}
                </List>
            </Box>
            {!!positionInfo && (
                <Box sx={{ margin: '10px' }}>
                    {t('staff.currentPosition')}:&nbsp;{positionInfo.name}
                </Box>
            )}
            {!!newPosition && (
                <Box sx={{ margin: '10px' }}>
                    {t('staff.newPosition')}:&nbsp;{newPosition.name}
                </Box>
            )}
            <Box sx={{ position: 'relative' }}>
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mb: 2 }}
                    disabled={staff.isFetchingCreateUser || !newPosition}
                    onClick={handleChangePosition}
                >
                    {t('common.save')}
                </Button>
                {staff.isFetchingCreateUser && (
                    <CircularProgress
                        size={24}
                        sx={{
                            color: appColor,
                            position: 'absolute',
                            top: '18px',
                            left: '50%',
                            marginTop: '-12px',
                            marginLeft: '-12px',
                        }}
                    />
                )}
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mb: 2 }}
                    disabled={staff.isFetchingCreateUser || !positionInfo}
                    onClick={handleReset}
                >
                    {t('staff.resetPosition')}
                </Button>
                <Button type="button" fullWidth variant="outlined" onClick={() => setOpen(false)} sx={{ mb: 2 }}>
                    {t('settings.close')}
                </Button>
            </Box>
        </Box>
    )
})

export default UpdateUserPosition
