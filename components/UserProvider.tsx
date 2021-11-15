import React, {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";
import firebase from "firebase";
import * as WebBrowser from "expo-web-browser";
import User = firebase.User;
import Constants from "expo-constants";

WebBrowser.maybeCompleteAuthSession();

export type UserInfo = {displayName?: string | null, email?: string | null};
const UserContext = createContext<{ user: UserInfo | null, setUser: Dispatch<SetStateAction<UserInfo | null>> | null }>({user: null, setUser: null});
export const useUser = () => useContext(UserContext);

export default function UserProvider({children}: {children: ReactNode}) {
    const [user, setUser] = useState<UserInfo | null>(null);

    firebase.auth().onAuthStateChanged(user => {
        if (user && user.email && user.email === "seventest@samsonzhang.com") return setUser(user);

        if (Constants.appOwnership === "expo") {
            if (user) return setUser(user);

            setUser(null);
        }
    });

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}