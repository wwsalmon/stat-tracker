import React, {useEffect, useState} from "react";
import Container from "../components/Container";
import H1 from "../components/H1";
import firebase from "firebase";
import {Pressable} from "react-native";
import BodyText from "../components/BodyText";
import {StackNavigationProp} from "@react-navigation/stack";
import {useUser} from "../App";

export default function Login({navigation}: {navigation: StackNavigationProp<any>}) {
    const user = useUser();

    useEffect(() => {
        if (user) navigation.navigate("Home");
    }, [user]);

    const signInWithFirebase = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider)
            .then(res => {
                navigation.navigate("Home");
            }).catch(e => {
                console.log(e);
            });
    };

    return (
        <Container>
            <H1 className="my-6">Log in</H1>
            <Pressable onPress={signInWithFirebase}><BodyText>Sign in</BodyText></Pressable>
        </Container>
    );
}