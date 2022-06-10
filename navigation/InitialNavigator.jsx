import React, { useState, useEffect } from 'react'
import { Loading } from '../screens/screens'
import AppNavigator from './AppNavigator/AppNavigator'
import LoginNavigator from './LoginNavigator/LoginNavigator'


const InitialNavigator = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [validated, setValidated] = useState(false)

    const handleFirstOpen = async () => {
        //Search Token
        //Search Validation
        //Search profile
        //Load
    }

    useEffect(() => {
        handleFirstOpen()
    }, [])

    if (isLoading === true) {
        return <Loading />
    }

    if (isLoading === false && validated === false) {
        return <LoginNavigator />
    }

    if (isLoading === false && validated !== false) {
        return <AppNavigator />
    }
}

export default InitialNavigator