import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { auth, db } from '../db/firebaseConfig'
import Toast from 'react-native-toast-message';
import { UserContext } from '../providers/userContext';
import { AuthContext } from '../providers/authContext';
import { storeLocal } from '../helpers/localStorage';

export default function useFirebase() {
    const { user, setUser } = useContext(UserContext)
    const { setAuth } = useContext(AuthContext)
    const registerUser = (data) => {
        auth.createUserWithEmailAndPassword(data.email, data.password)
            .then(responseRegister => {
                console.log('user Created', responseRegister);
                responseRegister.user.updateProfile({
                    displayName: data.name
                })
                db.collection('users').add({
                    email: data.email,
                    displayName: data.user,
                    createdAt: Date.now()
                })
                let user = {
                    name: data.name,
                    email: data.email,
                }
                setUser(user)
                storeLocal(user, 'user')
                setAuth(true)
                storeLocal(true, 'auth')
            })
            .catch(error => {
                console.log(error);
                Toast.show({
                    type: 'error',
                    text1: error.message
                })
            })
    }

    const loginUser = (data) => {
        auth.signInWithEmailAndPassword(data.email, data.password)
            .then(response => {
                console.log('success', response.user)
                let user = {
                    name: response.user.displayName,
                    email: response.user.email,
                }
                setUser(user)
                storeLocal(user, 'user')
                setAuth(true)
                storeLocal(true, 'auth')
                console.log(user)
            }).catch(e => {
                console.log(e)
                Toast.show({
                    type: 'error',
                    text1: e.message
                })
            })
    }

    const logoutUser = () => {
        auth.signOut()
            .then((res) => {
                setUser(false)
                setAuth(false)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return {
        registerUser,
        loginUser,
        logoutUser
    }
}