declare module 'react-native-config' {
    export interface NativeConfig {
        API_URL?: string;
        GOOGLE_OAUTH_APP_GUID? : string;
        MATOMO_URL?: string;
        IPIFY_URL?: string
    }

    export const Config: NativeConfig
    export default Config
}