import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from 'react-redux';
import { auth, db } from '../../Firebase';
import { uploadImageToCloudinary } from '../Helper/FirebaseHelper';
import { setUser } from '../redux/Slices/HomeDataSlice';

const Profile12 = ({ navigation }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.home.user);

    // alert(currentUser.uid )
    
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    
    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        role: 'Student',
        imageUrl: '',
    });

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const user = currentUser 

               
                if (user) {
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();

                        console.log(userData , 
                            'userData'
                        );
                        
                        setFormData({
                            name: userData.name ,
                            email: userData.email || '',
                            mobile: userData.mobile || '',
                            role: userData.role || 'Student',
                            imageUrl: userData.imageUrl || '',
                        });
                        // Update Redux store
                        dispatch(setUser({ ...userData, uid: user.uid }));
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Failed to load profile data');
            } finally {
                setLoading(false);
            }
        };

     fetchUserData()
    }, []);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0b3c66" />
                <Text style={{ marginTop: 10 }}>Loading profile...</Text>
            </View>
        );
    }

    const handleLogout = async () => {
        try {
            await signOut(auth);
            // Clear any user data from Redux if needed
            dispatch(setUser(null));
            // Navigate to login screen
            router.replace('/Login');
        } catch (error) {
            console.error('Error signing out:', error);
            Alert.alert('Error', 'Failed to sign out. Please try again.');
        }
    };

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                <Text style={{ color: 'red', textAlign: 'center', marginBottom: 20 }}>{error}</Text>
                <TouchableOpacity 
                    onPress={() => navigation.goBack()}
                    style={{
                        backgroundColor: '#0b3c66',
                        padding: 12,
                        borderRadius: 8,
                        width: 200,
                        alignItems: 'center',
                        marginBottom: 10
                    }}
                >
                    <Text style={{ color: 'white' }}>Go Back</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={handleLogout}
                    style={{
                        backgroundColor: '#dc3545',
                        padding: 12,
                        borderRadius: 8,
                        width: 200,
                        alignItems: 'center'
                    }}
                >
                    <Text style={{ color: 'white' }}>Logout</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (e) {
            return 'N/A';
        }
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.email) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }

        try {
            setSaving(true);
            const user = auth.currentUser;
            if (!user) throw new Error('User not authenticated');

            // Update Firestore
            const userRef = doc(db, 'users', user.uid);
            await updateDoc(userRef, {
                ...formData,
                updatedAt: new Date().toISOString()
            });

            // Update Redux store
            const updatedUser = {
                ...currentUser,
                ...formData,
                uid: user.uid
            };
            dispatch(setUser(updatedUser));

            Alert.alert('Success', 'Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            Alert.alert('Error', 'Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    const handleImagePicker = async () => {
        try {
            // Request camera roll permissions
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permission required', 'Please allow access to your photos to upload a profile picture.');
                    return;
                }
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                setLoading(true);
                const imageUri = result.assets[0].uri;
                const uploadedImageUrl = await uploadImageToCloudinary(imageUri);
                if (uploadedImageUrl) {
                    handleInputChange('imageUrl', uploadedImageUrl);
                    Alert.alert('Success', 'Profile picture updated successfully!');
                } else {
                    throw new Error('Failed to upload image');
                }
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert('Error', 'Failed to upload image. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={{ backgroundColor: "#ffffffff", flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 }}>Profile Information</Text>
            
            <View style={styles.profileContainer}>
                <View style={styles.profileHeader}>
                    <TouchableOpacity onPress={handleImagePicker} style={styles.avatarContainer}>
                        {formData.imageUrl ? (
                            <Image 
                                source={{ uri: formData.imageUrl }} 
                                style={styles.avatarImage} 
                            />
                        ) : (
                            <View style={styles.avatarPlaceholder}>
                                <Ionicons name="person" size={40} color="#6c757d" />
                            </View>
                        )}
                        <View style={styles.cameraIcon}>
                            <Ionicons name="camera" size={20} color="white" />
                        </View>
                    </TouchableOpacity>
                    
                    <Text style={styles.userName}>{formData.name || 'No Name'}</Text>
                    <Text style={styles.userRole}>{formData.role || 'User'}</Text>
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Full Name</Text>
                        <TextInput
                            value={formData.name}
                            onChangeText={(text) => handleInputChange('name', text)}
                            style={styles.input}
                            placeholder="Enter your name"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email Address</Text>
                        <TextInput
                            value={formData.email}
                            onChangeText={(text) => handleInputChange('email', text)}
                            style={[styles.input, { color: '#000' }]}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCompleteType="email"
                            textContentType="emailAddress"
                            placeholder="Enter your email"
                            placeholderTextColor="#999"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Mobile Number</Text>
                        <TextInput
                            value={formData.mobile}
                            onChangeText={(text) => handleInputChange('mobile', text)}
                            style={styles.input}
                            placeholder="Enter mobile number"
                            keyboardType="phone-pad"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Role</Text>
                        <View style={[styles.input, { paddingVertical: 12 }]}>
                            <Text>{formData.role}</Text>
                        </View>
                    </View>

                    {currentUser?.createdAt && (
                        <View style={styles.infoGroup}>
                            <Text style={styles.infoLabel}>Member Since</Text>
                            <Text style={styles.infoText}>
                                {formatDate(currentUser.createdAt)}
                            </Text>
                        </View>
                    )}
                </View>
            </View>

            <TouchableOpacity 
                onPress={handleSubmit}
                disabled={saving}
                style={[styles.button, saving && styles.buttonDisabled]}
            >
                {saving ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <Text style={styles.buttonText}>Save Changes</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={() => navigation.goBack()}
                style={[styles.button, { backgroundColor: '#6c757d', marginTop: 10 }]}
            >
                <Text style={styles.buttonText}>Back to Dashboard</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};


const styles = {
    profileContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 20
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 15,
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 3,
        borderColor: '#0b3c66',
    },
    cameraIcon: {
        position: 'absolute',
        right: 5,
        bottom: 5,
        backgroundColor: '#0b3c66',
        borderRadius: 15,
        padding: 5,
        zIndex: 10,
    },
    avatarImage: {
        width: '100%',
        height: '100%',
        borderRadius: 60,
    },
    avatarPlaceholder: {
        width: '100%',
        height: '100%',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e9ecef',
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        color: '#495057',
        marginBottom: 5,
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
        backgroundColor: '#fff',
        color: '#333',
    },
    button: {
        backgroundColor: '#0b3c66',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    infoLabel: {
        color: '#6c757d',
        fontSize: 14
    },
    infoText: {
        color: '#212529',
        fontSize: 16,
        marginTop: 5
    },
    button: {
        backgroundColor: '#0b3c66',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20
    },
    buttonDisabled: {
        opacity: 0.7
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600'
    }
};

export default Profile12;