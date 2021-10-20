import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Home from "./screens/Home";
import {ActionSheetProvider} from "@expo/react-native-action-sheet";

import {LogBox} from "react-native";
import firebase from "firebase";
import Login from "./screens/Login";
import UserProvider from "./components/UserProvider";

if (LogBox) LogBox.ignoreLogs(["Setting a timer"]);

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

export default function App() {
    const Stack = createStackNavigator();

    return (
        <ActionSheetProvider>
            <UserProvider>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Home" screenOptions={{
                        headerShown: false
                    }}>
                        <Stack.Screen name="Home" component={Home}/>
                        <Stack.Screen name="Login" component={Login}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </UserProvider>
        </ActionSheetProvider>
    );
}