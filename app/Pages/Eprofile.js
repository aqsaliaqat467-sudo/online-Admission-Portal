import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch } from 'react-redux';
import { setRole } from '../redux/Slices/HomeDataSlice';

const Eprofile = ({ navigation }) => {
    const dispatch = useDispatch();

    const handlelogout = () => {
        dispatch(setRole(""));
    };
    return (
        <View style={{ height: "100%", width: "100%", backgroundColor: "#fff" }}>
            <View style={{ flexDirection: "row", alignItems: "center", padding: 30 }}>
                <View style={{ width: '19%', height: 60, borderRadius: 30, backgroundColor: "#92bce7ff", justifyContent: "center", alignItems: "center", }}>
                    <Ionicons name="person" size={30} color="#000" />
                </View>
                <View style={{ padding: 10 }}>
                    <TouchableOpacity onPress={() => navigation.navigate("Profile12")}>
                    <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000" }}> Haya Pectrus</Text>
                    <Text style={{ fontSize: 14, color: "gray" }}>haya12@gmail.com</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity  onPress={() => navigation.navigate("Setting")}>
                <View style={{ marginLeft:65 }}>
                    <Ionicons name="settings-sharp" size={22} color="#000" />
                </View>
                </TouchableOpacity>
            </View>

            <View
                style={{ backgroundColor: "#ebe8e8ff", borderRadius: 15, paddingVertical: 25, width: "90%", alignSelf: "center" }} >
                {/* <TouchableOpacity  onPress={() => navigation.navigate("Profile")}
                style={{ flexDirection: "row", alignItems: "center", padding: 15, }} >
                    <Ionicons name="create-outline" size={20} color="gray" />
                    <Text style={{ marginLeft: 15, fontSize: 16, color: "#000" }}>Edit Profile</Text>
                    <Ionicons name="chevron-forward" size={18} color="gray" style={{ marginLeft: "auto" }} />
                </TouchableOpacity> */}

                 {/* <TouchableOpacity  onPress={() => navigation.navigate("MyApplications")}
                style={{ flexDirection: "row", alignItems: "center", padding: 15, }} >
                    <MaterialCommunityIcons name="application" size={20} color="gray" />
                    <Text style={{ marginLeft: 15, fontSize: 16, color: "#000" }}>Application Details</Text>
                    <Ionicons name="chevron-forward" size={18} color="gray" style={{ marginLeft: "auto" }} />
                </TouchableOpacity> */}

                <TouchableOpacity  onPress={() => navigation.navigate("Privacy")}
                style={{ flexDirection: "row", alignItems: "center", padding: 15, }} >
                    <Ionicons name="settings-outline" size={20} color="gray" />
                    <Text style={{ marginLeft: 15, fontSize: 16, color: "#000" }}>Privacy Setting</Text>
                    <Ionicons name="chevron-forward" size={18} color="gray" style={{ marginLeft: "auto" }} />
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => navigation.navigate("Password")}
                style={{ flexDirection: "row", alignItems: "center", padding: 15, }} >
                    <Ionicons name="shield-outline" size={20} color="gray" />
                    <Text style={{ marginLeft: 15, fontSize: 16, color: "#000" }}>Change Password</Text>
                    <Ionicons name="chevron-forward" size={18} color="gray" style={{ marginLeft: "auto" }} />
                </TouchableOpacity>

                <TouchableOpacity  onPress={() => navigation.navigate("Delete")}
                style={{ flexDirection: "row", alignItems: "center", padding: 15, }} >
                    <Ionicons name="trash-outline" size={20} color="gray" />
                    <Text style={{ marginLeft: 15, fontSize: 16, color: "#000" }}>Delete Account</Text>
                    <Ionicons name="chevron-forward" size={18} color="gray" style={{ marginLeft: "auto" }} />
                </TouchableOpacity>
                <TouchableOpacity  onPress={handlelogout}  style={{ flexDirection: "row", alignItems: "center", padding: 15, }} >
                    <Ionicons name="log-out-outline" size={20} color="gray" />
                    <Text style={{ marginLeft: 15, fontSize: 16, color: "#000" }}>Log out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Eprofile;