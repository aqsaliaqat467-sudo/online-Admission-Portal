import { View, Text, TouchableOpacity, Image } from 'react-native'
import { AntDesign, Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import React from 'react'
const Cdetails = ({navigation}) => {
    return (
        <View style={{ backgroundColor: "#ffff", height: "100%" }}>
            <View style={{ backgroundColor: "#ffffffff", padding: 10, }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", marginRight: 40 }}>
                    <View style={{ width: '20%', height: 56, borderRadius: 30, backgroundColor: "#002D62", justifyContent: "center", alignItems: "center", }}>
                        <Text style={{ fontSize: 24, color: "#fff" }}>🎓</Text>
                    </View>
                    <View style={{ backgroundColor: "#eeeeeeff", borderRadius: 10, padding: 8, }}>
                        <Text style={{ fontSize: 12, fontWeight: 'bold', textAlign: "center" }}>    Admission Offered{"\n"}By Iqra Girls College  </Text>
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
            <View style={{ backgroundColor: "#d3d3d3", height: 440, width: '90%', borderRadius: 12, alignSelf: "center", marginTop: 15 }}>
                <View style={{ alignItems: "center", marginTop: 15 }}>
                    <Text style={{ fontSize: 20, fontWeight: '600' }}>Course Details</Text>
                </View>
                <Text style={{ fontSize: 18, fontWeight: "700", marginTop: 10 }}>  BS Computer Science</Text>
                <Text style={{ fontWeight: "700", marginTop: 5 }}>  Course outline</Text>
                <Text style={{ fontSize: 14 }}>  •  Introduction to programming</Text>
                <Text style={{ fontSize: 14 }}>  •  Data Structures</Text>
                <Text style={{ fontSize: 14 }}>  •  Operating Systems</Text>
                <Text style={{ fontWeight: "700", marginTop: 5 }}>  Duration</Text>
                <Text>     4 years</Text>
                <Text style={{ fontWeight: "700", marginTop: 5 }}>  Criteria</Text>
                <Text>    Intermediate with Mathematics or equivalent</Text>
                <Text style={{ fontWeight: "700", marginTop: 5 }}>  Fee Plan</Text>
                <Text>   50,000 per semester</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Admission")}
                style={{ backgroundColor: "#0b3c66", borderRadius: 8, alignSelf: "center", width: '80%', height: 45, justifyContent: "center", marginTop: 15 }}>
                    <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16, textAlign: "center" }}>Apply</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Chat")}
                style={{ backgroundColor: "#0b3c66", borderRadius: 8, alignSelf: "center", width: '80%', height: 45, justifyContent: "center", marginTop: 15 }}>
                    <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16, textAlign: "center" }}>Ask a Question</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default Cdetails