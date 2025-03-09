// Create a context
import React, { createContext, useState } from 'react';

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [imageCredit, setImageCredit] = useState(0)
  const [profile, setProfile] = useState();

  return (
    <UserContext.Provider value={{profile, setProfile, imageCredit, setImageCredit}}>
      {children}
    </UserContext.Provider>
  )
};