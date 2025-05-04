import { isPast } from "date-fns";
import { useContext, useEffect, useState } from "react";
import EncryptedStorage from "react-native-encrypted-storage";
import { UserContext } from "../context/UserContext";

export const useStorage = () => {
const { setUserSession } = useContext(UserContext)

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
                    setUserSession(userSession)
                }
            })
    }, [])

    return {
        setSession,
        getSession
    }
}