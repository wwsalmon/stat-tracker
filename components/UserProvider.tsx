import React, {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";
import firebase from "firebase";
import * as WebBrowser from "expo-web-browser";
import User = firebase.User;

WebBrowser.maybeCompleteAuthSession();

const UserContext = createContext<{ user: User | null, setUser: Dispatch<SetStateAction<User | null>> | null }>({user: null, setUser: null});
export const useUser = () => useContext(UserContext);

export default function UserProvider({children}: {children: ReactNode}) {
    const [user, setUser] = useState<User | null>(null);

    firebase.auth().onAuthStateChanged(user => {
        if (user) return setUser(user);

        setUser(null);
    });

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}