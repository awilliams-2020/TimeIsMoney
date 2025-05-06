import Config from "react-native-config"
import { useHttpClient } from "./useHttpClient"
import { useContext } from "react"
import { UserContext } from "../context/UserContext";

export const useMatomo = () => {
    const matomo = useHttpClient(Config.MATOMO_URL)
    const { ipAddress, userAgent } = useContext(UserContext)
    const staticParams = {
        idsite: '2',
        rec: '1'
    }

    const trackEvent = async (category: string, action: string, name: string) => {
        await matomo({
            method: 'get',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            params: {
                ...staticParams,
                'e_c': category,
                'e_a': action,
                'e_n': name,
                'cip': ipAddress,
                'token_auth': '',
                'ua': userAgent
            }
        })
        // .then(value => console.log(value))
        // .catch(err => console.log(err))
    }

    return {
        trackEvent
    }
}