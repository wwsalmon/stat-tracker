import React, {Dispatch, ReactElement, SetStateAction, useEffect, useState} from "react";
import {Dimensions, TextInput, View} from "react-native";
import tw from "tailwind-react-native-classnames";
import {StackNavigationProp} from "@react-navigation/stack";
import ColorPicker from "react-native-wheel-color-picker";
import {StatObj, StatTypeOpts, StatTypeOptsArr} from "../utils/types";
import RNPickerSelect from "react-native-picker-select";
import firebase from "firebase";
import {useUser} from "./UserProvider";
import {SlideModal} from "react-native-slide-modal";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {RouteProp} from "@react-navigation/native";

export default function StatsModalContainer({navigation, route, ScreenContainer, statId}: {
    navigation: StackNavigationProp<any>,
    route: RouteProp<any>,
    ScreenContainer: ({navigation, route, setModalOpen, iter, setIter, statId}: {
        navigation: StackNavigationProp<any>,
        route: RouteProp<any>,
        setModalOpen: Dispatch<SetStateAction<boolean>>,
        iter: number,
        setIter: Dispatch<SetStateAction<number>>,
        statId?: string,
    }) => ReactElement,
    statId?: string,
}) {
    const {user} = useUser();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [color, setColor] = useState<string>("#0026ff");
    const [type, setType] = useState<StatTypeOpts | null>(null);
    const [name, setName] = useState<string>("");
    const [iter, setIter] = useState<number>(0);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    useEffect(() => {
        if (!user) {
            navigation.navigate("Login");
            return;
        }

        if (!statId) return;

        setIsLoading(true);

        const db = firebase.firestore();

        db
            .collection(`users/${user.uid}/stats`)
            .doc(statId)
            .get()
            .then(snapshot => {
                if (!snapshot.data()) {
                    navigation.navigate("Stats");
                    return;
                }

                const data: StatObj = {id: snapshot.id, ...snapshot.data()} as StatObj;

                setName(data.name);
                setType(data.type);
                setColor(data.color);
                setIsLoading(false);
            });
    }, [statId]);

    const canSave = !!(name && type);

    async function onSave() {
        if (!(canSave && user)) return;

        const db = firebase.firestore();

        const newDoc = {
            name: name,
            type: type,
            color: color,
        };

        try {
            statId ?
                await db
                    .collection(`users/${user.uid}/stats`)
                    .doc(statId)
                    .update(newDoc) :
                await db
                    .collection(`users/${user.uid}/stats`)
                    .add(newDoc);

            setColor("#0026ff");
            setType(null);
            setName("");
            setIter(iter + 1);
            setModalOpen(false);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <View style={tw`bg-white`}>
            <SlideModal
                screenContainer={
                    <View style={tw.style(`w-full h-full`)}>
                        <ScreenContainer
                            navigation={navigation}
                            route={route}
                            iter={iter}
                            setIter={setIter}
                            setModalOpen={setModalOpen}
                            statId={statId}
                        />
                    </View>
                }
                modalContainer={
                    <KeyboardAwareScrollView style={tw.style(`bg-gray-50`, {minHeight: Dimensions.get("window").height - 110})}>
                        <TextInput
                            style={tw.style(`bg-white px-4 h-12 mt-4 border-t border-b border-gray-100`, {
                                fontSize: 16,
                                color: "black"
                            })}
                            placeholderTextColor="#bbbbbb"
                            placeholder="Stat name"
                            value={name}
                            onChangeText={value => setName(value)}
                        />
                        {!statId && (
                            <View style={tw`bg-white w-full px-2 py-3 h-12 border-t border-b border-gray-100`}>
                                <RNPickerSelect
                                    placeholder={{label: "Type", value: null}}
                                    style={{
                                        inputIOS: tw.style(`px-2`, {fontSize: 16}),
                                        inputAndroid: {color: "black"}
                                    }}
                                    value={type}
                                    onValueChange={(value) => setType(value)}
                                    items={StatTypeOptsArr.map((d: string) => ({
                                        label: d.charAt(0).toUpperCase() + d.substr(1),
                                        value: d
                                    }))}
                                />
                            </View>
                        )}
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
                    </KeyboardAwareScrollView>
                }
                modalType="iOS Form Sheet"
                modalHeaderTitle="New stat"
                modalVisible={modalOpen}
                pressCancel={() => setModalOpen(false)}
                pressDone={onSave}
                doneDisabled={!canSave}
            />
        </View>
    );
};