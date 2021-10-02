import React, {useEffect, useState} from "react";
import BodyText from "../../components/BodyText";
import {StackNavigationProp} from "@react-navigation/stack";
import HomeContainer from "../../components/HomeContainer";
import {StatObj} from "../../utils/types";
import {useUser} from "../../components/UserProvider";
import firebase from "firebase";
import {View} from "react-native";
import {RouteProp} from "@react-navigation/native";

export default function Stats({route, navigation}: {route: RouteProp<any>, navigation: StackNavigationProp<any>}) {
    const user = useUser();
    const [stats, setStats] = useState<StatObj[]>([]);

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
            });
    }, [route.params && route.params.refresh]);

    return (
        <HomeContainer navigation={navigation} onPress={() => navigation.navigate("New Stat")}>
            {stats.map(stat => (
                <View key={stat.id}>
                    <BodyText>{stat.name} {stat.type}</BodyText>
                </View>
            ))}
        </HomeContainer>
    );
}