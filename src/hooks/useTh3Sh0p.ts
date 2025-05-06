import Config from 'react-native-config';
import { useHttpClient } from './useHttpClient';

export const useTh3sh0p = () => {
    return useHttpClient(Config.API_URL)
}