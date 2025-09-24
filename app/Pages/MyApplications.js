import React from "react";
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";

export default function MyApplications({navigation}) {
  return (
    <SafeAreaView style={{ backgroundColor: "#ffffffff" }}>
      <View style={{ paddingTop: 18, paddingBottom: 10, paddingHorizontal: 16, backgroundColor: "#fefefeff", borderBottomWidth: 1, borderBottomColor: "#E5E7EB",}}>
        <Text style={{ fontSize: 20, fontWeight: "700", color: "#002D62" }}>My Applications</Text>
      </View>
      <ScrollView>
        <View
          style={{ flexDirection: "row", padding: 14, margin: 16, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 18, }}>
          <View
            style={{ width: "20%", aspectRatio: 1, borderRadius: 14, backgroundColor: "#E6F3ED", alignItems: "center", justifyContent: "center", marginRight: 12,}}>
            <Text style={{ fontSize: 16, fontWeight: "800", color: "#002D62" }}>AC</Text>
          </View>
          <View style={{ width: "80%" }}>
            <Text style={{ fontSize: 16, fontWeight: "700", color: "#0B1B13" }}>Iqra Girls College</Text>
            <Text style={{ marginTop: 4, fontSize: 13, color: "#6B7280" }}>BS Computer Science</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
              <View style={{ paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, backgroundColor: "#FEF3C7" }}>
                <Text style={{ fontSize: 12, fontWeight: "700", color: "#92400E" }}>Pending</Text>
              </View>
              <Text style={{ fontSize: 12, color: "#6B7280" }}>Last Update: 30 Aug 2025</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("ApplicationDetails")}
            style={{ marginTop: 10, backgroundColor: "#002D62", paddingVertical: 10, borderRadius: 12, alignItems: "center" }}>
              <Text style={{ color: "#FFFFFF", fontWeight: "700" }}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
