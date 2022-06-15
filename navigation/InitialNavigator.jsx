import React, { useState, useEffect, useContext } from 'react'
import { auth } from '../db/firebaseConfig'
import { retrieveLocal, storeLocal } from '../helpers/localStorage'
import { AuthContext } from '../providers/authContext'
import { UserContext } from '../providers/userContext'
import { Loading } from '../screens/screens'
import AppNavigator from './AppNavigator/AppNavigator'
import LoginNavigator from './LoginNavigator/LoginNavigator'


const InitialNavigator = () => {
    const { authenticate, loading, setAuth } = useContext(AuthContext)
    const { setUser } = useContext(UserContext)
    const [loadingAuth, setLoadingAuth] = useState(true)

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (!user) {
                setAuth(false)
            } else {
                console.log('authed user', user)
                setUser(user)
                storeLocal(user, 'user')
                setAuth(true)
                storeLocal(true, 'auth')
            }
            setLoadingAuth(false)
        })
    }, [])

    if (loading === true || loadingAuth === true) {
        return <Loading />
    }

    if (loading === false && authenticate === false) {
        return <LoginNavigator />
    }

    if (loading === false && authenticate !== false) {
        return <AppNavigator />
    }
}

export default InitialNavigator