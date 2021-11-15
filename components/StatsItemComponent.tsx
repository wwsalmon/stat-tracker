import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {StackNavigationProp} from "@react-navigation/stack";
import {useUser} from "./UserProvider";
import {StatObj} from "../utils/types";
import firebase from "firebase";
import Container from "./Container";
import ItemHeader from "./ItemHeader";
import BodyText from "./BodyText";
import {ScrollView, View} from "react-native";
import tw from "tailwind-react-native-classnames";
import H2 from "./H2";

export default function StatsItemComponent({navigation, iter, setModalOpen, statId}: {
    navigation: StackNavigationProp<any>,
    iter: number,
    setModalOpen: Dispatch<SetStateAction<boolean>>,
    statId?: string,
}) {
    if (!statId) {
        navigation.navigate("Stats Main");
        return <></>;
    }

    const {user} = useUser();
    const [stat, setStat] = useState<StatObj | null>(null);

    useEffect(() => {
        if (!user) {
            navigation.navigate("Login");
            return;
        }

        const db = firebase.firestore();

        db
            .collection(`users/${user.email}/stats`)
            .doc(statId)
            .get()
            .then(snapshot => {
                if (!snapshot.data()) {
                    navigation.navigate("Stats Main");
                    return;
                }

                const data: StatObj = {id: snapshot.id, ...snapshot.data()} as StatObj;

                setStat(data);
            })
    }, [statId, iter]);

    function onDelete() {

    }

    return (
        <Container withTabs={true} noScroll={true}>
            <ItemHeader navigation={navigation} setModalOpen={setModalOpen} onDelete={onDelete} itemName="stat"/>
            {stat ? (
                <ScrollView>
                    <View style={tw`pb-60`}>
                        <H2 className="mb-6">Stat: {stat.name}</H2>
                        <BodyText>Type: {stat.type}</BodyText>
                        <View style={tw`flex-row items-center`}>
                            <BodyText>Color:</BodyText>
                            <View style={tw.style(`w-6 h-6 rounded-full ml-2`, {backgroundColor: stat.color})}/>
                        </View>
                    </View>
                </ScrollView>
            ) : (
                <BodyText>Loading...</BodyText>
            )}
        </Container>
    );
}