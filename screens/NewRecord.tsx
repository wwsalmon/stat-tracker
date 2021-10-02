import React, {useState} from "react";
import {Pressable, ScrollView, TextInput, View} from "react-native";
import tw from "tailwind-react-native-classnames";
import {StackNavigationProp} from "@react-navigation/stack";
import {Feather} from "@expo/vector-icons";
import BodyText from "../components/BodyText";
import RNPickerSelect from "react-native-picker-select";
import NewItemContainer from "../components/NewItemContainer";

export default function NewRecord({navigation}: { navigation: StackNavigationProp<any> }) {
    const [stats, setStats] = useState<{ label: string, score: number }[]>([]);

    const canSave = !!(stats.length && stats.every(d => d.label && d.score));

    return (
        <NewItemContainer navigation={navigation} canSave={canSave} itemName="record" onSave={() => null}>
            <View style={tw`mt-4`}>
                {stats.map((stat, i) => (
                    <View style={tw`px-3 h-12 border flex-row items-center bg-white border-gray-100 px-4`} key={i}>
                        <Pressable
                            style={tw`h-full w-12 justify-center`} onPress={() => {
                            let newStats = [...stats];
                            newStats.splice(i, 1);
                            setStats(newStats);
                        }}
                        >
                            <View style={tw`w-6 h-6 bg-red-400 rounded-full items-center justify-center`}>
                                <Feather name="minus" color="white" size={16}/>
                            </View>
                        </Pressable>
                        <TextInput
                            placeholder="Happiness"
                            style={{fontSize: 16}}
                            value={stat.label}
                            onChangeText={newValue => {
                                let newStats = [...stats];
                                let newStat = {...stat};
                                newStat.label = newValue;
                                newStats.splice(i, 1, newStat);
                                setStats(newStats);
                            }}
                        />
                        <View style={tw`ml-auto`}>
                            <RNPickerSelect
                                placeholder={{label: "Score", value: null}}
                                style={{
                                    inputIOS: tw.style(`w-24 border-l-2 border-gray-100 pl-4 -mr-5 h-12`, {fontSize: 16}),
                                    inputAndroid: tw.style(`w-24 border-l-2 border-gray-100 -mr-5 h-12`, {fontSize: 16})
                                }}
                                onValueChange={(value) => {
                                    let newStats = [...stats];
                                    let newStat = {...stat};
                                    newStat.score = +value;
                                    newStats.splice(i, 1, newStat);
                                    setStats(newStats);
                                }}
                                items={Array(7).fill(0).map((d, i) => ({label: (i + 1).toString(), value: (i + 1).toString()}))}
                            />
                        </View>
                    </View>
                ))}
                <Pressable
                    style={tw`px-3 border flex-row items-center h-12 bg-white border-gray-100`}
                    onPress={() => setStats([...stats, {label: "", score: 0}])}
                >
                    <View style={tw`w-6 h-6 bg-green-400 rounded-full items-center justify-center`}>
                        <Feather name="plus" color="white" size={16}/>
                    </View>
                    <BodyText className="ml-6">New stat</BodyText>
                </Pressable>
            </View>
            <TextInput
                multiline={true}
                style={tw.style(`bg-white text-base p-4 mt-4 border-t border-b border-gray-100`, {minHeight: 128})}
                placeholder="Add note: an explanation, context, etc."
            />
        </NewItemContainer>
    );
};