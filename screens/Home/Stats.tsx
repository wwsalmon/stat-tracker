import React, {useEffect, useState} from "react";
import BodyText from "../../components/BodyText";
import {StackNavigationProp} from "@react-navigation/stack";
import HomeContainer from "../../components/HomeContainer";
import {StatObj} from "../../utils/types";
import {useUser} from "../../components/UserProvider";
import firebase from "firebase";
import {View} from "react-native";
import {RouteProp} from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";

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
                <View key={stat.id} style={tw`py-4 border-b border-gray-300 flex-row items-center`}>
                    <View style={tw.style(`h-4 w-4 mr-4 rounded-full`, {backgroundColor: stat.color})}/>
                    <BodyText>{stat.name}</BodyText>
                    <BodyText className="ml-auto text-gray-400">{stat.type}</BodyText>
                </View>
            ))}
        </HomeContainer>
    );
}