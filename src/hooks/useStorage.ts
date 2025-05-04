import { isPast } from "date-fns";
import { useEffect, useState } from "react";
import EncryptedStorage from "react-native-encrypted-storage";

export const useStorage = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [enabled, setEnabled] = useState(false)

    const setSession = async (authState) => {
        try {
            await EncryptedStorage.setItem(
                "user_session",
                JSON.stringify(authState)
            );
        } catch (error) {
        }
    }

    const getSession = async () => {
        try {
            const session = await EncryptedStorage.getItem("user_session");
            if (session) {
                return JSON.parse(session)
            }
            return undefined
        } catch (error) { }
    }

    useEffect(() => {
        getSession()
            .then(userSession => {
                if (userSession && !isPast(new Date(userSession.accessTokenExpirationDate))) {
                    console.log("Check session")
                    setEnabled(true)
                }
            })
            .finally(() => setIsLoading(false))
    }, [])

    return {
        setSession,
        getSession,
        setEnabled,
        enabled
    }
}