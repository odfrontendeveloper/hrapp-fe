import React from 'react'
import { Me } from './me'
import { Settings } from './settings'
import { Staff } from './staff'
import { Positions } from './positions'
import { Forms } from './forms'
import { Competencies } from './competencies'
import { Sessions } from './sessions'

interface IRootStore {
    me: Me
    settings: Settings
    staff: Staff
    positions: Positions
    forms: Forms
    competencies: Competencies
    sessions: Sessions
}

const RootStoreContext = React.createContext<IRootStore>({} as IRootStore)

export const me = new Me()
export const settings = new Settings()
export const staff = new Staff()
export const positions = new Positions()
export const forms = new Forms()
export const competencies = new Competencies()
export const sessions = new Sessions()

export const RootStoreProvider = ({ children }: React.PropsWithChildren<{}>): JSX.Element => {
    return (
        <RootStoreContext.Provider
            value={{
                me,
                settings,
                staff,
                positions,
                forms,
                competencies,
                sessions,
            }}
        >
            {children}
        </RootStoreContext.Provider>
    )
}

export const useStores = (): IRootStore => React.useContext(RootStoreContext)
