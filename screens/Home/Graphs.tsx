import React from "react";
import BodyText from "../../components/BodyText";
import {StackNavigationProp} from "@react-navigation/stack";
import HomeContainer from "../../components/HomeContainer";

export default function Graphs({navigation}: {navigation: StackNavigationProp<any>}) {
    return (
        <HomeContainer navigation={navigation} onPress={() => null}>
            <BodyText>Coming soon</BodyText>
        </HomeContainer>
    );
}