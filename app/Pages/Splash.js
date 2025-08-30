import { View, Text, Image, TouchableOpacity, ScrollView, ImageBackground } from 'react-native'
import { AntDesign, Ionicons, FontAwesome6 } from "@expo/vector-icons";
import React from 'react'

const Splash = ({navigation}) => {
    return (
        <View style={{ height: "100%", width: "100%", backgroundColor: "#ffffffff" }}>
            <ImageBackground source={require('./uos.jpg')} style={{ width: '100%', height: 205, justifyContent: "flex-start" }}>
                <View style={{ marginTop: 10, marginStart: 40 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: "#000000ff" }}>Find the Best College{"\n"}for Your Admission</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", backgroundColor: "#fff", borderRadius: 20, width: "80%", height: 27, alignSelf: "center", marginVertical: 10, marginTop: 15 }}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: "center" }}>
                        <Ionicons name="location" size={14} color="#817f7f" />
                        <Text style={{ fontWeight: 'bold', fontSize: 10, marginStart: 5, color: "#817f7f" }}>Locations</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: "center", backgroundColor: "#c7c6c6ff", borderRadius: 12, paddingHorizontal: 8, paddingVertical: 2 }}>
                        <FontAwesome6 name="building-columns" size={12} color="#817f7f" />
                        <Text style={{ fontWeight: 'bold', fontSize: 10, marginStart: 5, color: "#817f7f" }}>Colleges</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: "center", backgroundColor: "#003366", borderRadius: 12, paddingHorizontal: 8, paddingVertical: 2 }}>
                        <Ionicons name="search" size={12} color="#fff" />
                        <Text style={{ fontWeight: 'bold', fontSize: 10, marginStart: 5, color: "#fff" }}>Search</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: "#fff", borderRadius: 70, width: "20%", height: "35%", alignSelf: "flex-end", alignItems: "center", marginRight: 10, marginTop: 20 }}>
                    <Text style={{ fontSize: 12, textAlign: "center", marginTop: 10 }}>Choose</Text>
                    <Text style={{ fontSize: 12, textAlign: "center" }}>your</Text>
                    <Text style={{ fontSize: 12, textAlign: "center" }}>College</Text>
                </View>
            </ImageBackground>
            <View style={{ height: "50%", width: "100%", backgroundColor: "#fff" }}>
                <View style={{ height: 150, width: '40%', backgroundColor: "#d7d7d7ff", marginTop: 40, marginLeft: 25 }}>
                    <Image source={require('./images.png')} style={{ width: '100%', height: 110, alignSelf: 'center' }}></Image>
                     <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                    <Text style={{ fontWeight: 'bold', marginStart: 8, marginTop: 9 }}>Iqra Girls College</Text>
                    <TouchableOpacity  onPress={() => navigation.navigate("College")}
                    style={{ marginTop:5 }}>
                        <AntDesign name="arrowright" size={30} color="black" />
                    </TouchableOpacity>
                    </View>
                </View>
                <View style={{ height: 150, width: '40%', backgroundColor: "#d7d7d7ff", marginTop: 30, marginLeft: 25 }}>
                    <Image source={require('./supp.jpg')} style={{ width: '100%', height: 110, alignSelf: 'center' }}></Image>
                     <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                    <Text style={{ fontWeight: 'bold', marginStart: 8, marginTop: 9 }}>Superior College</Text>
                    <TouchableOpacity style={{ marginTop:5 }}>
                        <AntDesign name="arrowright" size={30} color="black" />
                    </TouchableOpacity>
                    </View>
                </View>
                <View style={{ height: 150, width: '40%', backgroundColor: "#d7d7d7ff", alignSelf: "flex-end", marginRight: 20, marginTop: -330 }}>
                    <Image source={require('./ucp.jpg')} style={{ width: '100%', height: 110, alignSelf: 'center' }}></Image>
                     <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                    <Text style={{ fontWeight: 'bold', marginStart: 8, marginTop: 9 }}>Punjab College</Text>
                    <TouchableOpacity style={{ marginTop:4 }}>
                        <AntDesign name="arrowright" size={30} color="black" />
                    </TouchableOpacity>
                    </View>
                </View>
                <View style={{ height: 150, width: '40%', backgroundColor: "#d7d7d7ff", alignSelf: "flex-end", marginRight: 20, marginTop: 30 }}>
                    <Image source={require('./ilm.jpg')} style={{ width: '100%', height: 110, alignSelf: 'center' }}></Image>
                    <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                    <Text style={{ fontWeight: 'bold', marginStart: 8, marginTop: 9 }}>ILM College</Text>
                    <TouchableOpacity style={{ marginTop:4 }}>
                        <AntDesign name="arrowright" size={30} color="black" />
                    </TouchableOpacity>
                    </View>
                </View>


            </View>
        </View>
    )
}

export default Splash
