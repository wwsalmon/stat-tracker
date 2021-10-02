import React, {createContext, ReactNode, useContext, useState} from "react";
import firebase from "firebase";
import User = firebase.User;

const UserContext = createContext<User | null>(null);
export const useUser = () => useContext(UserContext);

export default function UserProvider({children}: {children: ReactNode}) {
    const [user, setUser] = useState<User | null>(null);

    firebase.auth().onAuthStateChanged(user => {
        if (user) return setUser(user);

        setUser(null);
    });

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
}