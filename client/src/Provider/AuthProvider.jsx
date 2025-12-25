import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import axios from 'axios';
import { auth } from '../Firebase/firebase.config';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()
    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider)
    }
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const updateUser = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData)
    }
    useEffect(() => {

        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
            if (currentUser?.email) {
                const userData = { email: currentUser.email }
                axios.post('http://localhost:3000/jwt', userData, {
                    withCredentials: true
                })
                    .then(res => {
                        console.log('token after jwt', res.data);
                    })
                    .catch(error => console.log(error))
            }

            console.log('user in the auth state change', currentUser);
        })

        return () => {
            unSubscribe()
        }

    }, [])

    const logOut = () => {
        return signOut(auth)
    }


    const userInfo = {
        user,
        setUser,
        createUser,
        loading,
        setLoading,
        signIn,
        logOut,
        updateUser,
        googleSignIn
    }


    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;