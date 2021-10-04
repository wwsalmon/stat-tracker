import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import BodyText from "../components/BodyText";
import {StackNavigationProp} from "@react-navigation/stack";
import HomeContainer from "../components/HomeContainer";
import {StatObj} from "../utils/types";
import {useUser} from "../components/UserProvider";
import firebase from "firebase";
import {Pressable, View} from "react-native";
import {RouteProp} from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";

export default function StatsMainComponent({navigation, iter, setIter, setModalOpen}: {
    navigation: StackNavigationProp<any>,
    setIter: Dispatch<SetStateAction<number>>,
    iter: number,
    setModalOpen: Dispatch<SetStateAction<boolean>>,
}) {
    const user = useUser();
    const [stats, setStats] = useState<StatObj[]>([]);
    const [refreshing, setRefreshing] = useState<boolean>(false);

    useEffect(() => {
        if (!user) return navigation.navigate("Login");

        const db = firebase.firestore();
        db
            .collection(`users/${user.uid}/stats`)
            .get()
            .then(querySnapshot => {
                let stats: StatObj[] = [];

                querySnapshot.forEach(doc => {
                    stats.push({
                        id: doc.id,
                        ...doc.data(),
                    } as StatObj);
                });

                setStats(stats);
                setRefreshing(false);
            });
    }, [iter]);

    function onRefresh() {
        setRefreshing(true);
        setIter(iter + 1);
    }

    return (
        <HomeContainer
            navigation={navigation}
            onPress={() => setModalOpen(true)}
            onRefresh={onRefresh}
            refreshing={refreshing}
        >
            {stats.map(stat => (
                <Pressable
                    key={stat.id}
                    style={tw`py-4 border-b border-gray-300 flex-row items-center`}
                    onPress={() => navigation.navigate("Stats Item", {statId: stat.id})}
                >
                    <View style={tw.style(`h-4 w-4 mr-4 rounded-full`, {backgroundColor: stat.color})}/>
                    <BodyText>{stat.name}</BodyText>
                    <BodyText className="ml-auto text-gray-400">{stat.type}</BodyText>
                </Pressable>
            ))}
        </HomeContainer>
    );
}