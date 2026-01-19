import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from "expo-image-picker";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSelector } from 'react-redux';
import { db } from '../../Firebase';
import { uploadImageToCloudinary } from '../Helper/FirebaseHelper';

const AdmissionNew = ({ navigation, route }) => {
    // Get course and college data from navigation params
    const course = route?.params?.course;
    const college = route?.params?.college;
    
    // Get user from Redux state
    const user = useSelector((state) => state.home.user);

    // 🔹 Personal Information
    const [firstName, setFirstName] = useState(user?.fName || '');
    const [lastName, setLastName] = useState(user?.lName || '');
    const [email, setEmail] = useState(user?.email || '');
    const [phone, setPhone] = useState(user?.mobile || '');
    const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth || '');
    const [gender, setGender] = useState(user?.gender || 'Male');
    const [nationality, setNationality] = useState(user?.nationality || 'Pakistani');

    // 🔹 Previous Education
    const educationLevels = ['Matric', 'Intermediate', 'A-Levels', 'Other'];
    const [educationDetails, setEducationDetails] = useState({
        'Matric': {
            selected: true,
            institution: '',
            year: '',
            grade: ''
        },
        'Intermediate': {
            selected: false,
            institution: '',
            year: '',
            grade: ''
        },
        'A-Levels': {
            selected: false,
            institution: '',
            year: '',
            grade: ''
        },
        'Other': {
            selected: false,
            institution: '',
            year: '',
            grade: ''
        }
    });
    
    const toggleEducation = (level) => {
        // Don't allow deselecting if it's the only selected item
        const selectedCount = Object.values(educationDetails).filter(edu => edu.selected).length;
        if (educationDetails[level].selected && selectedCount <= 1) {
            return;
        }
        
        setEducationDetails(prev => ({
            ...prev,
            [level]: {
                ...prev[level],
                selected: !prev[level].selected
            }
        }));
    };
    
    const updateEducationDetail = (level, field, value) => {
        setEducationDetails(prev => ({
            ...prev,
            [level]: {
                ...prev[level],
                [field]: value
            }
        }));
    };

    // 🔹 Address Details
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [postalCode, setPostalCode] = useState('');

    // 🔹 Emergency Contact
    const [emergencyContactName, setEmergencyContactName] = useState('');
    const [emergencyContactPhone, setEmergencyContactPhone] = useState('');
    const [emergencyContactRelation, setEmergencyContactRelation] = useState('');

    // 🔹 File Uploads
    const [photoFile, setPhotoFile] = useState('');
    const [documentsFile, setDocumentsFile] = useState('');

    // 🔹 Additional Info
    const [motivation, setMotivation] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');

    // Loading state
    const [submitting, setSubmitting] = useState(false);
    const [uploadingPhoto, setUploadingPhoto] = useState(false);
    const [uploadingDoc, setUploadingDoc] = useState(false);

    // Handle photo upload
    const handlePhotoUpload = async () => {
        try {
            setUploadingPhoto(true);
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (!result.canceled) {
                const imageUri = result.assets[0].uri;
                const uploadedUrl = await uploadImageToCloudinary(imageUri);
                setPhotoFile(uploadedUrl);
                Alert.alert('Success', 'Photo uploaded successfully!');
            }
        } catch (error) {
            console.error("Error uploading photo:", error);
            Alert.alert('Error', 'Failed to upload photo');
        } finally {
            setUploadingPhoto(false);
        }
    };

    // Handle document upload
    const handleDocumentUpload = async () => {
        try {
            setUploadingDoc(true);
            const result = await DocumentPicker.getDocumentAsync({
                type: ['application/pdf', 'image/*'],
                copyToCacheDirectory: true,
            });

            if (result.type === 'success' || !result.canceled) {
                // For now, we'll use Cloudinary for documents too
                // In production, you might want to use Firebase Storage
                const docUri = result.uri || result.assets[0].uri;
                const uploadedUrl = await uploadImageToCloudinary(docUri);
                setDocumentsFile(uploadedUrl);
                Alert.alert('Success', 'Document uploaded successfully!');
            }
        } catch (error) {
            console.error("Error uploading document:", error);
            Alert.alert('Error', 'Failed to upload document');
        } finally {
            setUploadingDoc(false);
        }
    };

    // Validate form
    const validateForm = () => {
        if (!firstName || !lastName || !email || !phone) {
            Alert.alert('Error', 'Please fill in all required personal information fields');
            return false;
        }
        if (!dateOfBirth || !gender || !nationality) {
            Alert.alert('Error', 'Please complete your personal details');
            return false;
        }
        if (!previousEducation || !previousInstitution) {
            Alert.alert('Error', 'Please provide your previous education details');
            return false;
        }
        if (!address || !city || !country) {
            Alert.alert('Error', 'Please provide your address details');
            return false;
        }
        if (!emergencyContactName || !emergencyContactPhone) {
            Alert.alert('Error', 'Please provide emergency contact information');
            return false;
        }
        // if (!photoFile) {
        //     Alert.alert('Error', 'Please upload your photo');
        //     return false;
        // }
        if (!motivation) {
            Alert.alert('Error', 'Please explain why you want to apply');
            return false;
        }
        return true;
    };

    // Handle form submission
    const handleSubmit = async () => {
        // if (!validateForm()) return;

        try {
            setSubmitting(true);

            const admissionData = {
                // Personal Information
                firstName,
                lastName,
                email,
                phone,
                dateOfBirth,
                gender,
                nationality,

                // Previous Education
                educationDetails: Object.entries(educationDetails)
                    .filter(([_, details]) => details.selected)
                    .map(([level, details]) => ({
                        level,
                        institution: details.institution,
                        year: details.year,
                        grade: details.grade
                    })),

                // Address Details
                address,
                city,
                state,
                country,
                postalCode,

                // Emergency Contact
                emergencyContactName,
                emergencyContactPhone,
                emergencyContactRelation,

                // File Uploads
                photoFile: photoFile || "null",    
                documentsFile: documentsFile || "null",

                // Course / College Info
                courseId: course?.id || '',
                collegeId: college?.uid || '',
                courseName: course?.title || '',
                collegeName: college?.collegeName || '',

                // Additional Info
                motivation,
                additionalInfo,

                // User Info
                userId: user?.uid || '',

                // System Generated
                status: 'pending',
                appliedAt: serverTimestamp(),
            };


            console.log("data " , admissionData);
            

            // Add to Firestore
            const docRef = await addDoc(collection(db, 'applications'), admissionData);
            
            console.log('Application submitted with ID:', docRef.id);
            
            Alert.alert(
                'Success!',
                'Your application has been submitted successfully. You will be notified once it is reviewed.',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.goBack()
                    }
                ]
            );
        } catch (error) {
            console.error("Error submitting application:", error);
            Alert.alert('Error', 'Failed to submit application. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#003366" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Admission Application</Text>
                </View>

                {/* College & Course Info */}
                {college && course && (
                    <View style={styles.infoCard}>
                        <Text style={styles.infoTitle}>Applying For:</Text>
                        <Text style={styles.courseName}>{course.title}</Text>
                        <Text style={styles.collegeName}>{college.collegeName}</Text>
                    </View>
                )}

                {/* Personal Information Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>📋 Personal Information</Text>
                    
                    <View style={styles.row}>
                        <View style={styles.halfInput}>
                            <Text style={styles.label}>First Name *</Text>
                            <TextInput
                                style={styles.input}
                                value={firstName}
                                onChangeText={setFirstName}
                                placeholder="Enter first name"
                            />
                        </View>
                        <View style={styles.halfInput}>
                            <Text style={styles.label}>Last Name *</Text>
                            <TextInput
                                style={styles.input}
                                value={lastName}
                                onChangeText={setLastName}
                                placeholder="Enter last name"
                            />
                        </View>
                    </View>

                    <Text style={styles.label}>Email *</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="your.email@example.com"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <Text style={styles.label}>Phone *</Text>
                    <TextInput
                        style={styles.input}
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="03XX-XXXXXXX"
                        keyboardType="phone-pad"
                    />

                    <Text style={styles.label}>Date of Birth *</Text>
                    <TextInput
                        style={styles.input}
                        value={dateOfBirth}
                        onChangeText={setDateOfBirth}
                        placeholder="DD/MM/YYYY"
                    />

                    <Text style={styles.label}>Gender *</Text>
                    <View style={styles.genderContainer}>
                        <TouchableOpacity
                            style={[styles.genderButton, gender === 'Male' && styles.genderButtonActive]}
                            onPress={() => setGender('Male')}
                        >
                            <Text style={[styles.genderText, gender === 'Male' && styles.genderTextActive]}>Male</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.genderButton, gender === 'Female' && styles.genderButtonActive]}
                            onPress={() => setGender('Female')}
                        >
                            <Text style={[styles.genderText, gender === 'Female' && styles.genderTextActive]}>Female</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.genderButton, gender === 'Other' && styles.genderButtonActive]}
                            onPress={() => setGender('Other')}
                        >
                            <Text style={[styles.genderText, gender === 'Other' && styles.genderTextActive]}>Other</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>Nationality *</Text>
                    <TextInput
                        style={styles.input}
                        value={nationality}
                        onChangeText={setNationality}
                        placeholder="e.g., Pakistani"
                    />
                </View>

                {/* Previous Education Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>🎓 Previous Education</Text>
                    
                    <Text style={styles.label}>Education Level *</Text>
                    <View style={styles.pickerContainer}>
                        {educationLevels.map((level) => (
                            <TouchableOpacity
                                key={level}
                                style={[
                                    styles.educationOption,
                                    educationDetails[level].selected && styles.selectedEducationOption
                                ]}
                                onPress={() => toggleEducation(level)}
                            >
                                <Text style={[
                                    styles.educationOptionText,
                                    educationDetails[level].selected && styles.selectedEducationText
                                ]}>
                                    {level}
                                    {educationDetails[level].selected && ' ✓'}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <Text style={styles.hintText}>Select all that apply (at least one required)</Text>

                    {educationLevels.map(level => (
                        educationDetails[level].selected && (
                            <View key={level} style={styles.educationDetailContainer}>
                                <Text style={styles.educationLevelTitle}>{level} Details</Text>
                                
                                <Text style={styles.label}>Institution Name *</Text>
                                <TextInput
                                    style={styles.input}
                                    value={educationDetails[level].institution}
                                    onChangeText={(text) => updateEducationDetail(level, 'institution', text)}
                                    placeholder={`${level} institution name`}
                                />

                                <View style={styles.row}>
                                    <View style={styles.halfInput}>
                                        <Text style={styles.label}>Year of Completion *</Text>
                                        <TextInput
                                            style={styles.input}
                                            value={educationDetails[level].year}
                                            onChangeText={(text) => updateEducationDetail(level, 'year', text)}
                                            placeholder="e.g., 2023"
                                            keyboardType="numeric"
                                        />
                                    </View>
                                    <View style={styles.halfInput}>
                                        <Text style={styles.label}>Grade/Percentage *</Text>
                                        <TextInput
                                            style={styles.input}
                                            value={educationDetails[level].grade}
                                            onChangeText={(text) => updateEducationDetail(level, 'grade', text)}
                                            placeholder={level === 'A-Levels' ? 'e.g., A, B, C' : 'e.g., 85% or A+'}
                                        />
                                    </View>
                                </View>
                            </View>
                        )
                    ))}

                    <Text style={styles.label}>Street Address *</Text>
                    <TextInput
                        style={styles.input}
                        value={address}
                        onChangeText={setAddress}
                        placeholder="House no, Street name"
                        multiline
                    />

                    <View style={styles.row}>
                        <View style={styles.halfInput}>
                            <Text style={styles.label}>City *</Text>
                            <TextInput
                                style={styles.input}
                                value={city}
                                onChangeText={setCity}
                                placeholder="City"
                            />
                        </View>
                        <View style={styles.halfInput}>
                            <Text style={styles.label}>State/Province</Text>
                            <TextInput
                                style={styles.input}
                                value={state}
                                onChangeText={setState}
                                placeholder="State"
                            />
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.halfInput}>
                            <Text style={styles.label}>Country *</Text>
                            <TextInput
                                style={styles.input}
                                value={country}
                                onChangeText={setCountry}
                                placeholder="Country"
                            />
                        </View>
                        <View style={styles.halfInput}>
                            <Text style={styles.label}>Postal Code</Text>
                            <TextInput
                                style={styles.input}
                                value={postalCode}
                                onChangeText={setPostalCode}
                                placeholder="Postal Code"
                                keyboardType="numeric"
                            />
                        </View>
                    </View>
                </View>

                {/* Emergency Contact Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>🚨 Emergency Contact</Text>
                    
                    <Text style={styles.label}>Contact Name *</Text>
                    <TextInput
                        style={styles.input}
                        value={emergencyContactName}
                        onChangeText={setEmergencyContactName}
                        placeholder="Full name"
                    />

                    <Text style={styles.label}>Contact Phone *</Text>
                    <TextInput
                        style={styles.input}
                        value={emergencyContactPhone}
                        onChangeText={setEmergencyContactPhone}
                        placeholder="03XX-XXXXXXX"
                        keyboardType="phone-pad"
                    />

                    <Text style={styles.label}>Relationship</Text>
                    <TextInput
                        style={styles.input}
                        value={emergencyContactRelation}
                        onChangeText={setEmergencyContactRelation}
                        placeholder="e.g., Father, Mother, Guardian"
                    />
                </View>

                {/* File Uploads Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>📎 File Uploads</Text>
                    
                    {/* Photo Upload */}
                    <Text style={styles.label}>Your Photo *</Text>
                    <TouchableOpacity
                        style={styles.uploadButton}
                        onPress={handlePhotoUpload}
                        disabled={uploadingPhoto}
                    >
                        {uploadingPhoto ? (
                            <ActivityIndicator color="#003366" />
                        ) : photoFile ? (
                            <View style={styles.uploadedContainer}>
                                <Image source={{ uri: photoFile }} style={styles.uploadedPhoto} />
                                <Text style={styles.uploadedText}>Photo uploaded ✓</Text>
                            </View>
                        ) : (
                            <>
                                <Ionicons name="camera-outline" size={30} color="#003366" />
                                <Text style={styles.uploadText}>Upload Photo</Text>
                            </>
                        )}
                    </TouchableOpacity>

                    {/* Document Upload */}
                    <Text style={styles.label}>Supporting Documents</Text>
                    <TouchableOpacity
                        style={styles.uploadButton}
                        onPress={handleDocumentUpload}
                        disabled={uploadingDoc}
                    >
                        {uploadingDoc ? (
                            <ActivityIndicator color="#003366" />
                        ) : documentsFile ? (
                            <View style={styles.uploadedContainer}>
                                <MaterialIcons name="check-circle" size={30} color="#28a745" />
                                <Text style={styles.uploadedText}>Document uploaded ✓</Text>
                            </View>
                        ) : (
                            <>
                                <MaterialIcons name="upload-file" size={30} color="#003366" />
                                <Text style={styles.uploadText}>Upload Documents (PDF/Image)</Text>
                            </>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Additional Information Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>✍️ Additional Information</Text>
                    
                    <Text style={styles.label}>Why do you want to apply? *</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        value={motivation}
                        onChangeText={setMotivation}
                        placeholder="Tell us about your motivation and goals..."
                        multiline
                        numberOfLines={4}
                    />

                    <Text style={styles.label}>Additional Information</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        value={additionalInfo}
                        onChangeText={setAdditionalInfo}
                        placeholder="Any other information you'd like to share..."
                        multiline
                        numberOfLines={4}
                    />
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                    style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
                    onPress={handleSubmit}
                    disabled={submitting}
                >
                    {submitting ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <>
                            <Text style={styles.submitButtonText}>Submit Application</Text>
                            <Ionicons name="checkmark-circle" size={24} color="#fff" />
                        </>
                    )}
                </TouchableOpacity>

                <View style={{ height: 30 }}></View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    backButton: {
        marginRight: 15,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#003366',
    },
    infoCard: {
        backgroundColor: '#e6f0ff',
        margin: 15,
        padding: 15,
        borderRadius: 10,
        borderLeftWidth: 4,
        borderLeftColor: '#003366',
    },
    infoTitle: {
        fontSize: 12,
        color: '#666',
        marginBottom: 5,
    },
    courseName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#003366',
        marginBottom: 3,
    },
    collegeName: {
        fontSize: 14,
        color: '#555',
    },
    section: {
        backgroundColor: '#fff',
        margin: 15,
        padding: 15,
        borderRadius: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#003366',
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
        marginTop: 10,
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
    },
    pickerContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 15,
    },
    educationOption: {
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginRight: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    selectedEducationOption: {
        backgroundColor: '#0066cc',
        borderColor: '#0052a3',
    },
    educationOptionText: {
        color: '#333',
        fontSize: 14,
    },
    selectedEducationText: {
        color: '#fff',
        fontWeight: '600',
    },
    hintText: {
        fontSize: 12,
        color: '#666',
        marginTop: -10,
        marginBottom: 10,
        fontStyle: 'italic',
    },
    educationDetailContainer: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 12,
        marginTop: 10,
        marginBottom: 15,
        borderLeftWidth: 3,
        borderLeftColor: '#0066cc',
    },
    educationLevelTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#003366',
        marginBottom: 10,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfInput: {
        width: '48%',
    },
    genderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    genderButton: {
        flex: 1,
        padding: 12,
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        marginHorizontal: 5,
        alignItems: 'center',
        backgroundColor: '#f8fafc',
    },
    genderButtonActive: {
        backgroundColor: '#003366',
        borderColor: '#003366',
    },
    genderText: {
        color: '#666',
        fontWeight: '600',
    },
    genderTextActive: {
        color: '#fff',
    },
    uploadButton: {
        borderWidth: 2,
        borderColor: '#003366',
        borderStyle: 'dashed',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        backgroundColor: '#f8fafc',
    },
    uploadText: {
        marginTop: 10,
        color: '#003366',
        fontWeight: '600',
    },
    uploadedContainer: {
        alignItems: 'center',
    },
    uploadedPhoto: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    uploadedText: {
        color: '#28a745',
        fontWeight: '600',
    },
    submitButton: {
        backgroundColor: '#003366',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 10,
        marginHorizontal: 15,
        marginTop: 20,
    },
    submitButtonDisabled: {
        backgroundColor: '#999',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
    },
});

export default AdmissionNew;
