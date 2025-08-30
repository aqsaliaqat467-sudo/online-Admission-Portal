import { ScrollView, View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import Fontisto from '@expo/vector-icons/Fontisto';

const Admission = () => {
    return (
        <View style={{ height: "100%", width: "100%", backgroundColor: "#ffffffff" }}>
            <ScrollView style={{ height: "100%" }}>
                <View style={{ height: 120, width: '100%', flexDirection: "row", justifyContent: "space-evenly", backgroundColor: "#ffffffff" }}>
                    <Image source={require('./clg.png')} style={{ width: '25%', height: '100', marginTop: 10, marginStart: 10 }}></Image>
                    <View style={{ alignSelf: "center" }}>
                        <View >
                            <Text style={{ fontSize: 16, fontWeight: "700", color: "#0b2a3a" }}>
                                Iqra Girls College
                            </Text>
                            <Text style={{ color: "#4a5568", fontSize: 12 }}>Plot 1 Lahore-Sargodha Rd,{"\n"}Chattah Town, Sargodha</Text>
                        </View>
                    </View>
                </View>
                <Text style={{ color: "#003366", fontSize: 20, fontWeight: "700", marginTop: 6, textAlign: "center" }}> Admission Form</Text>
                <View style={{ backgroundColor: "#ffffffff", borderRadius: 10, height: 50, width: "100%" }}>
                    <View style={{ backgroundColor: "#0b3c66", borderRadius: 10, marginTop: 10, height: 40, width: "70%", alignSelf: "center" }}>
                        <Text style={{ color: "#fff", fontWeight: "700", marginTop: 9, textAlign: "center" }}>Personal Details (Candidate)</Text>
                    </View>
                </View>
                <View style={{ height: 65, width: "100%", backgroundColor: "rgba(255, 255, 255, 0.27)", flexDirection: "row", justifyContent: "space-between", marginTop: 5 }}>
                    <View >
                        <Text style={{ fontSize: 12, marginStart: 15 }}>Date</Text>
                        <TextInput
                            placeholder="DD-MM-YYYY"
                            style={{ height: 40, width: "190%", marginStart: 10, borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc" }} />
                    </View>
                    <TextInput
                        placeholder="5 Photos"
                        style={{ height: 65, width: "30%", borderWidth: 1, borderColor: "#506483ff", borderRadius: 10, backgroundColor: "#f8fafc", marginTop: 8, marginRight: 28, textAlign: "center" }} />
                </View>
                <View>
                    <Text style={{ fontSize: 12, marginStart: 15 }}>Application for admission to</Text>
                    <TextInput
                        placeholder="Program / Class"
                        style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                </View>
                <View>
                    <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>Name</Text>
                    <TextInput
                        placeholder="Candidate Name"
                        style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                </View>
                <View>
                    <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>CNIC</Text>
                    <TextInput
                        placeholder="xxxxx-xxxxxxx-x"
                        style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                </View>
                <View>
                    <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>Father Name</Text>
                    <TextInput
                        placeholder="Father Name"
                        style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                </View>
                <View>
                    <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>CNIC (Father)</Text>
                    <TextInput
                        placeholder="xxxxx-xxxxxxx-x"
                        style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                </View>
                <View style={{ height: 65, width: "100%", backgroundColor: "rgba(255, 255, 255, 0.27)", flexDirection: "row", justifyContent: "space-between", marginTop: 5 }}>
                    <View >
                        <Text style={{ fontSize: 12, marginStart: 15 }}>Date of Birth</Text>
                        <TextInput
                            placeholder="DD-MM-YYYY"
                            style={{ height: 40, width: "190%", marginStart: 10, borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc" }} />
                    </View>
                    <View style={{ height: "100%", width: "40%", backgroundColor: "rgba(255, 255, 255, 0.27)" }}>
                        <Text style={{ marginTop: 8, textAlign: "center" }}>Gender</Text>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity style={{ marginTop: 10, flexDirection: "row", marginStart: 10 }}>
                                <Fontisto name="checkbox-passive" size={15} color="#3b3b3bff" />
                            </TouchableOpacity>
                            <Text style={{ color: "#3b3b3bff", fontWeight: "300", fontSize: 10, marginTop: 10 }}>  Male</Text>
                            <TouchableOpacity style={{ marginTop: 10, flexDirection: "row", marginStart: 20 }}>
                                <Fontisto name="checkbox-passive" size={15} color="#3b3b3bff" />
                            </TouchableOpacity>
                            <Text style={{ color: "#3b3b3bff", fontWeight: "300", fontSize: 10, marginTop: 10 }}>  Female</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>Occupation of Father</Text>
                    <TextInput
                        placeholder="Teacher / Business"
                        style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                </View>
                <View>
                    <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>Marital Status</Text>
                    <TextInput
                        placeholder="Singls / Married"
                        style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                </View>
                <View>
                    <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>Religion</Text>
                    <TextInput
                        placeholder="Religion"
                        style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                </View>
                <View>
                    <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>Permanent Address (If Different)</Text>
                    <TextInput
                        placeholder="Address"
                        style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                </View>
                <View>
                    <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>Postal Address</Text>
                    <TextInput
                        placeholder="Address"
                        style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                </View>
                <View>
                    <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>Cell Phone</Text>
                    <TextInput
                        placeholder="03xx-xxxxxxx"
                        style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                </View>
                <View>
                    <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>Ph Residence</Text>
                    <TextInput
                        placeholder="0xx-xxxxxxx"
                        style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                </View>
                <View style={{ backgroundColor: "#ffffffff", borderRadius: 10, height: 50, width: "100%" }}>
                    <View style={{ backgroundColor: "#0b3c66", borderRadius: 10, marginTop: 10, height: 40, width: "70%", alignSelf: "center" }}>
                        <Text style={{ color: "#fff", fontWeight: "700", marginTop: 9, textAlign: "center" }}>Academic Record</Text>
                    </View>
                </View>
                <View style={{ margin: 10 }}>
                    <View>
                        <Text style={{ fontSize: 12, marginStart: 15, marginTop: 10 }}>Matric - Institution</Text>
                        <TextInput
                            placeholder="Institution Name"
                            style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>Matric - Subject</Text>
                        <TextInput
                            placeholder="Subjects"
                            style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>Matric - Roll No</Text>
                        <TextInput
                            placeholder="Roll No"
                            style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>Matric - Obtained Marks</Text>
                        <TextInput
                            placeholder="Obtained Marks"
                            style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>Matric - Total Marks</Text>
                        <TextInput
                            placeholder="Total Marks"
                            style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>Matric - Percentage</Text>
                        <TextInput
                            placeholder="%"
                            style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>Matric - Year</Text>
                        <TextInput
                            placeholder="Year"
                            style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 12, marginStart: 15, marginTop: 10 }}>FSc / ICS - Institution</Text>
                        <TextInput
                            placeholder="Institution Name"
                            style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>FSc / ICS - Subject</Text>
                        <TextInput
                            placeholder="Subjects"
                            style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>FSc / ICS - Roll No</Text>
                        <TextInput
                            placeholder="Roll No"
                            style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>FSc / ICS - Obtained Marks</Text>
                        <TextInput
                            placeholder="Obtained Marks"
                            style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>FSc / ICS - Total Marks</Text>
                        <TextInput
                            placeholder="Total Marks"
                            style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>FSc / ICS - Percentage</Text>
                        <TextInput
                            placeholder="%"
                            style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>FSc / ICS - Year</Text>
                        <TextInput
                            placeholder="Year"
                            style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 12, marginStart: 15, marginTop: 10 }}>Any Other - Institution</Text>
                        <TextInput
                            placeholder="Institution Name"
                            style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>Any Other - Subject</Text>
                        <TextInput
                            placeholder="Subjects"
                            style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>Any Other - Roll No</Text>
                        <TextInput
                            placeholder="Roll No"
                            style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>Any Other - Obtained Marks</Text>
                        <TextInput
                            placeholder="Obtained Marks"
                            style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>Any Other - Total Marks</Text>
                        <TextInput
                            placeholder="Total Marks"
                            style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>Any Other - Percentage</Text>
                        <TextInput
                            placeholder="%"
                            style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>Any Other - Year</Text>
                        <TextInput
                            placeholder="Year"
                            style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 12, marginStart: 15, marginTop: 10 }}>Elective Subjects</Text>
                        <TextInput
                            placeholder="Subjects"
                            style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>Co-Curricular Activities</Text>
                        <TextInput
                            placeholder="Sports, Debates"
                            style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 14, fontWeight: "800", marginStart: 12, marginTop: 10, Color: "#003366" }}>I solemnly declare that the above info is correct.</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity style={{ marginTop: 5, flexDirection: "row", marginStart: 20 }}>
                            <Fontisto name="checkbox-passive" size={15} color="#3b3b3bff" />
                        </TouchableOpacity>
                        <Text style={{ color: "#3b3b3bff", fontWeight: "300", fontSize: 10, marginTop: 5 }}>  Admitted</Text>
                        <TouchableOpacity style={{ marginTop: 5, flexDirection: "row", marginStart: 15 }}>
                            <Fontisto name="checkbox-passive" size={15} color="#3b3b3bff" />
                        </TouchableOpacity>
                        <Text style={{ color: "#3b3b3bff", fontWeight: "300", fontSize: 10, marginTop: 5 }}>  Not Admitted</Text>
                    </View>
                    <View style={{ backgroundColor: "#ffffffff", borderRadius: 10, height: 50, width: "100%" }}>
                        <TouchableOpacity style={{ backgroundColor: "#0b3c66", borderRadius: 10, marginTop: 15, height: 40, width: "70%", alignSelf: "center" }}>
                            <Text style={{ color: "#fff", fontWeight: "700", marginTop: 9, textAlign: "center" }}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ backgroundColor: "#ffffffff", borderRadius: 10, height: 50, width: "100%", marginTop: 25 }}>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
export default Admission