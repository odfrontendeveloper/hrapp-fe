import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { me } from 'store'
import { Navigate } from 'react-router-dom'

const RedirectTo = observer(() => {
    const { redirectTo } = me

    useEffect(() => {
        if (redirectTo) {
            me.useredirectTo(null)
        }
    }, [redirectTo])

    return redirectTo ? <Navigate to={redirectTo} /> : null
})

export default RedirectTo
