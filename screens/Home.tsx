import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Moments from "./Home/Moments";
import Daily from "./Home/Daily";
import Weekly from "./Home/Weekly";
import Monthly from "./Home/Monthly";
import {Text} from "react-native";
import {Feather} from "@expo/vector-icons";
import Settings from "./Home/Settings";

export default function Home({}: {}) {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({color}) => route.name === "Settings" ? (
                    <Feather name="settings" color={color} size={16}/>
                ) : (
                    <Text style={{color: color, fontSize: 14}}>
                        {route.name === "Moments" ? route.name.charAt(0).toLowerCase() : route.name.charAt(0)}
                    </Text>
                ),
                headerShown: false,
            })}
        >
            <Tab.Screen name="Moments" component={Moments}/>
            <Tab.Screen name="Daily" component={Daily}/>
            <Tab.Screen name="Weekly" component={Weekly}/>
            <Tab.Screen name="Monthly" component={Monthly}/>
            <Tab.Screen name="Settings" component={Settings}/>
        </Tab.Navigator>
    );
}