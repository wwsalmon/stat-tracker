import React, {ReactNode} from "react";
import tw from "tailwind-react-native-classnames";
import {Dimensions, View} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {StatusBar} from "expo-status-bar";

export default function Container({children, className, withTabs, noScroll}: { children: ReactNode, className?: string, withTabs?: boolean, noScroll?: boolean }) {
    return (
        <View style={tw`bg-white`}>
            {noScroll ? (
                <View style={tw.style("px-4 pt-12", {minHeight: Dimensions.get("window").height - (withTabs ? 72 : 0)}, className)}>
                    {children}
                </View>
            ) : (
                <KeyboardAwareScrollView>
                    <View style={tw.style("px-4 pt-12", {minHeight: Dimensions.get("window").height - (withTabs ? 72 : 0)}, className)}>
                        {children}
                    </View>
                </KeyboardAwareScrollView>
            )}
            <StatusBar style="auto"/>
        </View>
    );
}