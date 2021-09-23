import React, {ReactNode} from "react";
import {Pressable, ScrollView, View} from "react-native";
import tw from "tailwind-react-native-classnames";
import {StackNavigationProp} from "@react-navigation/stack";
import BodyText from "../components/BodyText";

export default function NewItemContainer({navigation, canSave, itemName, children, noScroll}: {
    navigation: StackNavigationProp<any>,
    canSave: boolean,
    itemName: string,
    children: ReactNode,
    noScroll?: boolean,
}) {
    return (
        <View style={tw`flex-1`}>
            <View style={tw`bg-white`}>
                <View style={tw`justify-center h-12 mt-12 w-full`}>
                    <BodyText className="text-center font-bold">New {itemName}</BodyText>
                    <Pressable style={tw`absolute left-4`} onPress={() => navigation.goBack()}>
                        <BodyText>Cancel</BodyText>
                    </Pressable>
                    <Pressable
                        style={tw.style(`absolute right-4`)}
                        disabled={!canSave}
                    >
                        <BodyText className={canSave ? "text-blue-500" : "text-gray-400"}>Save</BodyText>
                    </Pressable>
                </View>
            </View>
            {noScroll ? (
                children
            ) : (
                <ScrollView>
                    {children}
                </ScrollView>
            )}
        </View>
    );
};