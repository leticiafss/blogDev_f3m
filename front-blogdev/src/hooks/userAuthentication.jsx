import { async } from '@firebase/util';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    singnOut,
} from 'firebase/auth';
import { useState, useEffect } from 'react';

export const useUserAuthentication = () => {
    const [error, setError] = useState(null)
    const [loanding, setLoanding] = useState(null)
    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    function checkIfIsCancelled() {
        if (cancelled) {
            return
        }
    }

    async function createUser(data) {
        checkIfIsCancelled()

        setLoanding(true)
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

        setloanding(false)

        return user
        }catch (error) {
        console.error(error.message)
        console.table(typeof error.message)

        let systemErrorMessage

        if (error.message.includes("Password")) {
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres"
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "Email já cadastrado"
            } else {
                systemErrorMessage = "Ocorreu um error, tente novamente mais tarde"
            }

            setLoanding(false)
            setError(systemErrorMessage)
        }
    }

    useEffect(() => {
        return() => setCancelled(true)
    }, [])

    return {
        auth,
        createUser,
        error,
        loanding
    }
}
 