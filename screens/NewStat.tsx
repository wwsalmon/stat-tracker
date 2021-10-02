import React, {useState} from "react";
import {TextInput, View} from "react-native";
import tw from "tailwind-react-native-classnames";
import {StackNavigationProp} from "@react-navigation/stack";
import NewItemContainer from "../components/NewItemContainer";
import ColorPicker from "react-native-wheel-color-picker";
import {StatTypeOpts, StatTypeOptsArr} from "../utils/types";
import RNPickerSelect from "react-native-picker-select";
import firebase from "firebase";
import {useUser} from "../components/UserProvider";

export default function NewStat({navigation}: { navigation: StackNavigationProp<any> }) {
    const user = useUser();

    const [color, setColor] = useState<string>("#0026ff");
    const [type, setType] = useState<StatTypeOpts | null>(null);
    const [name, setName] = useState<string>("");

    const canSave = !!(name && type);

    function onSave() {
        if (!(canSave && user)) return;

        const db = firebase.firestore();
        db
            .collection(`users/${user.uid}/stats`)
            .add({
                name: name,
                type: type,
                color: color,
            })
            .then(res => {
                setColor("#0026ff");
                setType(null);
                setName("");
                navigation.navigate("Stats", {refresh: true});
            }).catch(e => console.log(e));
    }

    return (
        <NewItemContainer navigation={navigation} canSave={canSave} itemName="stat" noScroll={true} onSave={onSave}>
            <TextInput
                style={tw.style(`bg-white px-4 h-12 mt-4 border-t border-b border-gray-100`, {
                    fontSize: 16,
                    color: "black"
                })}
                placeholder="Stat name"
                value={name}
                onChangeText={value => setName(value)}
            />
            <View style={tw`bg-white w-full px-2 py-3 h-12 border-t border-b border-gray-100`}>
                <RNPickerSelect
                    placeholder={{label: "Type", value: null}}
                    style={{
                        inputIOS: tw.style(`px-2`, {fontSize: 16}),
                        inputAndroid: {color: "black"}
                    }}
                    onValueChange={(value) => setType(value)}
                    items={StatTypeOptsArr.map(d => ({label: d.charAt(0).toUpperCase() + d.substr(1), value: d}))}
                />
            </View>
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