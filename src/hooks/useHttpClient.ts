import axios, { AxiosRequestConfig } from 'axios';

export const useHttpClient = () => {
    const client = axios.create({
        baseURL: 'https://th3-sh0p.com/v1',
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