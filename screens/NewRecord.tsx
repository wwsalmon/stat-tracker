import React from "react";
import Container from "../components/Container";
import {Pressable, Text, View} from "react-native";
import tw from "tailwind-react-native-classnames";
import {StackNavigationProp} from "@react-navigation/stack";

export default function NewRecord({navigation}: {navigation: StackNavigationProp<any>}) {
    return (
        <Container noScroll={true}>
            <View style={tw`justify-center h-12 w-full`}>
                <Text style={tw`text-center font-bold text-base`}>New record</Text>
                <Pressable style={tw`absolute left-0`} onPress={() => navigation.goBack()}>
                    <Text style={tw`text-base`}>Cancel</Text>
                </Pressable>
                <Pressable style={tw`absolute right-0`}>
                    <Text style={tw`text-base`}>Save</Text>
                </Pressable>
            </View>
        </Container>
    );
}