import React from "react";
import { View, Text, Image, ScrollView } from "react-native";

const Clgprofile = () => {
    return (
        <ScrollView style={{ backgroundColor: "#fff" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginStart: 10, marginTop: 10 }}>Iqra Girls College</Text>
            <Image source={require('./map.png')} style={{ width: '100%', height: 200, alignSelf: 'center' }}></Image>
            <Text style={{ fontSize: 16, fontWeight: "bold", marginStart: 10, marginTop: 10, marginBottom: 5 }}>About</Text>
            <Text style={{ marginStart: 10, marginRight: 10, color: "#333", marginBottom: 10 }}>Iqra Girls College is a splendid addition in the educational history of Sargodha which distinguished itself in the queue of the best institutions of the city </Text>
            <View
                style={{ borderWidth: 1, borderColor: "#ddd", marginTop: 10, marginBottom: 10, width: "95%", alignSelf: "center" }}>
                <Text style={{ fontSize: 16, fontWeight: "bold", marginStart: 10, marginTop: 10, marginBottom: 5 }}>Facilities</Text>
                <Text style={{ marginStart: 20, marginBottom: 5 }}>• Library</Text>
                <Text style={{ marginStart: 20, marginBottom: 5 }}>• Sports Center</Text>
                <Text style={{ marginStart: 20, marginBottom: 5 }}>• Student Housing</Text>
                <Text style={{ marginStart: 20, marginBottom: 10 }}>• Cafeteria</Text>
            </View>
            <View style={{ flexDirection: "row", borderWidth: 1, borderColor: "#ddd", width: "95%", alignSelf: "center" }}>
                <View style={{ width: "60%", marginStart: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>Address</Text>
                    <Text>Plot 1 Lahore-Sargodha Rd, Chattah Town.{"\n"}Sargodha</Text>
                </View>
                <View style={{ width: "35%" }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>Contact</Text>
                    <Text>048 3220004</Text>
                </View>
            </View>
        </ScrollView>
    );
}
export default Clgprofile