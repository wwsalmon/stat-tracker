import React, {useState} from "react";
import {TextInput, View} from "react-native";
import tw from "tailwind-react-native-classnames";
import {StackNavigationProp} from "@react-navigation/stack";
import NewItemContainer from "../components/NewItemContainer";
import ColorPicker from "react-native-wheel-color-picker";
import BodyText from "../components/BodyText";

export default function NewStat({navigation}: { navigation: StackNavigationProp<any> }) {
    const [color, setColor] = useState<string>("#0026ff");
    const [name, setName] = useState<string>("");

    const canSave = !!name;

    return (
        <NewItemContainer navigation={navigation} canSave={canSave} itemName="stat" noScroll={true}>
            <TextInput
                style={tw.style(`bg-white px-4 h-12 mt-4 border-t border-b border-gray-100`, {fontSize: 16, lineHeight: 0})}
                placeholder="Stat name"
                value={name}
                onChangeText={value => setName(value)}
            />
            <View style={tw`bg-white my-4 border-t border-b border-gray-100 p-4 h-96`}>
                {/*@ts-ignore colorpicker isn't well-typed*/}
                <ColorPicker
                    color={color}
                    // @ts-ignore
                    onColorChange={(color: string) => {
                        setColor(color);
                    }}
                    thumbSize={40}
                    sliderSize={40}
                    noSnap={true}
                    row={false}
                />
            </View>
        </NewItemContainer>
    );
};