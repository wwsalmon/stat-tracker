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
    const [records, setRecords] = useState<(RecordObj & {joinedStats: StatObj[]})[]>([]);

    useEffect(() => {
        console.log("useEffect firing");

        if (!user) {
            console.log("no user");
            navigation.navigate("Login");
            return;
        }

        console.log(user.uid);

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

                if (!records.length) {
                    setRecords([]);
                    return;
                }

                const allIds = records.reduce((a, b) => [...a, ...b.stats.map(d => d.statId)], [] as string[]);
                const uniqueIds = [...new Set(allIds)];

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

                        const joinedRecords = records.map(record => ({
                            ...record,
                            joinedStats: record.stats.map(d => stats.find(x => x.id === d.statId)).filter(d => d) as StatObj[],
                        }));

                        setRecords(joinedRecords);
                    });
            });
    }, [route.params && route.params.refresh, user]);

    const {showActionSheetWithOptions} = useActionSheet();

    return (
        <HomeContainer navigation={navigation} onPress={() => showActionSheetWithOptions({
            options: ["Moment", "Daily recap", "Weekly recap", "Monthly recap", "Cancel"],
            cancelButtonIndex: 4
        }, i => {
            if (i !== 4) navigation.navigate("New");
        })}>
            {records.map(record => (
                <RecordCard record={record} key={record.id}/>
            ))}
        </HomeContainer>
    );
}