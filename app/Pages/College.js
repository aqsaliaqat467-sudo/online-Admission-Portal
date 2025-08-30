import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import { AntDesign, Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import React from 'react'
import Carousel from "react-native-reanimated-carousel";
const { width } = Dimensions.get("window");

const College = ({navigation}) => {
      const images = [
    "https://picsum.photos/id/1018/600/400",
    "https://picsum.photos/id/1025/600/400",
    "https://picsum.photos/id/1035/600/400",
  ];
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
                    <View style={{ width: '25%', height: 13, backgroundColor: "#0b3c66", borderRadius: 12, alignItems: "flex-start", marginTop: 4, marginLeft: 9 }}>
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
             <View style={{ flex: 1, justifyContent: "center" }}>
      <Carousel
        loop
        width={width}
        height={250}
        autoPlay={true}
        data={images}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={{ width: "100%", height: "100%", borderRadius: 12 }}
            resizeMode="cover"
          />
        )}
      />
    </View>
            {/* <Image source={require('./images.png')} style={{ width: '90%', height: 180, alignSelf: 'center', borderRadius: 20, marginTop: 12 }}></Image> */}
            <TouchableOpacity onPress={() => navigation.navigate("Courses")}
                style={{ backgroundColor: "#0b3c66", borderRadius: 10, marginTop: 25, height: 40, width: "70%", alignSelf: "center" }}>
                <Text style={{ color: "#fff", fontWeight: "700", marginTop: 9, textAlign: "center", fontSize: 18 }}>View Courses</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Clgprofile")}
                style={{ backgroundColor: "#0b3c66", borderRadius: 10, marginTop: 25, height: 40, width: "70%", alignSelf: "center" }}>
                <Text style={{ color: "#fff", fontWeight: "700", marginTop: 9, textAlign: "center", fontSize: 18 }}>View profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Stories")}
                style={{ backgroundColor: "#0b3c66", borderRadius: 10, marginTop: 25, height: 40, width: "70%", alignSelf: "center" }}>
                <Text style={{ color: "#fff", fontWeight: "700", marginTop: 9, textAlign: "center", fontSize: 18 }}>Success Stories</Text>
            </TouchableOpacity>
            <View style={{ width: '20%', height: 70, backgroundColor: "#D9D9D9", borderRadius: 100, alignItems: "center", marginTop: 15, alignSelf: "flex-end", marginRight: 15 }}>
                <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
                    <Ionicons name="chatbox-outline" size={50} style={{ color: "black", marginTop: 11 }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default College