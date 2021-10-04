import {Alert, Pressable, View} from "react-native";
import tw from "tailwind-react-native-classnames";
import {Feather} from "@expo/vector-icons";
import BodyText from "./BodyText";
import React, {Dispatch, SetStateAction} from "react";
import {StackNavigationProp} from "@react-navigation/stack";

export default function ItemHeader({navigation, setModalOpen, onDelete, itemName}: {
    navigation: StackNavigationProp<any>,
    setModalOpen: Dispatch<SetStateAction<boolean>>,
    onDelete: () => any,
    itemName: string,
}) {
    return (
        <View style={tw`flex-row items-center my-4`}>
            <Pressable onPress={() => navigation.goBack()} style={tw`flex-row items-center`}>
                <Feather name="arrow-left" size={20}/>
                <BodyText className="ml-2">Back</BodyText>
            </Pressable>
            <Pressable style={tw`ml-auto`} onPress={() => setModalOpen(true)}>
                <Feather name="edit-2" size={20} color="#aaaaaa"/>
            </Pressable>
            <Pressable style={tw`ml-8`} onPress={() => Alert.alert(
                `Delete ${itemName}`,
                `Are you sure you want to delete this ${itemName}? This action cannot be undone.`,
                [{text: "Delete", style: "destructive", onPress: onDelete}, {text: "Cancel", style: "cancel"}]
            )}>
                <Feather name="trash" size={20} color="lightcoral"/>
            </Pressable>
        </View>
    );
}