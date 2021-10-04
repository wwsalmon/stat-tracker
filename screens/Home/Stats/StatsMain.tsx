import React from "react";
import StatsModalContainer from "../../../components/StatsModalContainer";
import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";
import StatsMainComponent from "../../../components/StatsMainComponent";

export default function StatsMain({navigation, route}: {navigation: StackNavigationProp<any>, route: RouteProp<any>}) {
    return (
        <StatsModalContainer navigation={navigation} route={route} ScreenContainer={StatsMainComponent}/>
    );
}