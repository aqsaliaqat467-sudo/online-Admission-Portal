import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
const Login = ({ navigation }) => {
    return (
        <View style={{ backgroundColor: "#ffffffff", width: '100%', height: '100%' }}>
            <View style={{ width: '20%', height: 70, backgroundColor: "#ffffffff", borderColor: "#003366", borderWidth: 3, borderRadius: 20, justifyContent: "center", alignSelf: "center", marginTop: 40, }} >
                <Text style={{ fontSize: 40, fontWeight: "bold", color: "#003366", textAlign: "center" }}>A</Text>
            </View>
            <View style={{ width: "100%", height: "90%", backgroundColor: "#ffff" }}>
                <View style={{ backgroundColor: "#ffffffff", marginTop: 50 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 25, textAlign: 'center' }}>Sign in to your account</Text>
                </View>
                <Text style={{ marginStart: 40, marginTop: 30 }}>Email</Text>
                <TextInput
                    placeholder="ex: jon.smith@email.com"
                    placeholderTextColor="#c2c2c2ff"
                    style={{ backgroundColor: "#F4F4F4", borderRadius: 10, width: '80%', height: 40, justifyContent: "center", marginStart: 40, marginTop: 5 }}>
                </TextInput>
                <Text style={{ marginStart: 40, marginTop: 10 }}>Password</Text>
                <TextInput
                    placeholder="********"
                    placeholderTextColor="#c2c2c2ff"
                    style={{ backgroundColor: "#F4F4F4", borderRadius: 10, width: '80%', height: 40, justifyContent: "center", marginStart: 40, marginTop: 5 }}>
                </TextInput>
                <TouchableOpacity onPress={() => navigation.navigate("Forgotpass")}
                style={{ marginTop: 5 }}>
                    <Text style={{ color: "#002D6", fontWeight: "600", fontSize: 12, textAlign: "right", marginRight: 35 }}>Forgot Password</Text>
                </TouchableOpacity>
                <TouchableOpacity   onPress={() => navigation.navigate("Splash")}
                style={{ backgroundColor: "#002D62", borderRadius: 8, alignSelf: "center", width: '80%', height: 45, justifyContent: "center", marginTop: 15 }}>
                    <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16, textAlign: "center" }}>SIGN IN</Text>
                </TouchableOpacity>
                <Text style={{ textAlign: "center", fontWeight: "200", marginTop: 5 }}>or sign in with</Text>
                <TouchableOpacity style={{ backgroundColor: "#F4F4F4", width: "13%", height: "6%", alignSelf: "center", marginTop: 10 }}>
                    <Text style={{ textAlign: "center" }}>🔵🟢🟡🔴</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                    <Text style={{ color: "#3b3b3bff", fontWeight: "300", fontSize: 11, textAlign: "center", marginTop: 10 }}>Don’t have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                        <Text style={{ color: "#003366", fontWeight: "800", fontSize: 11, marginTop: 10 }}>Signup</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Login