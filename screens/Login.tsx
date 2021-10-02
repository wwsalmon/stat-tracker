import React, {useEffect} from "react";
import Container from "../components/Container";
import H1 from "../components/H1";
import {Pressable} from "react-native";
import BodyText from "../components/BodyText";
import {StackNavigationProp} from "@react-navigation/stack";
import {useUser} from "../components/UserProvider";
import * as Google from "expo-auth-session/providers/google";
import firebase from "firebase";

export default function Login({navigation}: {navigation: StackNavigationProp<any>}) {
    const user = useUser();

    useEffect(() => {
        if (user) navigation.navigate("Home");
    }, [user]);

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
        {
            clientId: "426374293625-qvfs79tfflc1cqm19vdea3lslmbfpkb3.apps.googleusercontent.com",
        },
    );

    useEffect(() => {
        if (response?.type === "success") {
            const { id_token } = response.params;

            const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
            firebase.auth().signInWithCredential(credential).then(() => {
                navigation.navigate("Home");
            });
        }
    }, [response]);

    return (
        <Container>
            <H1 className="my-6">Log in</H1>
            <Pressable onPress={() => promptAsync()}><BodyText>Sign in</BodyText></Pressable>
        </Container>
    );
}