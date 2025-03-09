import { differenceInMinutes, isPast } from "date-fns";
import { AuthConfiguration, AuthorizeResult, refresh } from "react-native-app-auth";
import EncryptedStorage from "react-native-encrypted-storage";

const GOOGLE_OAUTH_APP_GUID = '889504103274-5fu49653t4beaotjhnn4ql0fj8i5vpd3';
const config: AuthConfiguration = {
    issuer: 'https://accounts.google.com',
    clientId: `${GOOGLE_OAUTH_APP_GUID}.apps.googleusercontent.com`,
    redirectUrl: `com.googleusercontent.apps.${GOOGLE_OAUTH_APP_GUID}:/oauth2redirect/google`,
    scopes: ['openid', 'profile', 'email'],
};

const refreshAccessToken = (userSession: AuthorizeResult) => {
    refresh(config, {
        refreshToken: userSession.refreshToken,
    })
    .then(resp => {
        const newSession:AuthorizeResult = {
            ...userSession,
            accessToken: resp.accessToken,
            accessTokenExpirationDate: resp.accessTokenExpirationDate,
            idToken: resp.idToken
        }
        EncryptedStorage.setItem('user_session', JSON.stringify(newSession))
    })
    .catch(err => {
        console.log(`Refresh error: ${err}`)
        EncryptedStorage.clear()
    })
}

const process = async () => {
    setInterval(async () => {
        const userSession = await EncryptedStorage.getItem("user_session");
        if (userSession) {
            const session:AuthorizeResult = JSON.parse(userSession)
            if (session.refreshToken) {
                const exp = new Date(session.accessTokenExpirationDate)
                if (differenceInMinutes(exp, Date.now()) < 2) {
                    refreshAccessToken(session)
                }
            } else {
                console.log("Refresh token null")
                EncryptedStorage.clear()
            }
        }
    }, 30000)
}

export const BackgroundManager = async (data:any) => {
    try {
        process()
    } catch (error) {
        console.log(error)
    }
};