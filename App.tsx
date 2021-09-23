import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Home from "./screens/Home";
import {ActionSheetProvider} from "@expo/react-native-action-sheet";
import NewRecord from "./screens/NewRecord";
import NewStat from "./screens/NewStat";

export default function App() {
    const Stack = createStackNavigator();

    return (
        <ActionSheetProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home" screenOptions={{
                    headerShown: false
                }}>
                    <Stack.Screen name="Home" component={Home}/>
                    <Stack.Screen name="New" component={NewRecord}/>
                    <Stack.Screen name="New Stat" component={NewStat}/>
                </Stack.Navigator>
            </NavigationContainer>
        </ActionSheetProvider>
    );
}