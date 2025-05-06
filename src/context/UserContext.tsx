// Create a context
import React, { createContext, useEffect, useState } from 'react';
import { AuthorizeResult } from 'react-native-app-auth';
import { useHttpClient } from '../hooks/useHttpClient';
import UserAgent from 'react-native-user-agent';
import Config from 'react-native-config';

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const userAgent = UserAgent.getUserAgent()
  const ipify = useHttpClient(Config.IPIFY_URL)
  const [imageCredit, setImageCredit] = useState(0)
  const [profile, setProfile] = useState();
  const [userSession, setUserSession] = useState<AuthorizeResult>();
  const [ipAddress, setIpAddress] = useState()

  useEffect(() => {
    ipify({ method: 'get', params: { format: 'json' } })
      .then(({ data }) => setIpAddress(data.ip))
      .catch(err => console.log(err))
  })

  return (
    <UserContext.Provider value={{ profile, setProfile, imageCredit, setImageCredit, setUserSession, userSession, ipAddress, userAgent }}>
      {children}
    </UserContext.Provider>
  )
};