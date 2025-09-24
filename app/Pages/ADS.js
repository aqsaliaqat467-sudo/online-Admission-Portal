import { View, Text, TouchableOpacity, Image } from 'react-native'
import { AntDesign, Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import React from 'react'

const ADS = ({navigation}) => {
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
                        <TouchableOpacity onPress={() => navigation.navigate("Search")}
                        style={{ flexDirection: "row", marginTop: 1, marginLeft: 3 }}>
                            <Ionicons name="search" size={9} color="#ffffff" />
                            <Text style={{ fontSize: 8, marginLeft: 5, color: "#ffffff" }}>Search</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '27%', height: 13, backgroundColor: "#beb9b9ff", borderRadius: 12, marginTop: -13, alignSelf: "flex-end", marginRight: 8 }}>
                        <TouchableOpacity onPress={() => navigation.navigate("Clgprofile")}
                        style={{ flexDirection: "row", marginLeft: 2 }}>
                            <Ionicons name="location" size={11} color="#000000ff" />
                            <Text style={{ fontWeight: 'bold', fontSize: 8, color: "#000000ff" }}>Location</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ backgroundColor: "#0b3c66", borderRadius: 10, marginTop: 20, height: 40, width: "70%", alignSelf: "center" }}>
                <Text style={{ color: "#fff", fontWeight: "700", marginTop: 8, textAlign: "center", fontSize: 18 }}>ADS (Science)</Text>
            </View>
            <View style={{ height: '60%', width: '100%', backgroundColor: "#ffffffff", marginTop: 12, borderRadius: 10 }}>
                <View style={{ height: 80, width: '95%', backgroundColor: "#D9D9D9", borderRadius: 10, alignSelf: "center", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10 }}>
                    <View>
                        <Text style={{ fontWeight: '800', fontSize: 22 }}> BS Computer Science</Text>
                        <Text style={{ fontSize: 17 }}> Study Computer Science{"\n"} and programming</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("ADSdetails")}
                    style={{ height: 40, width: '25%', backgroundColor: "#003366", borderRadius: 10, justifyContent: "center" }}>
                        <View>
                            <Text style={{ color: "#fff", fontSize: 17, fontWeight: "600", textAlign: "center" }}>View</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ height: 80, width: '95%', backgroundColor: "#D9D9D9", borderRadius: 10, marginTop: 3, alignSelf: "center", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10 }}>
                    <View>
                        <Text style={{ fontWeight: '800', fontSize: 22 }}> BS English</Text>
                        <Text style={{ fontSize: 17 }}> Explore English literature{"\n"} and language</Text>
                    </View>
                    <TouchableOpacity style={{ height: 40, width: '25%', backgroundColor: "#003366", borderRadius: 10, justifyContent: "center" }}>
                        <View>
                            <Text style={{ color: "#fff", fontSize: 17, fontWeight: "600", textAlign: "center" }}>View</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ height: 80, width: '95%', backgroundColor: "#D9D9D9", borderRadius: 10, marginTop: 3, alignSelf: "center", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10 }}>
                    <View>
                        <Text style={{ fontWeight: '800', fontSize: 22 }}> BS Mathematics</Text>
                        <Text style={{ fontSize: 17 }}> Focus on mathematical{"\n"} theories and techniques</Text>
                    </View>
                    <TouchableOpacity style={{ height: 40, width: '25%', backgroundColor: "#003366", borderRadius: 10, justifyContent: "center" }}>
                        <View>
                            <Text style={{ color: "#fff", fontSize: 17, fontWeight: "600", textAlign: "center" }}>View</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ height: 80, width: '95%', backgroundColor: "#D9D9D9", borderRadius: 10, marginTop: 3, alignSelf: "center", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10 }}>
                    <View>
                        <Text style={{ fontWeight: '800', fontSize: 22 }}> BS Chemistry</Text>
                        <Text style={{ fontSize: 17 }}> Learn about chemical{"\n"} processes and compounds</Text>
                    </View>
                    <TouchableOpacity style={{ height: 40, width: '25%', backgroundColor: "#003366", borderRadius: 10, justifyContent: "center" }}>
                        <View>
                            <Text style={{ color: "#fff", fontSize: 17, fontWeight: "600", textAlign: "center" }}>View</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ height: 80, width: '95%', backgroundColor: "#D9D9D9", borderRadius: 10, marginTop: 3, alignSelf: "center", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10 }}>
                    <View>
                        <Text style={{ fontWeight: '800', fontSize: 22 }}> BS Economics</Text>
                        <Text style={{ fontSize: 17 }}> Focus on economic theories{"\n"} and the study of scarcity</Text>
                    </View>
                    <TouchableOpacity style={{ height: 40, width: '25%', backgroundColor: "#003366", borderRadius: 10, justifyContent: "center" }}>
                        <View>
                            <Text style={{ color: "#fff", fontSize: 17, fontWeight: "600", textAlign: "center" }}>View</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ADS