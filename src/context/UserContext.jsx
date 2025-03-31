import { createContext, useEffect, useState } from "react";

export let UserContext = createContext()

export default function UserContextProvider(props) {
    const [userLogin, setuserLogin] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (token) {
            setuserLogin(token);
        }
    }, [])

    return <UserContext.Provider value={{ userLogin, setuserLogin }}>
        {/* app */}
        {props.children}
    </UserContext.Provider>
}