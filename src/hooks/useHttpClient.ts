import axios, { AxiosRequestConfig } from 'axios';
import Config from 'react-native-config';

export const useHttpClient = () => {
    const client = axios.create({
        baseURL: Config.API_URL,
        headers: { 'Content-Type': 'application/json' }
    })

    const request = async (options:AxiosRequestConfig) => {
        const onSuccess = (response:any) => response
        const onError = (error:any) => {
          throw error
        }
        try {
            const response = await client(options);
            return onSuccess(response);
        } catch (error) {
            return onError(error);
        }
      }
    return request
}