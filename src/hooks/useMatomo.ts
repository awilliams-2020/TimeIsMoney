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

    const trackEvent = (category: string, action: string, name: string, value: number = 0) => {
        matomo({
            method: 'get',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            params: {
                ...staticParams,
                'e_c': category,
                'e_a': action,
                'e_n': name,
                'e_v': value,
                'cip': ipAddress,
                'token_auth': Config.MATOMO_TOKEN,
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