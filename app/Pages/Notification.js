import React from "react";
import { View, Text, ScrollView } from "react-native";

const Notification = () => {
  return (
    <ScrollView style={{ backgroundColor: "#f9f9f9", padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>Notifications</Text>
      <View style={{ backgroundColor: "#fff", padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: "#ddd", }}>
        <Text style={{ fontSize: 16, fontWeight: "700", marginBottom: 4 }}>Application Status</Text>
        <Text style={{ fontSize: 14, color: "#555" }}>Your application is now under review.</Text>
      </View>
      <View style={{ backgroundColor: "#fff", padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: "#ddd", }}>
        <Text style={{ fontSize: 16, fontWeight: "700", marginBottom: 4 }}>New Message</Text>
        <Text style={{ fontSize: 14, color: "#555" }}>You received a message from ABC College.</Text>
      </View>
      <View
        style={{ backgroundColor: "#fff", padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: "#ddd", }}>
        <Text style={{ fontSize: 16, fontWeight: "700", marginBottom: 4 }}>Reminder</Text>
        <Text style={{ fontSize: 14, color: "#555" }}>Submit your documents before 10 Sep 2025.</Text>
      </View>
    </ScrollView>
  );
};

export default Notification;
