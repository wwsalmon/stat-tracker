import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Log from "./Log";
import LogItem from "./LogItem";
import {NavigationContainer} from "@react-navigation/native";

export default function LogContainer({}: {}) {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator initialRouteName="Log Main" screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Log Main" component={Log}/>
            <Stack.Screen name="Log Item" component={LogItem}/>
        </Stack.Navigator>
    );
}