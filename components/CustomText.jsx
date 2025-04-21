import React from "react";
import { Text } from "react-native";

const CustomText = ({ children, style, weight = "Regular", ...props }) => {
    const fontFamilyMap = {
        Regular: "Rubik-Regular",
        Medium: "Rubik-Medium",
        Bold: "Rubik-Bold",
    };

    return (
        <Text style={[{ fontFamily: fontFamilyMap[weight] || "Rubik-Regular" }, style]} {...props}>
            {children}
        </Text>
    );
};

export default CustomText;