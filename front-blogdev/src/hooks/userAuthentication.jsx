import{db} from '../firebase/config';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from 'firebase/auth';
import { useState, useEffect } from 'react';

export const userAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    function checkIfIsCancelled() {
        if (cancelled) {
            return
        }
    }

    async function createUser(data) {
        checkIfIsCancelled()

        setLoading(true)
        setError(null)

    try {
        const { user } = await createUserWithEmailAndPassword(
            auth,
            data.email,
            data.password
        )
        await updateProfile(user, {
            displayName: data.displayName
        })

        setLoading(false)

        return user
        }catch (error) {
        console.error(error.message)
        console.table(typeof error)

        let systemErrorMessage

        if (error.message.includes("Password")) {
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres"
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "Email já cadastrado"
            } else {
                systemErrorMessage = "Ocorreu um error, tente novamente mais tarde"
            }

            setLoading(false)
            setError(systemErrorMessage)
        }
    }
    async function userLogin(data){
        checkIfIsCancelled()

        setLoading(true)
        setError(null)

    try {
        const { user } = await signInWithEmailAndPassword(
            auth,
            data.email,
            data.password
        )
        await updateProfile(user, {
            displayName: data.displayName
        })

        setLoading(false)

        return user
        }catch (error) {
        console.error(error.message)
        console.table(typeof error)

        let systemErrorMessage

        if (error.message.includes("Invalid")) {
                systemErrorMessage = "Informações de Login inválidas"
            }else {
                systemErrorMessage = "Ocorreu um error, tente novamente mais tarde"
            }

            setLoading(false)
            setError(systemErrorMessage)
        } 
    }
    async function userLogout() {
        checkIfIsCancelled()

        setLoading(true)
        setError(null)

        try {
            await signOut(auth)
            setLoading(false)
        } catch (error) {
            console.error(error.message)
            console.table(typeof error)

            let systemErrorMessage

            systemErrorMessage = "Ocorreu um error, tente novamente mais tarde"

            setLoading(false)
            setError(systemErrorMessage)
        }
    }
    
    useEffect(() => {
        return() => setCancelled(true)
    }, [])

    return {
        auth,
        createUser,
        userLogin,
        userLogout,
        error,
        loading
    }
}