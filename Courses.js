import { View, Text, TouchableOpacity, Image } from 'react-native'
import { AntDesign, Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import React from 'react'

const Courses = () => {
    return (
        <View style={{ backgroundColor: "#ffff", height: "100%" }}>
            <View style={{ backgroundColor: "#ffffffff", padding: 10, }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", marginRight: 40 }}>
                    <View style={{ width: '20%', height: 56, borderRadius: 30, backgroundColor: "#002D62", justifyContent: "center", alignItems: "center", }}>
                        <Text style={{ fontSize: 24, color: "#fff" }}>🎓</Text>
                    </View>
                    <View style={{ backgroundColor: "#eeeeeeff", borderRadius: 10, padding: 8, }}>
                        <Text style={{ fontSize: 12, fontWeight: 'bold', textAlign: "center" }}>Admission Offered{"\n"}By Iqra Girls College  </Text>
                    </View>
                </View>
            </View>
            <View style={{ backgroundColor: "#ffffffff", flexDirection: "row", justifyContent: "space-around" }}>
                <Text style={{ fontWeight: 'bold', fontSize: 17, marginTop: 8 }}>Admission</Text>
                <View style={{ width: '56%', height: 20, backgroundColor: "#D9D9D9", borderRadius: 12, marginTop: 9 }}>
                    <View style={{ width: '25%', height: 13, backgroundColor: "#003366", borderRadius: 12, alignItems: "flex-start", marginTop: 4, marginLeft: 9 }}>
                        <TouchableOpacity style={{ flexDirection: "row", marginTop: 1, marginLeft: 3 }}>
                            <Ionicons name="search" size={9} color="#ffffff" />
                            <Text style={{ fontSize: 8, marginLeft: 5, color: "#ffffff" }}>Search</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '27%', height: 13, backgroundColor: "#beb9b9ff", borderRadius: 12, marginTop: -13, alignSelf: "flex-end", marginRight: 8 }}>
                        <TouchableOpacity style={{ flexDirection: "row", marginLeft: 2 }}>
                            <Ionicons name="location" size={11} color="#000000ff" />
                            <Text style={{ fontWeight: 'bold', fontSize: 8, color: "#000000ff" }}>Location</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Image source={require('./images.png')} style={{ width: '90%', height: 180, alignSelf: 'center', borderRadius: 20, marginTop: 12 }}></Image>
            <View style={{ backgroundColor: "#0b3c66", borderRadius: 10, marginTop: 25, height: 40, width: "70%", alignSelf: "center" }}>
                <Text style={{ color: "#fff", fontWeight: "700", marginTop: 9, textAlign: "center", fontSize: 18 }}>View Courses</Text>
            </View>
            <TouchableOpacity style={{ width: '55%', height: 40, backgroundColor: "#D9D9D9", borderRadius: 10, marginTop: 15, marginStart: 80 }}>
                <Text style={{ fontSize: 20, color: "#000000ff", textAlign: "center", marginTop: 5 }}>BS 4-Years</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: '55%', height: 40, backgroundColor: "#D9D9D9", borderRadius: 10, marginTop: 15, marginStart: 80 }}>
                <Text style={{ fontSize: 20, color: "#000000ff", textAlign: "center", marginTop: 5 }}>ADP</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: '55%', height: 40, backgroundColor: "#D9D9D9", borderRadius: 10, marginTop: 15, marginStart: 80 }}>
                <Text style={{ fontSize: 20, color: "#000000ff", textAlign: "center", marginTop: 5 }}>Intake</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Courses