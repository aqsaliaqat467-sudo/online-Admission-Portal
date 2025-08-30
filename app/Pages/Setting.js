import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { AntDesign, Ionicons, MaterialCommunityIcons, Foundation, Feather } from "@expo/vector-icons";

const Setting = () => {
  return (
    <View style={{ height: "100%", width: "100%", backgroundColor: "#ffff" }}>
      <Text style={{ fontWeight: "600", fontSize: 20, marginTop: 30, textAlign: "center" }}>Setting</Text>
      <View style={{ backgroundColor: "#ffffffff", height: 300, width: '90%', borderRadius: 12, alignSelf: "center", marginTop: 25, justifyContent: "space-evenly" }}>
        <View style={{ width: "100%", height: "70", backgroundColor: "#efeeeeff", borderRadius: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row" }}>
            <Ionicons name="notifications" size={24} style={{ color: "#000000ff", marginStart: 10 }} />
            <Text>  Notification</Text>
          </View>
          <TouchableOpacity style={{ justifyContent: "flex-end", marginRight: 10 }}>
            <AntDesign name="right" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ width: "100%", height: "70", backgroundColor: "#efeeeeff", borderRadius: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row" }}>
            <Foundation name="clipboard-notes" size={24} style={{ color: "#000000ff", marginStart: 13 }} />
            <Text>   Terms of Use</Text>
          </View>
          <TouchableOpacity style={{ justifyContent: "flex-end", marginRight: 10 }}>
            <AntDesign name="right" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ width: "100%", height: "70", backgroundColor: "#efeeeeff", borderRadius: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row" }}>
            <Feather name="info" size={24} style={{ color: "#000000ff", marginStart: 10 }} />
            <Text>  Privacy Policy</Text>
          </View>
          <TouchableOpacity style={{ justifyContent: "flex-end", marginRight: 10 }}>
            <AntDesign name="right" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ width: "100%", height: "70", backgroundColor: "#efeeeeff", borderRadius: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons name="chat" size={24} style={{ color: "#000000ff", marginStart: 10 }} />
            <Text>  Chat support</Text>
          </View>
          <TouchableOpacity style={{ justifyContent: "flex-end", marginRight: 10 }}>
            <AntDesign name="right" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Setting