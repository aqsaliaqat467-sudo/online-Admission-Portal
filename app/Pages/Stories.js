import React from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
const Stories = () => {
    return (
        <View style={{ height: "100%", width: "100%" }}>
            <ScrollView style={{ backgroundColor: "#fff" }}>
                <Text style={{ fontSize: 22, fontWeight: "bold", marginTop: 10, marginStart: 10 }}>Success Stories</Text>
                <Text style={{ color: "#555555ff", marginStart: 10, marginBottom: 10 }}>Showcase graduate achievements and testimonials</Text>
                <View style={{ borderWidth: 1, borderColor: "#ddd", borderRadius: 10, margin: 10, backgroundColor: "#fff" }}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ width: "12%", height: 40, borderRadius: 20, marginStart: 10, marginTop: 10, marginBottom: 5, backgroundColor: "#ccc" }} />
                        <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 15, width: "40%", marginStart: 10 }}>Hadia</Text>
                    </View>
                    <Text style={{ color: "#555", marginStart: 10, marginBottom: 5 }}>Computer Science - Class of 2023</Text>
                    <Text style={{ fontWeight: "bold", marginStart: 10, marginRight: 10 }}>Secured a position at Google as a Software Engineer</Text>
                    <Text style={{ color: "#555", margin: 10 }}>The faculty's support and comprehensive curriculum helped me land my dream job. The practical projects and industry connections were invaluable.</Text>
                    <View>
                        <View style={{ flexDirection: "row", marginStart: 10, marginBottom: 5 }}>
                            <TouchableOpacity>
                                <Text style={{ marginRight: 20 }}>❤️ Like ()</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text>💬 Comment</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ margin: 10 }}>
                            <TextInput
                                placeholder="Write a comment..."
                                style={{ borderWidth: 1, borderColor: "#ddd", borderRadius: 5, height: 40, marginBottom: 5 }} />
                            <TouchableOpacity>
                                <Text style={{ color: "blue" }}>Post</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ borderWidth: 1, borderColor: "#ddd", borderRadius: 10, margin: 10, backgroundColor: "#fff", }}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ width: "12%", height: 40, borderRadius: 20, backgroundColor: "#ccc", marginStart: 10, marginTop: 10, marginBottom: 5 }} />
                        <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 15, width: "40%", marginStart: 10 }}>Rabia Naz</Text>
                    </View>
                    <Text style={{ color: "#555", marginStart: 10, marginBottom: 5 }}> Artificial Intelligence - Class of 2023</Text>
                    <Text style={{ fontWeight: "bold", marginStart: 10 }}> Published research in a leading AI journal</Text>
                    <Text style={{ color: "#555", margin: 10 }}>The research opportunities provided by the college allowed me to explore cutting-edge AI techniques that contributed to my publication.</Text>
                    <View>
                        <View style={{ flexDirection: "row", marginStart: 10, marginBottom: 5 }}>
                            <TouchableOpacity>
                                <Text style={{ marginRight: 20 }}>❤️ Like ()</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text>💬 Comment</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ margin: 10 }}>
                            <TextInput
                                placeholder="Write a comment..."
                                style={{ borderWidth: 1, borderColor: "#ddd", borderRadius: 5, height: 40, marginBottom: 5 }} />
                            <TouchableOpacity>
                                <Text style={{ color: "blue" }}>Post</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ borderWidth: 1, borderColor: "#ddd", borderRadius: 10, margin: 10, backgroundColor: "#fff", }}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ width: "12%", height: 40, borderRadius: 20, backgroundColor: "#ccc", marginStart: 10, marginTop: 10, marginBottom: 5 }} />
                        <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 15, width: "40%", marginStart: 10 }}>Sara Khan</Text>
                    </View>
                    <Text style={{ color: "#555", marginStart: 10, marginBottom: 5 }}> Data Science - Class of 2021</Text>
                    <Text style={{ fontWeight: "bold", marginStart: 10 }}> Joined Microsoft as a Data Scientist</Text>
                    <Text style={{ color: "#555", margin: 10 }}>Hands-on training in machine learning and real-world datasets gave me the confidence and skillset to secure a role at one of the top tech companies.</Text>
                    <View>
                        <View style={{ flexDirection: "row", marginStart: 10, marginBottom: 5 }}>
                            <TouchableOpacity>
                                <Text style={{ marginRight: 20 }}>❤️ Like ()</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text>💬 Comment</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ margin: 10 }}>
                            <TextInput
                                placeholder="Write a comment..."
                                style={{ borderWidth: 1, borderColor: "#ddd", borderRadius: 5, height: 40, marginBottom: 5 }} />
                            <TouchableOpacity>
                                <Text style={{ color: "blue" }}>Post</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
export default Stories