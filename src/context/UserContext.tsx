// Create a context
import React, { createContext, useEffect, useState } from 'react';
import { AuthorizeResult } from 'react-native-app-auth';
import { useHttpClient } from '../hooks/useHttpClient';
import UserAgent from 'react-native-user-agent';
import Config from 'react-native-config';

type Profile = {
    image: string;
    // Add other profile properties as needed
};

type UserContextType = {
    profile: Profile | undefined;
    setProfile: (profile: Profile | undefined) => void;
    imageCredit: number;
    setImageCredit: (credit: number) => void;
    userSession: AuthorizeResult | undefined;
    setUserSession: (session: AuthorizeResult | undefined) => void;
    ipAddress: string | undefined;
    userAgent: string;
};

export const UserContext = createContext<UserContextType>({
    profile: undefined,
    setProfile: () => {},
    imageCredit: 0,
    setImageCredit: () => {},
    userSession: undefined,
    setUserSession: () => {},
    ipAddress: undefined,
    userAgent: '',
});

type UserProviderProps = {
    children: React.ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
    const userAgent = UserAgent.getUserAgent();
    const ipify = useHttpClient(Config.IPIFY_URL);
    const [imageCredit, setImageCredit] = useState(0);
    const [profile, setProfile] = useState<Profile>();
    const [userSession, setUserSession] = useState<AuthorizeResult>();
    const [ipAddress, setIpAddress] = useState<string>();

    useEffect(() => {
        ipify({ method: 'get', params: { format: 'json' } })
            .then(({ data }) => setIpAddress(data.ip))
            .catch(err => console.log(err));
    }, []);

    return (
        <UserContext.Provider value={{
            profile,
            setProfile,
            imageCredit,
            setImageCredit,
            setUserSession,
            userSession,
            ipAddress,
            userAgent
        }}>
            {children}
        </UserContext.Provider>
    );
};