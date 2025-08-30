import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

const Privacypolicy = () => {
  return (
    <View style={{ height: "100%", width: "100%", backgroundColor: "#fff" }}>
      <Text style={{ fontSize: 28, fontWeight: "bold", marginTop: 30, marginStart: 20 }}>Privacy Policy</Text>
      <View style={{ marginTop: 30 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginStart: 20 }}>Personal Data</Text>
        <Text style={{ fontSize: 16, marginTop: 5, marginStart: 20 }}>We collect and use information about you as described in our privacy policy.</Text>
      </View>
      <View style={{ marginTop: 30 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginStart: 20 }}>Cookies</Text>
        <Text style={{ fontSize: 16, marginTop: 5, marginStart: 20, marginEnd: 20 }}>Our app uses cookies to enhance your experience.</Text>
      </View>
      <View style={{ marginTop: 30 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginStart: 20 }}>Data Security</Text>
        <Text style={{ fontSize: 16, marginTop: 5, marginStart: 20, marginEnd: 20 }}>We take appropriate measures to protect your data.</Text>
      </View>
      <View style={{ marginTop: 30 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginStart: 20 }}>Third-Party Services</Text>
        <Text style={{ fontSize: 16, marginTop: 5, marginStart: 20, marginEnd: 20 }}>Our app may use third-party services; please review their privacy policies.</Text>
      </View>
      <View style={{ marginTop: 80, flexDirection: "row", justifyContent: "space-around" }}>
        <TouchableOpacity style={{ borderWidth: 1, borderRadius: 12, height: 50, justifyContent: "center", width: "40%", backgroundColor: "#003366" }}>
          <Text style={{ fontSize: 18, fontWeight: "500", textAlign: "center", color: "#fff" }}>I Agree</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ borderWidth: 1, borderRadius: 12, height: 50, justifyContent: "center", width: "40%", backgroundColor: "#003366" }}>
          <Text style={{ fontSize: 18, fontWeight: "500", textAlign: "center", color: "#fff" }}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default Privacypolicy