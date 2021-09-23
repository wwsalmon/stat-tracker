import React from "react";
import BodyText from "../../components/BodyText";
import {StackNavigationProp} from "@react-navigation/stack";
import HomeContainer from "../../components/HomeContainer";

export default function Stats({navigation}: {navigation: StackNavigationProp<any>}) {
    return (
        <HomeContainer navigation={navigation} onPress={() => null}>
            <BodyText>Stats!</BodyText>
        </HomeContainer>
    );
}