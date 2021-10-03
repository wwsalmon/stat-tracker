import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Feather} from "@expo/vector-icons";
import Settings from "./Home/Settings";
import Stats from "./Home/Stats";
import Graphs from "./Home/Graphs";
import LogContainer from "./Home/Log/LogContainer";

export default function Home({}: {}) {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({color}) => {
                    const iconOpts: {[key: string]: string} = {
                        "Log": "calendar",
                        "Stats": "list",
                        "Graphs": "bar-chart",
                        "Settings": "settings",
                    };

                    const iconName = iconOpts[route.name];

                    return (
                        <Feather name={iconName as any} color={color} size={20}/>
                    );
                },
                headerShown: false,
            })}
        >
            <Tab.Screen name="Log" component={LogContainer}/>
            <Tab.Screen name="Stats" component={Stats}/>
            <Tab.Screen name="Graphs" component={Graphs}/>
            <Tab.Screen name="Settings" component={Settings}/>
        </Tab.Navigator>
    );
}