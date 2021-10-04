import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";
import {useUser} from "./UserProvider";
import {RecordObj, StatObj} from "../utils/types";
import Container from "./Container";
import H1 from "./H1";
import {format} from "date-fns";
import BodyText from "./BodyText";
import firebase from "firebase";
import {Pressable, View, Text, ScrollView, Alert} from "react-native";
import tw from "tailwind-react-native-classnames";
import {Feather} from "@expo/vector-icons";

export default function LogItemMain({navigation, route, setModalOpen, iter, recordId}: {
    navigation: StackNavigationProp<any>,
    route: RouteProp<any>,
    setModalOpen: Dispatch<SetStateAction<boolean>>,
    iter: number,
    recordId?: string,
}) {
    if (!recordId) {
        navigation.navigate("Log Main");
        return <></>;
    }

    const user = useUser();
    const [record, setRecord] = useState<RecordObj & {joinedStats: StatObj[]} | null>(null);

    useEffect(() => {
        if (!user) {
            navigation.navigate("Login");
            return;
        }

        const db = firebase.firestore();

        db
            .collection(`users/${user.uid}/records`)
            .doc(recordId)
            .get()
            .then(snapshot => {
                if (!snapshot.data()) {
                    navigation.navigate("Log Main");
                    return;
                }

                const data: RecordObj = {id: snapshot.id, ...snapshot.data()} as RecordObj;

                const uniqueIds = data.stats.map(d => d.statId);

                db
                    .collection(`users/${user.uid}/stats`)
                    .where(firebase.firestore.FieldPath.documentId(), "in", uniqueIds)
                    .get()
                    .then(querySnapshot => {
                        let stats: StatObj[] = [];

                        querySnapshot.forEach(doc => {
                            stats.push({
                                id: doc.id,
                                ...doc.data(),
                            } as StatObj);
                        })

                        const joinedRecord = {...data, joinedStats: stats} as RecordObj & {joinedStats: StatObj[]};

                        setRecord(joinedRecord);
                    });
            })
    }, [recordId, iter]);

    const combinedStats = record ? record.joinedStats.map(d => ({...d, value: record.stats.find(x => x.statId === d.id)?.value})) : null;
    const numberStats = combinedStats ? combinedStats.filter(d => d.type !== "note") : null;
    const textStats = combinedStats ? combinedStats.filter(d => d.type === "note") : null;

    function onDelete() {
        if (!user) return;

        const db = firebase.firestore();

        db
            .collection(`users/${user.uid}/records`)
            .doc(recordId)
            .delete()
            .then(() => {
                navigation.navigate("Log Main", {refresh: true});
            });
    }

    return (
        <Container withTabs={true} noScroll={true}>
            <View style={tw`flex-row items-center my-4`}>
                <Pressable onPress={() => navigation.goBack()} style={tw`flex-row items-center`}>
                    <Feather name="arrow-left" size={20}/>
                    <BodyText className="ml-2">Back</BodyText>
                </Pressable>
                <Pressable style={tw`ml-auto`} onPress={() => setModalOpen(true)}>
                    <Feather name="edit-2" size={20} color="#aaaaaa"/>
                </Pressable>
                <Pressable style={tw`ml-8`} onPress={() => Alert.alert(
                    "Delete record",
                    "Are you sure you want to delete this record? This action cannot be undone.",
                    [{text: "Delete", style: "destructive", onPress: onDelete}, {text: "Cancel", style: "cancel"}]
                )}>
                    <Feather name="trash" size={20} color="lightcoral"/>
                </Pressable>
            </View>
            {record ? (
                <ScrollView>
                    <Text style={tw`text-xl font-bold mb-6`}>Record from {format(new Date(record.createdAt.seconds * 1000), "MMMM d, yyyy 'at' h:mm aa")}</Text>
                    {numberStats && numberStats.map((stat, i) => (
                        <View
                            style={tw.style(`h-12 flex-row items-center px-4`, {backgroundColor: stat.color}, i === 0 && "rounded-t", i === numberStats.length - 1 && (textStats && textStats.length === 0) && "rounded-b")}
                            key={record.id + stat.id}
                        >
                            <Text style={tw`text-white w-8 font-bold`}>{stat.value}</Text>
                            <Text style={tw`text-white`}>{stat.name}</Text>
                        </View>
                    ))}
                    {textStats && textStats.map((stat, i) => (
                        <View key={record.id + stat.id} style={tw.style(`px-4 py-3`, {backgroundColor: stat.color}, i === textStats.length - 1 && "rounded-b")}>
                            <Text style={tw`text-gray-300 my-3`}>{stat.name}</Text>
                            <BodyText className="text-white mb-3">{stat.value}</BodyText>
                        </View>
                    ))}
                </ScrollView>
            ) : (
                <BodyText>Loading...</BodyText>
            )}
        </Container>
    );
}