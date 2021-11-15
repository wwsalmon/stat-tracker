import React, {useEffect, useState} from "react";
import Container from "../components/Container";
import H1 from "../components/H1";
import {Pressable, TextInput, View} from "react-native";
import BodyText from "../components/BodyText";
import {StackNavigationProp} from "@react-navigation/stack";
import {useUser} from "../components/UserProvider";
import * as Google from "expo-auth-session/providers/google";
import firebase from "firebase";
import tw from "tailwind-react-native-classnames";
import * as GoogleSignIn from 'expo-google-sign-in';
import Constants from 'expo-constants';

export default function Login({navigation}: {navigation: StackNavigationProp<any>}) {
    const {user, setUser} = useUser();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    useEffect(() => {
        if (user) {
            navigation.navigate("Home");
        } else {
            if (Constants.appOwnership !== "expo") {
                initAsync();
            }
        }
    }, [user && user.email]);

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

    const initAsync = async () => {
        await GoogleSignIn.initAsync({
            clientId: "426374293625-8gl4ik9931rsqi6map4gfgbasnaalgji.apps.googleusercontent.com",
        });
        const newUser = await GoogleSignIn.signInSilentlyAsync();
        if (!newUser || !setUser) return;
        setUser(newUser);
    };

    const signInAsync = async () => {
        try {
            await GoogleSignIn.askForPlayServicesAsync();
            const {user: newUser} = await GoogleSignIn.signInAsync();
            if (!newUser) return alert('Failed to log in, no user');
            if (!setUser) return;
            setUser(newUser);
        } catch ({ message }) {
            alert('login: Error:' + message);
        }
    };

    const canLoginWithEmail = !!(email && password);

    function loginWithEmail() {
        if (!canLoginWithEmail) return;

        firebase.auth().signInWithEmailAndPassword(email, password);
    }

    return (
        <Container noScroll={true}>
            <H1 className="my-6">Log in</H1>
            <Pressable onPress={() => (Constants.appOwnership === "expo") ? promptAsync() : signInAsync()} style={tw`p-2 bg-gray-100 rounded items-center`}>
                <BodyText>Sign up/in with Google</BodyText>
            </Pressable>
            <View style={tw`mt-8 border-gray-300 border-t w-full h-8`}/>
            <TextInput
                value={email}
                onChangeText={text => setEmail(text)}
                style={tw.style(`border rounded border-gray-300 p-2 mb-2 text-black`, {fontSize: 16})}
                placeholder="Email"
            />
            <TextInput
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
                style={tw.style(`border rounded border-gray-300 p-2 mb-2 text-black`, {fontSize: 16})}
                placeholder="Password"
            />
            <Pressable
                onPress={() => loginWithEmail()}
                style={tw`p-2 bg-gray-100 rounded items-center`}
                disabled={!canLoginWithEmail}
            >
                <BodyText>Sign in</BodyText>
            </Pressable>
        </Container>
    );
}