import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { AuthConfiguration, authorize } from "react-native-app-auth";
import { useHttpClient } from "./useHttpClient";
import { useStorage } from "./useStorage";
import { UserContext } from "../context/UserContext";
import Config from "react-native-config";
import { useTh3sh0p } from "./useTh3Sh0p";

export const useOAuth = () => {
    const { setProfile, userSession, setUserSession } = useContext(UserContext)
    const { getSession, setSession } = useStorage()
    const [isAuthorizing, setIsAuthorizing] = useState(false)
    const th3sh0p = useTh3sh0p()

    const { isLoading, data } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const userSession = await getSession()
            const resp = await th3sh0p({
                method: 'get',
                url: `/google-profile?accessToken=${userSession.accessToken}`,
            })
            return resp.data
        },
        enabled: Boolean(userSession)
    })

    const GOOGLE_OAUTH_APP_GUID = Config.GOOGLE_OAUTH_APP_GUID;
    const config: AuthConfiguration = {
        issuer: 'https://accounts.google.com',
        clientId: `${GOOGLE_OAUTH_APP_GUID}.apps.googleusercontent.com`,
        redirectUrl: `com.googleusercontent.apps.${GOOGLE_OAUTH_APP_GUID}:/oauth2redirect/google`,
        scopes: ['openid', 'profile', 'email'],
    };

    useEffect(() => {
        if (!isLoading && data) {
            setProfile(data.profile)
        }
    }, [data])

    const signin = async () => {
        setIsAuthorizing(true)
        authorize(config)
            .then(resp => {
                setSession(resp)
                setUserSession(resp)
            })
            .catch(err => console.log(`Error: ${err}`))
            .finally(() => setIsAuthorizing(false))
    }

    return {
        signin,
        isLoading: isLoading || isAuthorizing
    }
}