
import React, { useCallback, useEffect, useState } from "react";

import UserContext, {User} from "./user-context";

const UserContextProvider: React.FC = props => {
    const [user, setUser] = useState<User>({token:"", name: ""});

    const setToken = (token: string, name: string) => {
        const newUser: User = {
            token: token,
            name: name
        }
        setUser(curUser => {
            return curUser = newUser;
        })
    }

    useEffect(() => {
        const storableUser = user
        console.log("Effect");
        console.log(storableUser);
        localStorage.setItem('user', JSON.stringify(storableUser));
    }, [user]);

    const initContext = useCallback(async () => {
        const userData = await localStorage.getItem('user');
        const storedUser = userData ? JSON.parse(userData) : {token:"", name: ""};
        
        setUser(storedUser);
    },[])

    return (
        <UserContext.Provider value={{user, setToken, initContext}}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;