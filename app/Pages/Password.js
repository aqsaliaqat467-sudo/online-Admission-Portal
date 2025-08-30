import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
const Password = () => {
    return (
        <View style={{ height: "100%", width: "100%", backgroundColor: "#ffffffff" }}>
            <Text style={{ fontSize: 22, fontWeight: "700", color: "#000000ff", marginTop: 20, marginStart: 20 }}>Change password</Text>
            <Text style={{ color: "#000000ff", marginTop: 10, marginStart: 15 }} >  Your password must be at least 6 characters and{"\n"}  should include a combination of numbers, letters{"\n"}  and special characters (!@$%).</Text>
            <View style={{ backgroundColor: "#F4F4F4", borderRadius: 10, width: "80%", height: 40, alignSelf: "center", marginTop: 20, borderWidth: 1, borderColor: "#d1d5db", }}>
                <View style={{ flexDirection: "row" }}>
                    <TextInput
                        placeholder="Current password"
                        placeholderTextColor="#999"
                        style={{ width: "88%", height: 40 }} />
                    <AntDesign name="eye" size={20} color="#999" style={{ alignSelf: "center" }} />
                </View>
            </View>
            <View style={{ backgroundColor: "#F4F4F4", borderRadius: 10, width: "80%", height: 40, alignSelf: "center", marginTop: 20, borderWidth: 1, borderColor: "#d1d5db", }}>
                <View style={{ flexDirection: "row" }}>
                    <TextInput
                        placeholder="New password"
                        placeholderTextColor="#999"
                        style={{ width: "88%", height: 40 }} />
                    <AntDesign name="eye" size={20} color="#999" style={{ alignSelf: "center" }} />
                </View>
            </View>
             <View style={{ backgroundColor: "#F4F4F4", borderRadius: 10, width: "80%", height: 40, alignSelf: "center", marginTop: 20, borderWidth: 1, borderColor: "#d1d5db", }}>
                <View style={{ flexDirection: "row" }}>
                    <TextInput
                        placeholder="Re-type new password"
                        placeholderTextColor="#999"
                        style={{ width: "88%", height: 40 }} />
                    <AntDesign name="eye" size={20} color="#999" style={{ alignSelf: "center" }} />
                </View>
            </View>
            <TouchableOpacity style={{ backgroundColor: "#1d4ed8", width: '80%', height: 45, borderRadius: 12, justifyContent: "center", alignItems: "center", alignSelf: "center", marginTop: 30 }}>
                <Text style={{ color: "#fff", fontWeight: "700" }}>Change password</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Password;
