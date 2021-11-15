import Container from "../../components/Container";
import {Pressable, Text} from "react-native";
import tw from "tailwind-react-native-classnames";
import React from "react";
import H1 from "../../components/H1";
import {StackNavigationProp} from "@react-navigation/stack";
import firebase from "firebase";
import {useUser} from "../../components/UserProvider";
import BodyText from "../../components/BodyText";
import Constants from "expo-constants";
import * as GoogleSignIn from 'expo-google-sign-in';

export default function Settings({navigation}: { navigation: StackNavigationProp<any> }) {
    const {user, setUser} = useUser();

    if (!user) {
        navigation.navigate("Login");
    }

    return user ? (
        <Container noScroll={true}>
            <H1 className="my-6">Settings</H1>
            <BodyText>Signed in as {user.displayName} with email {user.email}</BodyText>
            <Pressable
                onPress={() => {
                    if (Constants.appOwnership !== "expo") {
                        (async () => {
                            await GoogleSignIn.signOutAsync();
                            if (setUser) setUser(null);
                            navigation.navigate("Login");
                        })();
                    } else {
                        firebase.auth().signOut();
                    }
                }}
                style={tw`p-2 bg-gray-100 items-center mt-4`}
            >
                <BodyText>Sign out</BodyText>
            </Pressable>
        </Container>
    ) : <></>;
}