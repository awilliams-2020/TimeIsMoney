import EncryptedStorage from "react-native-encrypted-storage";

export const useStorage = () => {
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
        } catch (error) {}
    }
    return {
        setSession,
        getSession
    }
}