import React from "react";
import StatsModalContainer from "../../../components/StatsModalContainer";
import StatsMainComponent from "../../../components/StatsMainComponent";
import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";
import StatsItemComponent from "../../../components/StatsItemComponent";

export default function StatsItem({navigation, route}: {navigation: StackNavigationProp<any>, route: RouteProp<any>}) {
    const statId = route.params && route.params.statId;

    if (!statId) {
        navigation.navigate("Stats Main");
        return <></>;
    }

    return (
        <StatsModalContainer navigation={navigation} route={route} ScreenContainer={StatsItemComponent} statId={statId}/>
    );
}