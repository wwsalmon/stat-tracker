import tw from "tailwind-react-native-classnames";
import {Pressable, Text, View} from "react-native";
import React from "react";
import {format} from "date-fns";
import {RecordObj, StatObj} from "../utils/types";
import {StackNavigationProp} from "@react-navigation/stack";

export default function RecordCard({record, navigation}: {record: RecordObj & {joinedStats: StatObj[]}, navigation: StackNavigationProp<any>}) {
    const combinedStats = record.joinedStats.map(d => ({...d, value: record.stats.find(x => x.statId === d.id)?.value}));
    const numberStats = combinedStats.filter(d => d.type !== "note");
    const textStats = combinedStats.filter(d => d.type === "note");

    return (
        <Pressable
            style={tw`my-4 rounded border-gray-300`}
            onPress={() => navigation.navigate("Log Item", {recordId: record.id})}
        >
            {numberStats.map((stat, i) => (
                <View
                    style={tw.style(`h-12 flex-row items-center px-4`, {backgroundColor: stat.color}, i === 0 && "rounded-t")}
                    key={record.id + stat.id}
                >
                    <Text style={tw`text-white w-8 font-bold`}>{stat.value}</Text>
                    <Text style={tw`text-white`}>{stat.name}</Text>
                </View>
            ))}
            {textStats.map((stat, i) => (
                <View key={record.id + stat.id} style={tw.style(`px-4 py-3`, {backgroundColor: stat.color}, i === 0 && numberStats.length === 0 && "rounded-t")}>
                    <Text style={tw`text-white`}>{stat.name}</Text>
                    <Text style={tw`text-gray-400`} numberOfLines={1}>{stat.value}</Text>
                </View>
            ))}
            <View style={tw`p-4 border-l border-b border-r border-gray-200 rounded-b bg-gray-50`}>
                <Text style={tw`text-xs text-gray-400`}>{format(new Date(record.createdAt.seconds * 1000), "MMMM d, yyyy 'at' h:mm a")}</Text>
            </View>
        </Pressable>
    );
}