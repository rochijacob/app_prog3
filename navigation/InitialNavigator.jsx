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
    const { setUser, user } = useContext(UserContext)
    const [loadingAuth, setLoadingAuth] = useState(true)

    const handleFirstOpen = async () => {
        const u = await retrieveLocal('user')
        setUser(u)
        const a = await retrieveLocal('auth')
        console.log('auth', a)
        setAuth(a)
    }

    useEffect(() => {
        handleFirstOpen()
        auth.onAuthStateChanged((user) => {
            if (!user) {
                console.log('No auth change')
            } else {
                console.log('authed user', user)
                setUser(auth.currentUser)
                setAuth(true)
                storeLocal('true', 'auth')
            }
            setLoadingAuth(false)
        })
        setLoadingAuth(false)
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