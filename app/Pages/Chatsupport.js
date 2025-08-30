import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

const Chatsupport = () => {
  return (
    <View style={{ height: "100%", width: "100%", backgroundColor: "#fff" }}>
      <Text style={{ fontSize: 28, fontWeight: "bold", marginTop: 30, textAlign: "center" }}>Chat Support</Text>
      <Text style={{ fontSize: 16, marginTop: 60, marginStart: 30 }}>We're here to help you. Please select an{"\n"}option below.</Text>
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginStart: 30 }}>Start Chat</Text>
        <TouchableOpacity>
          <Text style={{ fontSize: 16, marginTop: 5, marginStart: 30 }}>Chat with us</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginStart: 30 }}>Email</Text>
        <Text style={{ fontSize: 16, marginTop: 5, marginStart: 30 }}>We'll email you</Text>
      </View>
      <TouchableOpacity style={{ borderWidth: 1, borderRadius: 12, height: 50, justifyContent: "center", alignItems: "center", marginTop: 80, width: "90%", alignSelf: "center", backgroundColor: "#003366" }}>
        <Text style={{ fontSize: 18, fontWeight: "500", color: "#fff" }}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}
export default Chatsupport