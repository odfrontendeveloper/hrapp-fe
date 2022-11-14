import React from 'react'
import { Button, Card } from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar'
import BlockIcon from '@mui/icons-material/Block'
import Typography from '@mui/material/Typography'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import PushPinIcon from '@mui/icons-material/PushPin'
import { red } from '@mui/material/colors'
import { useTranslation } from 'react-i18next'
import { OrganizationUser } from 'store/staff'
import { useStores } from 'store'
import { Roles } from 'store/me'

interface IUserCard {
    item: OrganizationUser
}

const UserCard = ({ item }: IUserCard): JSX.Element => {
    const { t } = useTranslation()
    const { staff } = useStores()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleOpenModal = (mode: 'password' | 'profile' | 'type' | 'permissions' | 'position' | 'delete') => {
        handleClose()
        staff.setUserModal({
            isOpen: true,
            mode,
            userId: item.id,
        })
    }

    return (
        <Card sx={{ minWidth: 345, maxWidth: 345, m: 2 }} key={item.id}>
            <CardHeader
                avatar={
                    item.isActive ? <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"></Avatar> : <BlockIcon />
                }
                title={
                    <span>
                        <span>{`${item.firstname} ${item.middlename} ${item.lastname}`}</span>
                        {item.type === Roles.owner && (
                            <span>
                                <PushPinIcon sx={{ height: '14px' }} />
                            </span>
                        )}
                    </span>
                }
                subheader={item.email}
                sx={{
                    opacity: item.isActive ? 1 : 0.6,
                    background: item.type === Roles.owner ? '#abe6ff' : item.isActive ? '#f5f5f5' : '#fce1e1',
                }}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                    {t('staff.position')}:
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ paddingBottom: '25px' }}>
                    {item.positionInfo?.name || '-'}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                    {t('common.roles.title')}:
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ paddingBottom: '25px' }}>
                    {t(`common.roles.${item.type}`)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                    {t('common.active.title')}:
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ paddingBottom: '25px', display: 'flex', alignItems: 'center' }}
                >
                    {t(`common.active.${item.isActive ? 'yes' : 'no'}`)}
                    {item.isActive ? <CheckIcon color="success" /> : <CloseIcon color="error" />}
                </Typography>
            </CardContent>
            <CardActions
                disableSpacing
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    background: '#f5f5f5',
                }}
            >
                <div>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        {t('common.edit')}
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {item.type !== Roles.owner && (
                            <>
                                <MenuItem onClick={() => handleOpenModal('password')}>
                                    {t('staff.userEdit.password')}
                                </MenuItem>
                                <MenuItem onClick={() => handleOpenModal('profile')}>
                                    {t('staff.userEdit.profile')}
                                </MenuItem>
                                <MenuItem onClick={() => handleOpenModal('type')}>{t('staff.userEdit.role')}</MenuItem>
                                {item.type === Roles.admin && (
                                    <MenuItem onClick={() => handleOpenModal('permissions')}>
                                        {t('staff.userEdit.permissions')}
                                    </MenuItem>
                                )}
                            </>
                        )}
                        <MenuItem onClick={() => handleOpenModal('position')}>{t('staff.userEdit.position')}</MenuItem>
                    </Menu>
                </div>
                {item.type !== Roles.owner && (
                    <Button type="button" color="error" onClick={() => handleOpenModal('delete')}>
                        {t('common.delete')}
                    </Button>
                )}
            </CardActions>
        </Card>
    )
}

export default UserCard
