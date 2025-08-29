import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { ImageBackground } from 'expo-image'
import { AntDesign } from "@expo/vector-icons";


const Main = ({navigation}) => {
  return (
    <View >
      <ImageBackground
        source={require("./Main.png")} style={{ width: "100%", height: '100%', justifyContent: "center", alignItems: "center" }}>
        <View style={{ width: '20%', height: 70, backgroundColor: "#fff", borderRadius: 20, justifyContent: "center", alignItems: "center", marginBottom: 20, marginTop:200 }} >
          <Text style={{ fontSize: 40, fontWeight: "bold", color: "#003366" }}>A</Text>
        </View>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff", textAlign: "center", letterSpacing: 1, marginBottom: 20 }}>ONLINE ADMISSION PORTAL
        </Text>
        <View style={{height:"10%", width:"90%",  alignItems:"center", marginTop:180}}>
        <View style={{ backgroundColor: "#107ce7ff", borderRadius: 12, width: '60%', height: 50, flexDirection: "row", alignItems: "center", }}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}
          style={{ backgroundColor: '#fff', width: '25%', height: 50, borderRadius: 7, alignItems: 'center', justifyContent: 'center', }}>
            <AntDesign name="doubleright" size={24} color="black" />
          </TouchableOpacity>
          <Text style={{ fontWeight: 'bold', fontSize: 20, color: "#ffff", justifyContent: "center", textAlign: "center", marginStart: 10, }} >GET STARTED</Text>
        </View>
        </View>
      </ImageBackground>
    </View>
  )
}

export default Main