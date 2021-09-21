import React from "react";
import {Pressable, Text, View} from "react-native";
import HomeContainer from "../../components/HomeContainer";
import {StackNavigationProp} from "@react-navigation/stack";
import tw from "tailwind-react-native-classnames";
import RecordCard from "../../components/RecordCard";

export default function Moments({navigation}: {navigation: StackNavigationProp<any>}) {
    return (
        <HomeContainer navigation={navigation}>
            <RecordCard stats={[
                {label: "Stress", score: 0, bgClass: "bg-blue-500"},
                {label: "Anxiety", score: 0, bgClass: "bg-purple-500"},
            ]} note="Feeling great! completely at peace with myself" date="2021-09-21"/>
            <RecordCard stats={[
                {label: "Stress", score: 2, bgClass: "bg-blue-500"},
                {label: "Anxiety", score: 4, bgClass: "bg-purple-500"},
            ]} note="Not feeling great, kinda anxious, a little stressed" date="2021-09-19"/>
            <RecordCard stats={[
                {label: "Happiness", score: 8, bgClass: "bg-yellow-500"},
            ]} note="Feeling hella good! Spent the afternoon with friends" date="2021-09-18"/>
        </HomeContainer>
    );
}