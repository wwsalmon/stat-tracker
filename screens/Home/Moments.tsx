import React, {useEffect, useState} from "react";
import {Pressable, Text, View} from "react-native";
import HomeContainer from "../../components/HomeContainer";
import {StackNavigationProp} from "@react-navigation/stack";
import tw from "tailwind-react-native-classnames";
import RecordCard from "../../components/RecordCard";
import {useActionSheet} from "@expo/react-native-action-sheet";
import {useUser} from "../../components/UserProvider";
import {RecordObj, StatObj} from "../../utils/types";
import firebase from "firebase";
import {RouteProp} from "@react-navigation/native";
import BodyText from "../../components/BodyText";

export default function Moments({route, navigation}: {route: RouteProp<any>, navigation: StackNavigationProp<any>}) {
    const user = useUser();
    const [records, setRecords] = useState<RecordObj[]>([]);

    useEffect(() => {
        if (!user) return navigation.navigate("Login");

        const db = firebase.firestore();
        db
            .collection(`users/${user.uid}/records`)
            .get()
            .then(querySnapshot => {
                let records: RecordObj[] = [];

                querySnapshot.forEach(doc => {
                    records.push({
                        id: doc.id,
                        ...doc.data(),
                    } as RecordObj);
                });

                setRecords(records);
            });
    }, [route.params && route.params.refresh]);

    const {showActionSheetWithOptions} = useActionSheet();

    return (
        <HomeContainer navigation={navigation} onPress={() => showActionSheetWithOptions({
            options: ["Moment", "Daily recap", "Weekly recap", "Monthly recap", "Cancel"],
            cancelButtonIndex: 4
        }, i => {
            if (i !== 4) navigation.navigate("New");
        })}>
            {records.map(record => (
                <Pressable key={record.id} onPress={() => null}>
                    {record.stats.map(stat => (
                        <BodyText key={record.id + stat.statId}>{stat.statId} {stat.value}</BodyText>
                    ))}
                </Pressable>
            ))}
            <RecordCard stats={[
                {label: "Stress", score: 0, bgClass: "bg-blue-500"},
                {label: "Anxiety", score: 0, bgClass: "bg-purple-500"},
            ]} note="Feeling great! completely at peace with myself" date="2021-09-21"/>
            <RecordCard stats={[
                {label: "Stress", score: 2, bgClass: "bg-blue-500"},
                {label: "Anxiety", score: 4, bgClass: "bg-purple-500"},
            ]} note="Not feeling great, kinda anxious, a little stressed" date="2021-09-19"/>
            <RecordCard stats={[
                {label: "Happiness", score: 8, bgClass: "bg-yellow-500"},
            ]} note="Feeling hella good! Spent the afternoon with friends" date="2021-09-18"/>
        </HomeContainer>
    );
}