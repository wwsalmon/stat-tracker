import tw from "tailwind-react-native-classnames";
import React, {ReactNode} from "react";
import {Text} from "react-native";

export default function H1({children, className}: {
    children: ReactNode,
    className?: string,
}) {
    return (
        <Text style={tw.style(`text-3xl font-bold`, className)}>{children}</Text>
    );
}