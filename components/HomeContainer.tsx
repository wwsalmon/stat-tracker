import {Pressable, ScrollView, Text, View} from "react-native";
import tw from "tailwind-react-native-classnames";
import {Feather} from "@expo/vector-icons";
import Container from "./Container";
import React, {ReactNode} from "react";
import {useActionSheet} from "@expo/react-native-action-sheet";
import {useRoute} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";

export default function HomeContainer({children, navigation}: { children: ReactNode, navigation: StackNavigationProp<any> }) {
    const {showActionSheetWithOptions} = useActionSheet();
    const route = useRoute();

    return (
        <Container withTabs={true} noScroll={true}>
            <View style={tw`flex-row items-center my-6`}>
                <Text style={tw`text-3xl font-bold`}>{route.name}</Text>
                <Pressable
                    style={tw`ml-auto h-8 w-8 bg-blue-500 rounded-full items-center justify-center`}
                    onPress={() => showActionSheetWithOptions({
                        options: ["Moment", "Daily recap", "Weekly recap", "Monthly recap", "Cancel"],
                        cancelButtonIndex: 4
                    }, i => {
                        if (i !== 4) navigation.navigate("New");
                    })}
                >
                    <Feather name="plus" color="white" size={20}/>
                </Pressable>
            </View>
            <ScrollView>
                {children}
            </ScrollView>
        </Container>
    );
}