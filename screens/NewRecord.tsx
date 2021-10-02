import React, {useEffect, useState} from "react";
import {Pressable, ScrollView, TextInput, View} from "react-native";
import tw from "tailwind-react-native-classnames";
import {StackNavigationProp} from "@react-navigation/stack";
import {Feather} from "@expo/vector-icons";
import BodyText from "../components/BodyText";
import RNPickerSelect from "react-native-picker-select";
import NewItemContainer from "../components/NewItemContainer";
import {useUser} from "../components/UserProvider";
import {RecordStatObj, StatObj} from "../utils/types";
import firebase from "firebase";
import {SlideModal} from "react-native-slide-modal";

export default function NewRecord({navigation}: { navigation: StackNavigationProp<any> }) {
    const user = useUser();
    const [stats, setStats] = useState<StatObj[]>([]);
    const [thisStats, setThisStats] = useState<(StatObj & {value: string | number})[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        if (!user) return navigation.navigate("Login");
    }, []);

    useEffect(() => {
        if (!searchQuery) {
            setStats([]);
            return;
        }

        const endQuery = searchQuery.replace(/.$/, c => String.fromCharCode(c.charCodeAt(0) + 1));

        const db = firebase.firestore();
        db
            // @ts-ignore
            .collection(`users/${user.uid}/stats`)
            .where("name", ">=", searchQuery)
            .where("name", "<", endQuery)
            .get()
            .then(querySnapshot => {
                let stats: StatObj[] = [];

                querySnapshot.forEach(doc => {
                    stats.push({
                        id: doc.id,
                        ...doc.data(),
                    } as StatObj);
                });

                const filteredStats = stats.filter(d => !thisStats.some(x => x.id === d.id));

                setStats(filteredStats);
            });
    }, [searchQuery]);

    const canSave = thisStats.length && thisStats.every(d => d.value !== "" && d.value !== null && d.value !== undefined);

    function onSave() {
        if (!(canSave && user)) return;

        const db = firebase.firestore();
        db
            .collection(`users/${user.uid}/records`)
            .add({
                createdAt: new Date(),
                stats: thisStats.map(stat => ({
                    statId: stat.id,
                    value: stat.value,
                })),
            })
            .then(res => {
                setThisStats([]);
                navigation.navigate("Log", {refresh: true});
            }).catch(e => console.log(e));
    }

    return (
        <NewItemContainer navigation={navigation} canSave={true} itemName="record" onSave={onSave}>
            <View style={tw`my-4`}>
                <TextInput
                    style={tw.style(`h-12 bg-white px-4`, {fontSize: 16})}
                    placeholder="Search for stat to add"
                    value={searchQuery}
                    onChangeText={text => setSearchQuery(text)}
                />
                {stats.map(stat => (
                    <Pressable
                        key={stat.id}
                        style={tw`h-12 bg-white px-4 flex-row items-center border-t border-gray-100`}
                        onPress={() => {
                            setSearchQuery("");
                            setThisStats([{...stat, value: stat.type === "note" ? "" : 0}, ...thisStats]);
                        }}
                    >
                        <View style={tw`w-6 h-6 mr-4 bg-green-400 rounded-full items-center justify-center`}>
                            <Feather name="plus" color="white" size={16}/>
                        </View>
                        <BodyText>{stat.name}</BodyText>
                    </Pressable>
                ))}
            </View>
            {thisStats.map((stat, i) => (
                <React.Fragment key={stat.id}>
                    <View style={tw`px-3 h-12 border flex-row items-center bg-white border-gray-100 px-4`}>
                        <Pressable
                            style={tw`h-full justify-center`}
                            onPress={() => {
                                let newStats = [...thisStats];
                                newStats.splice(i, 1);
                                setThisStats(newStats);
                            }}
                        >
                            <View style={tw`w-6 h-6 mr-4 bg-red-400 rounded-full items-center justify-center`}>
                                <Feather name="minus" color="white" size={16}/>
                            </View>
                        </Pressable>
                        <BodyText>{stat.name}</BodyText>
                        {stat.type !== "note" && (
                            <View style={tw`ml-auto`}>
                                {stat.type === "score" ? (
                                    <RNPickerSelect
                                        placeholder={{label: "Score", value: null}}
                                        style={{
                                            inputIOS: tw.style(`w-24 border-l border-gray-100 pl-4 h-12`, {fontSize: 16}),
                                            inputAndroid: tw.style(`w-24 border-l border-gray-100 h-12`, {fontSize: 16})
                                        }}
                                        onValueChange={(value) => {
                                            let newStats = [...thisStats];
                                            let newStat = {...stat};
                                            newStat.value = +value;
                                            newStats.splice(i, 1, newStat);
                                            setThisStats(newStats);
                                        }}
                                        items={Array(7).fill(0).map((d, i) => ({label: (i + 1).toString(), value: (i + 1).toString()}))}
                                    />
                                ) : (
                                    <TextInput
                                        style={tw.style(`w-24 border-l border-gray-100 pl-4 h-12`, {fontSize: 16})}
                                        placeholder="Number"
                                        keyboardType="numeric"
                                        value={stat.value.toString()}
                                        onChangeText={text => {
                                            let newStats = [...thisStats];
                                            let newStat = {...stat};
                                            newStat.value = +text;
                                            newStats.splice(i, 1, newStat);
                                            setThisStats(newStats);
                                        }}
                                    />
                                )}
                            </View>
                        )}
                    </View>
                    {stat.type === "note" && (
                        <TextInput
                            multiline={true}
                            style={tw.style(`bg-white text-base px-4 pt-2 pb-3 border-b border-gray-100`, {minHeight: 128})}
                            placeholder="Add note: an explanation, context, etc."
                            value={stat.value.toString()}
                            onChangeText={text => {
                                let newStats = [...thisStats];
                                let newStat = {...stat};
                                newStat.value = text;
                                newStats.splice(i, 1, newStat);
                                setThisStats(newStats);
                            }}
                        />
                    )}
                </React.Fragment>
            ))}
        </NewItemContainer>
    );
};