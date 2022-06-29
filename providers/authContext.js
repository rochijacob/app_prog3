import React, { createContext, useState } from "react"

export const AuthContext = createContext()

export const AuthProvider = (props) => {
    const [authenticate, setAuth] = useState(false);
    const [loading, setLoading] = useState(true)

    return (
        <AuthContext.Provider value={{authenticate, setAuth, loading, setLoading}}>{props.children}</AuthContext.Provider>
    )
}