import React, { createContext, useState } from "react"

export const UserContext = createContext()

export const UserProvider = (props) => {
    const [user, setUser] = useState(false)
    const [posts, setPosts] = useState([])

    return (
        <UserContext.Provider value={{user, setUser, posts, setPosts}}>
            {props.children}
        </UserContext.Provider>
    )
}