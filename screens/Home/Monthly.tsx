import React from "react";
import {Text} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import HomeContainer from "../../components/HomeContainer";

export default function Monthly({navigation}: {navigation: StackNavigationProp<any>}) {
    return (
        <HomeContainer navigation={navigation}>
            <Text>Scrolling</Text>
        </HomeContainer>
    );
}