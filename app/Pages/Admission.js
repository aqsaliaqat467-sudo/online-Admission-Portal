import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { db } from '../../Firebase';
import { uploadImageToCloudinary } from '../Helper/FirebaseHelper';

const Admission = ({ navigation, route }) => {
    // Get course and college data from navigation params
    const course = route?.params?.course;
    const college = route?.params?.college;

    const [date, setDate] = useState("");
    const [program, setProgram] = useState("");
    const [name, setName] = useState("");
    const [cnic, setCnic] = useState("");
    const [fatherCnic, setFatherCnic] = useState("");
    const [dob, setDob] = useState("");
    const [fatherOccupation, setFatherOccupation] = useState("");
    const [maritalStatus, setMaritalStatus] = useState("");
    const [religion, setReligion] = useState("");
    const [permanentAddress, setPermanentAddress] = useState("");
    const [postalAddress, setPostalAddress] = useState("");
    const [cellPhone, setCellPhone] = useState("");
    const [resPhone, setResPhone] = useState("");
    const [matricObtained, setMatricObtained] = useState("");
    const [matricTotal, setMatricTotal] = useState("");
    const [matricPercent, setMatricPercent] = useState("");
    const [fscObtained, setFscObtained] = useState("");
    const [fscTotal, setFscTotal] = useState("");
    const [fscPercent, setFscPercent] = useState("");
    const [subjects, setSubjects] = useState("");
    const [activities, setActivities] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const handleSubmit = async () => {

        if (date == "" || program == "" || name == "" || cnic == "" || fatherName == "" || fatherCnic == "" || dob == "" ||
            fatherOccupation == "" || maritalStatus == "" || religion == "" || permanentAddress == "" ||
            postalAddress == "" || cellPhone == "" || resPhone == "" || matricObtained == "" || matricTotal == "" ||
            matricPercent == "" || fscObtained == "" || fscTotal == "" || fscPercent == "" || subjects == "" || activities == "" || imageUrl == ""
        ) {
            alert("⚠️ Please fill all fields before submitting.")
            return
        }

        await addDoc(collection(db, "admissions"), { date, program, name, cnic, fatherName, fatherCnic, dob, fatherOccupation, maritalStatus, religion, permanentAddress, postalAddress, cellPhone, resPhone, matricObtained, matricTotal, matricPercent, fscObtained, fscTotal, fscPercent, subjects, activities, imageUrl });
    };
    const handleImagePicker = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaType,
                allowsEditing: true,
                quality: 1,
            });


            if (!result.canceled) {
                const imageUri = result.assets[0].uri;
                const uploadedImageUrl = await uploadImageToCloudinary(imageUri)
                setImageUrl(uploadedImageUrl)
                alert(uploadedImageUrl)
            }


        } catch (error) {

            console.log("Error picking image:", error);

        }
    }
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
                            onChangeText={setDate}
                            value={date}
                            style={{ height: 40, width: "190%", marginStart: 10, borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc" }} />
                    </View>
                    <View style={{ width: "40%", height: 75, borderColor: "#c3cbd6ff", borderRadius: 10, backgroundColor: "#f5f6f7ff", borderWidth: 1, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                        <TouchableOpacity onPress={handleImagePicker}>
                            {imageUrl != "" ?
                                <Image source={{ uri: imageUrl }} style={{ width: "100%", height: 100, borderRadius: 10 }} />
                                : <Ionicons name="camera-outline" size={40} color="#000" />
                            }
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Text style={{ fontSize: 12, marginStart: 15 }}>Application for admission to</Text>
                    <TextInput
                        placeholder="Program / Class"
                        onChangeText={setProgram}
                        value={program}
                        style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                </View>
                <View>
                    <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>Name</Text>
                    <TextInput
                        placeholder="Candidate Name"
                        onChangeText={setName}
                        value={name}
                        style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                </View>
                <View>
                    <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>CNIC</Text>
                    <TextInput
                        placeholder="xxxxx-xxxxxxx-x"
                        onChangeText={setCnic}
                        value={cnic}
                        style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                </View>
                <View>
                    <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>Father Name</Text>
                    <TextInput
                        placeholder="Father Name"
                        onChangeText={setFatherName}
                        value={fatherName}
                        style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                </View>
                <View>
                    <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>CNIC (Father)</Text>
                    <TextInput
                        placeholder="xxxxx-xxxxxxx-x"
                        onChangeText={setFatherCnic}
                        value={fatherCnic}
                        style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                </View>
                <View style={{ height: 65, width: "100%", backgroundColor: "rgba(255, 255, 255, 0.27)", flexDirection: "row", justifyContent: "space-between", marginTop: 5 }}>
                    <View >
                        <Text style={{ fontSize: 12, marginStart: 15 }}>Date of Birth</Text>
                        <TextInput
                            placeholder="DD-MM-YYYY"
                            onChangeText={setDob}
                            value={dob}
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
                        onChangeText={setFatherOccupation}
                        value={fatherOccupation}
                        style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                </View>
                <View>
                    <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>Marital Status</Text>
                    <TextInput
                        placeholder="Single / Married"
                        onChangeText={setMaritalStatus}
                        value={maritalStatus}
                        style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                </View>
                <View>
                    <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>Religion</Text>
                    <TextInput
                        placeholder="Religion"
                        onChangeText={setReligion}
                        value={religion}
                        style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                </View>
                <View>
                    <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>Permanent Address (If Different)</Text>
                    <TextInput
                        placeholder="Address"
                        onChangeText={setPermanentAddress}
                        value={permanentAddress}
                        style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                </View>
                <View>
                    <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>Postal Address</Text>
                    <TextInput
                        placeholder="Address"
                        onChangeText={setPostalAddress}
                        value={postalAddress}
                        style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                </View>
                <View>
                    <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>Cell Phone</Text>
                    <TextInput
                        placeholder="03xx-xxxxxxx"
                        onChangeText={setCellPhone}
                        value={cellPhone}
                        style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                </View>
                <View>
                    <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>Ph Residence</Text>
                    <TextInput
                        placeholder="0xx-xxxxxxx"
                        onChangeText={setResPhone}
                        value={resPhone}
                        style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                </View>
                <View style={{ backgroundColor: "#ffffffff", borderRadius: 10, height: 50, width: "100%" }}>
                    <View style={{ backgroundColor: "#0b3c66", borderRadius: 10, marginTop: 10, height: 40, width: "70%", alignSelf: "center" }}>
                        <Text style={{ color: "#fff", fontWeight: "700", marginTop: 9, textAlign: "center" }}>Academic Record</Text>
                    </View>
                </View>
                <View style={{ margin: 10 }}>
                    <View>
                        <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>Matric - Obtained Marks</Text>
                        <TextInput
                            placeholder="Obtained Marks"
                            onChangeText={setMatricObtained}
                            value={matricObtained}
                            style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>Matric - Total Marks</Text>
                        <TextInput
                            placeholder="Total Marks"
                            onChangeText={setMatricTotal}
                            value={matricTotal}
                            style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>Matric - Percentage</Text>
                        <TextInput
                            placeholder="%"
                            onChangeText={setMatricPercent}
                            value={matricPercent}
                            style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>FSc / ICS - Obtained Marks</Text>
                        <TextInput
                            placeholder="Obtained Marks"
                            onChangeText={setFscObtained}
                            value={fscObtained}
                            style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>FSc / ICS - Total Marks</Text>
                        <TextInput
                            placeholder="Total Marks"
                            onChangeText={setFscTotal}
                            value={fscTotal}
                            style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>FSc / ICS - Percentage</Text>
                        <TextInput
                            placeholder="%"
                            onChangeText={setFscPercent}
                            value={fscPercent}
                            style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                    </View>

                    <View>
                        <Text style={{ fontSize: 12, marginStart: 15, marginTop: 10 }}>Elective Subjects</Text>
                        <TextInput
                            placeholder="Subjects"
                            onChangeText={setSubjects}
                            value={subjects}
                            style={{ height: 40, width: "90%", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, backgroundColor: "#f8fafc", marginStart: 10, marginTop: 3 }} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 12, marginStart: 15, marginTop: 5 }}>Co-Curricular Activities</Text>
                        <TextInput
                            placeholder="Sports, Debates"
                            onChangeText={setActivities}
                            value={activities}
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
                        <TouchableOpacity onPress={handleSubmit}
                            style={{ backgroundColor: "#0b3c66", borderRadius: 10, marginTop: 15, height: 40, width: "70%", alignSelf: "center" }}>
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