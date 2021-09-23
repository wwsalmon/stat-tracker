import React, {ReactNode} from "react";
import tw from "tailwind-react-native-classnames";
import {Dimensions, View} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {StatusBar} from "expo-status-bar";

export default function Container({children, className, withTabs, noScroll}: { children: ReactNode, className?: string, withTabs?: boolean, noScroll?: boolean }) {
    const InnerEl = () => (
        <View style={tw.style("px-4 pt-12", className)}>
            {children}
        </View>
    );

    return (
        <View style={tw.style(`bg-white`, {minHeight: Dimensions.get("window").height - (withTabs ? 72 : 0)})}>
            {noScroll ? (
                <InnerEl/>
            ) : (
                <KeyboardAwareScrollView>
                    <InnerEl/>
                </KeyboardAwareScrollView>
            )}
            <StatusBar style="auto"/>
        </View>
    );
}