import React, { useContext, useState, useEffect } from 'react'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import FirebaseService from '@/services/firebase/firebase_config'

const auth = FirebaseService.auth;

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    async function signup(email, password) {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            return response;
        } catch (error) {
            return error;
        }

    }

    async function login(email, password) {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            return response;
        } catch (error) {
            return error;
        }
    }

    async function logout() {
        return await signOut(auth);
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}