import React from "react";
import {StackNavigationProp} from "@react-navigation/stack";
import LogMain from "../../../components/LogMain";
import {RouteProp} from "@react-navigation/native";
import LogModalContainer from "../../../components/LogModalContainer";

export default function Log({navigation, route}: { navigation: StackNavigationProp<any>, route: RouteProp<any> }) {
    return (
        <LogModalContainer navigation={navigation} route={route} ScreenContainer={LogMain}/>
    )
}