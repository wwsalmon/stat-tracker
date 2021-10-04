import React from "react";
import {StackNavigationProp} from "@react-navigation/stack";
import LogMainComponent from "../../../components/LogMainComponent";
import {RouteProp} from "@react-navigation/native";
import LogModalContainer from "../../../components/LogModalContainer";

export default function LogMain({navigation, route}: { navigation: StackNavigationProp<any>, route: RouteProp<any> }) {
    return (
        <LogModalContainer navigation={navigation} route={route} ScreenContainer={LogMainComponent}/>
    )
}