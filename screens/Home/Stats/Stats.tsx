import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import StatsMain from "./StatsMain";
import StatsItem from "./StatsItem";

export default function Stats({}: {}) {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator initialRouteName="Stats" screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Stats Main" component={StatsMain}/>
            <Stack.Screen name="Stats Item" component={StatsItem}/>
        </Stack.Navigator>
    );
}