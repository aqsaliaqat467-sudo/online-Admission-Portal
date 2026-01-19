import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from 'react-redux';
import { setRole } from '../redux/Slices/HomeDataSlice';

const Eprofile = ({ navigation }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.home.user);

    const handlelogout = () => {
        dispatch(setRole(""));
        // navigation.navigate("Login");
    };
    return (
        <View style={{ height: "100%", width: "100%", backgroundColor: "#fff" }}>
            <View style={{ flexDirection: "row", alignItems: "center", padding: 30 }}>
                <TouchableOpacity onPress={() => navigation.navigate("Profile12")} style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: "#f0f0f0", justifyContent: "center", alignItems: "center", overflow: 'hidden', borderWidth: 2, borderColor: '#0b3c66' }}>
                    {user?.imageUrl ? (
                        <Image 
                            source={{ uri: user.imageUrl }} 
                            style={{ width: '100%', height: '100%' }}
                            resizeMode="cover"
                        />
                    ) : (
                        <Ionicons name="person" size={30} color="#000" />
                    )}
                </TouchableOpacity>
                <View style={{ padding: 10 }}>
                    <TouchableOpacity onPress={() => navigation.navigate("Profile12")}>
                    <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000" }}>{user?.name || 'User'}</Text>
                    <Text style={{ fontSize: 14, color: "gray" }}>{user?.email || ''}</Text>
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