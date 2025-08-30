import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
const Home = (navigation) => {
    return (
        <View style={{ backgroundColor: "#ffff", height: '100%', width: '100%' }}>
            <View style={{ backgroundColor: "rgba(255, 255, 255, 0.73)" }}>
            </View>
            <View style={{ height: 120, width: '50%' }}>
                <Image source={require('./clg.png')} style={{ width: '80%', height: '160', marginStart: 115 }}></Image>
            </View>
            <Text style={{ textAlign: 'center', marginTop: 55, alignItems: "center", fontWeight: 'bold', color: "#003366", fontSize: 27, fontFamily: "Times New Roman" }}>Welcome to IGC</Text>
            <Image source={require('./images.png')} style={{ width: '100%', height: '50%', alignSelf: "center", marginTop: 20 }} ></Image>
        </View>
    )
}

export default Home