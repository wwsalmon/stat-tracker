import tw from "tailwind-react-native-classnames";
import {Pressable, Text, View} from "react-native";
import React from "react";
import {format} from "date-fns";

export default function RecordCard({stats, note, date}: {
    stats: {
        score: number,
        label: string,
        bgClass: string,
    }[],
    note: string,
    date: string,
}) {
    return (
        <Pressable style={tw`my-4 rounded border-gray-300`}>
            {stats.map((d, i) => (
                <View style={tw.style(`h-12 flex-row items-center px-4`, d.bgClass, i === 0 && "rounded-t")} key={date + d.label}>
                    <Text style={tw`text-white w-8 font-bold`}>{d.score}</Text>
                    <Text style={tw`text-white`}>{d.label}</Text>
                </View>
            ))}
            <View style={tw`p-4 border-l border-b border-r border-gray-200 rounded-b bg-gray-50`}>
                <Text style={tw`mb-2`} numberOfLines={1}>{note}</Text>
                <Text style={tw`text-xs text-gray-400`}>{format(new Date(date), "MMMM d, yyyy 'at' h:mm a")}</Text>
            </View>
        </Pressable>
    );
}