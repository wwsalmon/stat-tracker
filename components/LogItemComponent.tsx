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
import ItemHeader from "./ItemHeader";
import H2 from "./H2";

export default function LogItemComponent({navigation, route, setModalOpen, iter, recordId}: {
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

    const {user} = useUser();
    const [record, setRecord] = useState<RecordObj & {joinedStats: StatObj[]} | null>(null);

    useEffect(() => {
        if (!user) {
            navigation.navigate("Login");
            return;
        }

        const db = firebase.firestore();

        db
            .collection(`users/${user.email}/records`)
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
                    .collection(`users/${user.email}/stats`)
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
            .collection(`users/${user.email}/records`)
            .doc(recordId)
            .delete()
            .then(() => {
                navigation.navigate("Log Main", {refresh: true});
            });
    }

    return (
        <Container withTabs={true} noScroll={true}>
            <ItemHeader navigation={navigation} setModalOpen={setModalOpen} onDelete={onDelete} itemName="record"/>
            {record ? (
                <ScrollView>
                    <View style={tw`pb-60`}>
                        <H2 className="mb-6">Record from {format(new Date(record.createdAt.seconds * 1000), "MMMM d, yyyy 'at' h:mm aa")}</H2>
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
                    </View>
                </ScrollView>
            ) : (
                <BodyText>Loading...</BodyText>
            )}
        </Container>
    );
}