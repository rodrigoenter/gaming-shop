import React from "react";
import { Text } from "react-native";

const CustomText = ({ children, style, ...props }) => {
    return (
        <Text style={[{ fontFamily: "Rubik-Regular" }, style]} {...props}>
            {children}
        </Text>
    );
};

export default CustomText;
