import React from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import MailIcon from '@mui/icons-material/Mail'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import WorkIcon from '@mui/icons-material/Work'
import SettingsIcon from '@mui/icons-material/Settings'
import BookIcon from '@mui/icons-material/Book'
import AssessmentIcon from '@mui/icons-material/Assessment'
import LogoutIcon from '@mui/icons-material/Logout'
import { observer } from 'mobx-react'
import Drawer from './components/Drawer'
import DrawerHeader from './components/DrawerHeader'
import AppBar from './components/AppBar'
import { logout } from 'api/login'
import ListElement from './components/ListElement'
import Profile from 'components/Profile/Profile'
import Settings from 'components/Settings/Settings'
import { appColor } from 'stylesConfig'
import Staff from 'components/Staff/Staff'
import StaffHeader from 'components/HeaderBars/StaffHeader'
import PositionsHeader from 'components/HeaderBars/PositionsHeader'
import Positions from 'components/positions/Positions'
import Forms from 'components/Forms/Forms'
import FormsHeader from 'components/HeaderBars/FormsHeader'
import Competencies from 'components/Competencies/Competencies'
import CompetenciesHeader from 'components/HeaderBars/CompetenciesHeader'
import FormsSettings from 'components/FormsSettings/FormsSettings'
import FormsSettingsHeader from 'components/HeaderBars/FormsSettingsHeader'
import Sessions from 'components/Sessions/Sessions'
import SessionsHeader from 'components/HeaderBars/SessionsHeader'
import CreateSession from 'components/Sessions/CreateSession'
import CreateSessionHeader from 'components/HeaderBars/CreateSessionHeader'
import Invitations from 'components/Invitations/Invitations'
import InvitationHeader from 'components/HeaderBars/InvitationHeader'
import DefaultHeader from 'components/HeaderBars/DefaultHeader'
import Invitation from 'components/Invitations/Invitation'
import { useStores } from 'store'
import { Permissions } from 'store/staff'
import SessionDetailsHeader from 'components/HeaderBars/SessionDetailsHeader'
import Details from 'components/Sessions/Details'
import DetailsForm from 'components/Sessions/DetailsForm'
import SessionDetailsFormHeader from 'components/HeaderBars/SessionDetailsFormHeader'

const Home = observer((): JSX.Element => {
    const theme = useTheme()
    const location = useLocation()
    const [open, setOpen] = React.useState<boolean>(false)
    const [redirectLogin, setRedirectLogin] = React.useState<boolean>(false)

    const { me } = useStores()

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    const getSX = (path: string): any => {
        if (location.pathname.indexOf(path) !== -1) {
            return {
                color: appColor,
            }
        }
        return {}
    }

    const menu = [
        {
            text: 'profile',
            icon: <AccountCircleIcon sx={getSX('/home/profile')} />,
            link: '/home/profile',
        },
        me.myPermissions?.includes(Permissions.can_manage_staff)
            ? {
                  text: 'staff',
                  icon: <AssignmentIndIcon sx={getSX('/home/staff')} />,
                  link: '/home/staff',
              }
            : null,
        me.myPermissions?.includes(Permissions.can_manage_forms)
            ? {
                  text: 'workpositions',
                  icon: <WorkIcon sx={getSX('/home/workpositions')} />,
                  link: '/home/workpositions',
              }
            : null,
        me.myPermissions?.includes(Permissions.can_manage_forms)
            ? {
                  text: 'forms',
                  icon: <BookIcon sx={getSX('/home/forms')} />,
                  link: '/home/forms',
              }
            : null,
        me.myPermissions?.includes(Permissions.can_manage_assessments)
            ? {
                  text: 'sessions',
                  icon: <AssessmentIcon sx={getSX('/home/sessions')} />,
                  link: '/home/sessions',
              }
            : null,
        {
            text: 'invitations',
            icon: <MailIcon sx={getSX('/home/invitations')} />,
            link: '/home/invitations',
        },
        {
            text: 'settings',
            icon: <SettingsIcon sx={getSX('/home/settings')} />,
            link: '/home/settings',
        },
    ].filter((item) => item)

    if (redirectLogin) {
        return <Navigate to="/login" />
    }

    return (
        <Box className="flex">
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Routes>
                        <Route path="/staff" element={<StaffHeader />} />
                        <Route path="/workpositions" element={<PositionsHeader />} />
                        <Route path="/forms" element={<FormsHeader />} />
                        <Route path="/forms/:positionId" element={<CompetenciesHeader />} />
                        <Route path="/forms/:positionId/competence/:competenceId" element={<CompetenciesHeader />} />
                        <Route path="/formssettings/:positionId" element={<FormsSettingsHeader />} />
                        <Route path="/sessions" element={<SessionsHeader />} />
                        <Route path="/sessions/:sessionId" element={<SessionDetailsHeader />} />
                        <Route path="/sessions/:sessionId/details/:id" element={<SessionDetailsFormHeader />} />
                        <Route path="/sessions/create" element={<CreateSessionHeader />} />
                        <Route path="/invitations/:id" element={<InvitationHeader />} />
                        <Route path="*" element={<DefaultHeader />} />
                    </Routes>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {menu.map((item) =>
                        item ? (
                            <Link
                                to={item.link}
                                key={item.text}
                                style={{ textDecoration: 'none', color: 'rgb(33, 33, 33)' }}
                            >
                                <ListElement item={item} open={open} />
                            </Link>
                        ) : null
                    )}
                    <Divider />
                    <ListElement
                        item={{ text: 'logout', icon: <LogoutIcon /> }}
                        open={open}
                        onClick={() => {
                            setRedirectLogin(true)
                            logout()
                        }}
                    />
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Routes>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/staff" element={<Staff />} />
                    <Route path="/workpositions" element={<Positions />} />
                    <Route path="/forms" element={<Forms />} />
                    <Route path="/forms/:positionId//*" element={<Competencies />} />
                    <Route path="/formssettings/:positionId//*" element={<FormsSettings />} />
                    <Route path="/sessions" element={<Sessions />} />
                    <Route path="/sessions/:sessionId" element={<Details />} />
                    <Route path="/sessions/:sessionId/details/:id" element={<DetailsForm />} />
                    <Route path="/sessions/create" element={<CreateSession />} />
                    <Route path="/invitations" element={<Invitations />} />
                    <Route path="/invitations/:id" element={<Invitation />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </Box>
        </Box>
    )
})

export default Home
