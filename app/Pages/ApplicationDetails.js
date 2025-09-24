import React from "react";
import { View, Text, SafeAreaView } from "react-native";

export default function ApplicationDetails() {
  return (
    <SafeAreaView style={{ backgroundColor: "#ffffffff" }}>
      <View style={{ backgroundColor: "#ffffffff", padding: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "700", color: "#002D62" }}>Application Details</Text>
      </View>
      <View style={{ backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 12, marginTop: 10, padding: 10 }}>
        <Text style={{ fontWeight: "700" }}>Iqra Girls College</Text>
        <Text>BS Computer Science</Text>
        <Text>Submitted On: 25 Aug 2025</Text>
      </View>
      <View style={{ backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 12, marginTop: 10, padding: 10 }}>
        <Text style={{ fontWeight: "700" }}>Student Information</Text>
        <Text>Name: Ayesha khan</Text>
        <Text>Father's Name: Ahmed Khan</Text>
        <Text>Email: ayesha@example.com</Text>
        <Text>Phone: 0300-1234567</Text>
      </View>
      <View style={{ backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 12, marginTop: 10, padding: 10 }}>
        <Text style={{ fontWeight: "700" }}>Application Status</Text>
        <Text>Status: Pending</Text>
        <Text>Last Updated: 30 Aug 2025</Text>
        <Text>Remarks: Your application is under review.</Text>
      </View>
    </SafeAreaView>
  );
}