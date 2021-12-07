import React from "react";

export interface User {
    token: string;
    name: string;
}

const UsersContext = React.createContext <{
    user: User;
    setToken: (token: string, name: string) => void;
    initContext: () => void;
}>({
    user: {token: "", name: ""},
    setToken: () => {},
    initContext: () => {}
})

export default UsersContext;