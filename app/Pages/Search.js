import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";

const SearchScreen = () => {
  const [query, setQuery] = useState("");

  return (
    <View style={{ backgroundColor: "#f9f9f9", padding: 16 }}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search colleges..."
        style={{ height: 50, borderWidth: 1, borderColor: "#ccc", borderRadius: 12, paddingHorizontal: 16, backgroundColor: "#fff",marginBottom: 20}}/>
    </View>
  );
};

export default SearchScreen;
