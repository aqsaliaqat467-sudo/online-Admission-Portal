import React from "react";
import { View, Text } from "react-native";

export default function Terms() {
  return (
    <View style={{ height: "100%", width: "100%", backgroundColor: "#fff" }}>
      <Text style={{ fontSize: 28, fontWeight: "bold", marginTop: 30, marginStart: 20 }}>Terms of Use</Text>
      <View style={{ marginTop: 30 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginStart: 20 }}>User Responsibilities</Text>
        <Text style={{ fontSize: 16, marginTop: 5, marginStart: 20 }}>You are responsible for all activities that{"\n"}occur under your account. You agree to not{"\n"}misuse the app in any way.</Text>
      </View>
      <View style={{ marginTop: 30 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginStart: 20 }}>Prohibited Activities</Text>
        <Text style={{ fontSize: 16, marginTop: 5, marginStart: 20 }}>Engaging in illegal activities or using the{"\n"}app for unauthorized purposes is strictly{"\n"}prohibited.</Text>
      </View>
      <View style={{ marginTop: 30 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginStart: 20 }}>Account Termination</Text>
        <Text style={{ fontSize: 16, marginTop: 5, marginStart: 20 }}>We reserve the right to terminate or suspend{"\n"}your account at our discretion.</Text>
      </View>
      <View style={{ marginTop: 30, marginBottom: 40 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginStart: 20 }}>Payment & Refund Policy</Text>
        <Text style={{ fontSize: 16, marginTop: 5, marginStart: 20 }}>Please review our payment and refund{"\n"}policy.</Text>
      </View>
    </View>
  );
}
