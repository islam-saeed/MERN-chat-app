import React, { createContext, useEffect, useState } from 'react'


export const usersContext =  createContext(undefined)

export const UsersContext = ({children}) => {
    const [users, setUsers] = useState([])
    return (
        <usersContext.Provider value={[users, setUsers]}>
            {children}
        </usersContext.Provider>
    )
}