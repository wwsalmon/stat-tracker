import {Pressable, RefreshControl, ScrollView, Text, View} from "react-native";
import tw from "tailwind-react-native-classnames";
import {Feather} from "@expo/vector-icons";
import Container from "./Container";
import React, {ReactNode} from "react";
import {useActionSheet} from "@expo/react-native-action-sheet";
import {useRoute} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import H1 from "./H1";

export default function HomeContainer({children, navigation, onPress, refreshing, onRefresh}: {
    children: ReactNode,
    navigation: StackNavigationProp<any>,
    onPress: () => any;
    refreshing?: boolean,
    onRefresh?: () => any;
}) {
    const route = useRoute();

    return (
        <Container withTabs={true} noScroll={true}>
            <View style={tw`flex-row items-center my-6`}>
                <H1>{route.name}</H1>
                <Pressable
                    style={tw`ml-auto h-8 w-8 bg-blue-500 rounded-full items-center justify-center`}
                    onPress={onPress}
                >
                    <Feather name="plus" color="white" size={20}/>
                </Pressable>
            </View>
            <ScrollView
                refreshControl={
                    onRefresh ? (
                        <RefreshControl refreshing={!!refreshing} onRefresh={onRefresh}/>
                    ) : <></>
                }
            >
                {children}
            </ScrollView>
        </Container>
    );
}