import Container from "../../components/Container";
import {Text} from "react-native";
import tw from "tailwind-react-native-classnames";
import React from "react";

export default function Settings({}: {}) {
    return (
        <Container>
            <Text style={tw`text-3xl font-bold my-6`}>Settings</Text>
        </Container>
    );
}