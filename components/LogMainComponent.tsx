import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import HomeContainer from "./HomeContainer";
import {StackNavigationProp} from "@react-navigation/stack";
import RecordCard from "./RecordCard";
import {useUser} from "./UserProvider";
import {RecordObj, StatObj} from "../utils/types";
import firebase from "firebase";
import {View} from "react-native";
import tw from "tailwind-react-native-classnames";
import {RouteProp} from "@react-navigation/native";

export default function LogMainComponent({navigation, route, iter, setModalOpen}: {
    navigation: StackNavigationProp<any>,
    route: RouteProp<any>,
    iter: number,
    setModalOpen: Dispatch<SetStateAction<boolean>>,
}) {
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
            .orderBy("createdAt", "desc")
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
    }, [iter, user, route.params && route.params.refresh]);

    return (
        <HomeContainer navigation={navigation} onPress={() => setModalOpen(true)}>
            <View style={tw`pb-72`}>
                {records.map(record => (
                    <RecordCard record={record} key={record.id} navigation={navigation}/>
                ))}
            </View>
        </HomeContainer>
    );
}