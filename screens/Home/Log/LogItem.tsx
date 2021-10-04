import React from "react";
import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";
import LogModalContainer from "../../../components/LogModalContainer";
import LogItemComponent from "../../../components/LogItemComponent";

export default function LogItem({navigation, route}: {
    navigation: StackNavigationProp<any>,
    route: RouteProp<any>,
}) {
    const recordId = route.params && route.params.recordId;

    if (!recordId) {
        navigation.navigate("Log Main");
        return <></>;
    }

    return (
        <LogModalContainer navigation={navigation} route={route} ScreenContainer={LogItemComponent} recordId={recordId}/>
    );
}