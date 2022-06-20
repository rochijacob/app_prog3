import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { auth, db } from '../db/firebaseConfig'
import firebase from 'firebase';
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
    }

    const fetchPosts = () => {
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
            (docs) => {
                let posts = [];
                docs.forEach(post => {
                    posts.push({
                        id: post.id,
                        data: post.data()
                    })
                })
                setPosts(posts)
            }
        );
    }

    const deletePost = (postId) => {
        db.collection('posts')
            .doc(postId)
            .delete()
    }

    const likePost = (postId) => {
        console.log('Like Post')
        db.collection('posts')
            .doc(postId)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then(() => {
                const pst = posts.map(post => {
                    if (post.id === postId) {
                        if (post.data.likes.length > 0) {
                            post.data.likes = [auth.currentUser.email, ...post.data.likes]
                        } else {
                            post.data.likes = [auth.currentUser.email]
                        }
                    }
                    return post
                })
                setPosts(pst)
            })
            .catch((error) => console.log(error))
    }

    const unLikePost = (postId) => {
        console.log('Unlike Post')
        db.collection('posts')
            .doc(postId)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then(() => {
                const pst = posts.map(post => {
                    if (post.id === postId) {
                        post.data.likes = post.data.likes.filter(value => value !== auth.currentUser.email)
                    }
                    return post
                })
                setPosts(pst)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const postComment = (comment, postId) => {
        console.log('Post Comment')
        if (comment === '') {
            return
        }
        db.collection('posts')
            .doc(postId)
            .update({
                comments: firebase.firestore.FieldValue.arrayUnion({
                    owner: auth.currentUser.email,
                    text: comment,
                    createdAt: Date.now()
                })
            })
            .then(() => {
                const pst = posts.map(post => {
                    if (post.id === postId) {
                        if (post.data.comments.length > 0) {
                            post.data.comments = [{
                                owner: auth.currentUser.email,
                                text: comment,
                                createdAt: Date.now()
                            }, ...post.data.comments]
                        } else {
                            post.data.comments = [{
                                owner: auth.currentUser.email,
                                text: comment,
                                createdAt: Date.now()
                            }]
                        }
                    }
                    return post
                })
                setPosts(pst)
            })
            .catch(error => console.log(error))
    }

    const deleteComment = (created, postId) => {
        const post = posts.filter((element) => element.id === postId)
        console.log(post[0])

        const filterComments = post[0].data.comments.filter((element) => element.createdAt !== created)


        const pst = posts.map(post => {
            if (post.id === postId) {
                post.data.comments = filterComments
            }
            return post
        })
        setPosts(pst)

        db.collection('posts')
            .doc(postId)
            .update({
                comments: filterComments
            })
            .catch((error) => console.log(error))
    }

    return {
        registerUser,
        loginUser,
        logoutUser,
        submitPost,
        fetchPosts,
        likePost,
        unLikePost,
        postComment,
        deleteComment,
        deletePost
    }
}