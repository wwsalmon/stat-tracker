import React, {ReactNode} from "react";
import {Text} from "react-native";
import tw from "tailwind-react-native-classnames";

export default function H2({children, className}: { children: ReactNode, className?: string }) {
    return (
        <Text style={tw.style("text-xl font-bold", className)}>
            {children}
        </Text>
    );
}