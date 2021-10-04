import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import LogMain from "./LogMain";
import LogItem from "./LogItem";

export default function Log({}: {}) {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator initialRouteName="Log Main" screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Log Main" component={LogMain}/>
            <Stack.Screen name="Log Item" component={LogItem}/>
        </Stack.Navigator>
    );
}