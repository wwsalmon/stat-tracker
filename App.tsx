import React, {createContext, useContext, useState} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Home from "./screens/Home";
import {ActionSheetProvider} from "@expo/react-native-action-sheet";
import NewRecord from "./screens/NewRecord";
import NewStat from "./screens/NewStat";

import firebase from "firebase";
import Login from "./screens/Login";
import User = firebase.User;

const firebaseConfig = {
    apiKey: "AIzaSyBVeYtruQriOcf37AgD8PhPo9rIVc827YY",
    authDomain: "stat-tracker-fcd7c.firebaseapp.com",
    projectId: "stat-tracker-fcd7c",
    storageBucket: "stat-tracker-fcd7c.appspot.com",
    messagingSenderId: "426374293625",
    appId: "1:426374293625:web:a486f4e462cbe208c24ca8",
    measurementId: "G-KERMYVMZV5"
};

if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);

const UserContext = createContext<User | null>(null);
export const useUser = () => useContext(UserContext);

export default function App() {
    const Stack = createStackNavigator();

    const [user, setUser] = useState<User | null>(null);

    firebase.auth().onAuthStateChanged(user => {
        if (user) return setUser(user);

        setUser(null);
    });

    return (
        <ActionSheetProvider>
            <UserContext.Provider value={user}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName={user ? "Home" : "Login"} screenOptions={{
                        headerShown: false
                    }}>
                        <Stack.Screen name="Home" component={Home}/>
                        <Stack.Screen name="New" component={NewRecord}/>
                        <Stack.Screen name="New Stat" component={NewStat}/>
                        <Stack.Screen name="Login" component={Login}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </UserContext.Provider>
        </ActionSheetProvider>
    );
}