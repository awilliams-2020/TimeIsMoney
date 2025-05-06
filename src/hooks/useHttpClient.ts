import axios, { AxiosRequestConfig } from 'axios';

export const useHttpClient = (url: string | undefined) => {
    const client = axios.create({
        baseURL: url,
        headers: { 'Content-Type': 'application/json' }
    })

    const request = async (options: AxiosRequestConfig) => {
        const onSuccess = (response: any) => response
        const onError = (error: any) => {
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