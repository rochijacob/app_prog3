import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { auth, db } from '../db/firebaseConfig'
import Toast from 'react-native-toast-message';
import { UserContext } from '../providers/userContext';
import { AuthContext } from '../providers/authContext';
import { removeLocal, storeLocal } from '../helpers/localStorage';
import { useToast } from 'native-base';

export default function useFirebase() {
    const { user, setUser, setPosts, posts } = useContext(UserContext)
    const { setAuth } = useContext(AuthContext)
    const toast = useToast()


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
            })
            .catch(error => {
                console.log(error);
                toast.show({
                    description: error.message,
                    placement: 'top'
                })
            })
    }

    const loginUser = (data) => {
        auth.signInWithEmailAndPassword(data.email, data.password)
            .then(response => {
                console.log('success', response.user)
            }).catch(e => {
                console.log(e)
                toast.show({
                    description: e.message,
                    placement: 'top'
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
        removeLocal('user')
        removeLocal('auth')
        setAuth(false)
    }

    const submitPost = (data) => {
        db.collection('posts').add({
            owner: auth.currentUser.email, //autenticacion del ususario
            title: data.titulo,
            description: data.description,
            likes: [],
            comments: [],
            createdAt: Date.now(),
            photo: data.image,
        }).catch((error) => {
            console.log('No se pudo crear')
        })
        setPosts([...posts, data])
    }

    return {
        registerUser,
        loginUser,
        logoutUser,
        submitPost
    }
}