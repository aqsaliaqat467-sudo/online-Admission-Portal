import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";

const Profile = () => {
    return (
        <ScrollView style={{ backgroundColor: "#ffffffff", height: '100%' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', padding: 10 }}> Profile Setting </Text>
            <View style={{ alignItems: 'center', paddingVertical: 15, backgroundColor: 'white' }}>
                <View style={{ width: '25%', height: 90, borderRadius: 50, backgroundColor: '#92bce7ff', alignItems: "flex-end", justifyContent: "flex-end" }}>
                    <TouchableOpacity><Ionicons name="camera-outline" size={30} color="#000" /></TouchableOpacity>
                </View>
            </View>
            <View style={{ width: '90%', alignSelf: 'center', height: 50, justifyContent: 'center', flexDirection: 'row', gap: 30 }}>
                <TextInput placeholder='First Name' value="Jon" style={{ borderBottomWidth: 1, borderColor: '#ccc', width: '45%' }} />
                <TextInput placeholder='Last Name' value="Smith" style={{ borderBottomWidth: 1, borderColor: '#ccc', width: '45%' }} />
            </View>
            <View style={{ width: '90%', alignSelf: 'center', marginTop: '9%' }}>
                <TextInput placeholder='Email' value="jon12@gmail.com" style={{ borderBottomWidth: 1, borderColor: '#ccc', paddingVertical: 8, width: '100%' }} />
            </View>
            <View style={{ width: '90%', alignSelf: 'center', marginTop: '9%' }}>
                <TextInput placeholder='Gender' value="Male" style={{ borderBottomWidth: 1, borderColor: '#ccc', paddingVertical: 8, width: '45%' }} />
                <TextInput placeholder='Phone' value="(+1) 23456789" style={{ borderBottomWidth: 1, borderColor: '#ccc', paddingVertical: 8, width: '45%', position: 'absolute', right: 0, top: 0 }} />
            </View>
            <View style={{ width: '90%', alignSelf: 'center', marginTop: '20%', justifyContent: 'center', alignItems: 'center', }}>
                <TouchableOpacity style={{ height: 50, backgroundColor: "#0b3c66", justifyContent: 'center', width: 300, alignItems: 'center', borderRadius: 20 }}>
                    <Text style={{ fontSize: 18, color: "#fff" }}> Save Changes</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Profile