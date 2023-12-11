import React, { createContext, useEffect, useState } from 'react'


export const userContext =  createContext(undefined)

export const UserContext = ({children}) => {
    const [user, setUser] = useState({})
    return (
        <userContext.Provider value={[user, setUser]}>
            {children}
        </userContext.Provider>
    )
}