// Create a context
import React, { createContext, useState } from 'react';
import { AuthorizeResult } from 'react-native-app-auth';

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [imageCredit, setImageCredit] = useState(0)
  const [profile, setProfile] = useState();
  const [userSession, setUserSession] = useState<AuthorizeResult>();

  return (
    <UserContext.Provider value={{profile, setProfile, imageCredit, setImageCredit, setUserSession, userSession}}>
      {children}
    </UserContext.Provider>
  )
};