import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

const Password = ({navigation}) => {
    return (
        <View style={{ height: "100%", width: "100%", backgroundColor: "#ffffffff" }}>
            <Text style={{ fontSize: 22, fontWeight: "700", color: "#000000ff", marginTop: 20, marginStart: 20 }}>Change password</Text>
            <Text style={{ color: "#000000ff", marginTop: 10, marginStart: 15 }} >  Your password must be at least 6 characters and{"\n"}  should include a combination of numbers, letters{"\n"}  and special characters (!@$%).</Text>
            <TextInput
                placeholder="Current password"
                placeholderTextColor="#999"
                style={{ backgroundColor: "#F4F4F4", borderRadius: 10, width: '80%', height: 40, justifyContent: "center", alignSelf: "center", marginTop: 20, borderColor: "#000000ff", borderWidth: 1, borderColor: "#d1d5db", }}>
            </TextInput>
            <TextInput
                placeholder="New password"
                placeholderTextColor="#999"
                style={{ backgroundColor: "#F4F4F4", borderRadius: 10, width: '80%', height: 40, justifyContent: "center", alignSelf: "center", marginTop: 20, borderColor: "#000000ff", borderWidth: 1, borderColor: "#d1d5db", }}>
            </TextInput>
            <TextInput
                placeholder="Re-type new password"
                placeholderTextColor="#999"
                style={{ backgroundColor: "#F4F4F4", borderRadius: 10, width: '80%', height: 40, justifyContent: "center", alignSelf: "center", marginTop: 20, borderColor: "#000000ff", borderWidth: 1, borderColor: "#d1d5db", }}>
            </TextInput>
            <TouchableOpacity  onPress={() => navigation.navigate("Forgotpass")}>
                <Text style={{ color: "#3b82f6", marginTop: 10, marginStart: 30 }}>  Forgot your password?</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPressOut={() => navigation.navigate("Eprofile")}
            style={{ backgroundColor: "#1d4ed8", width: '80%', height: 45, borderRadius: 12, justifyContent: "center", alignItems: "center", alignSelf: "center", marginTop: 20 }}>
                <Text style={{ color: "#fff", fontWeight: "700" }}>Change password</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Password;