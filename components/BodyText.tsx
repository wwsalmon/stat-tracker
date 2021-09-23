import React, {ReactNode} from "react";
import {Text} from "react-native";
import tw from "tailwind-react-native-classnames";

export default function BodyText({className, children}: {
    className?: string,
    children: ReactNode,
}) {
    return (
        <Text style={tw.style(`text-base`, className)}>{children}</Text>
    );
}