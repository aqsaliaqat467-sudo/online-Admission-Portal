import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import React, { useState } from "react";
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch } from 'react-redux';
import { auth } from '../../Firebase';

const Password = ({ navigation }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'New passwords do not match');
            return;
        }

        if (newPassword.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters long');
            return;
        }

        try {
            setLoading(true);
            const user = auth.currentUser;
            
            // Re-authenticate user
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);
            
            // Update password
            await updatePassword(user, newPassword);
            
            Alert.alert('Success', 'Password updated successfully');
            
            // Clear fields
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            
            // Navigate back
            navigation.goBack();
        } catch (error) {
            console.error('Error changing password:', error);
            let errorMessage = 'Failed to change password';
            
            if (error.code === 'auth/wrong-password') {
                errorMessage = 'Current password is incorrect';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'Password should be at least 6 characters';
            } else if (error.code === 'auth/requires-recent-login') {
                errorMessage = 'Please log in again to change your password';
            }
            
            Alert.alert('Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = () => {
        navigation.navigate('Forgotpass');
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#ffffffff", padding: 20 }}>
            <Text style={{ fontSize: 22, fontWeight: "700", color: "#000000ff", marginTop: 20, marginBottom: 10 }}>Change Password</Text>
            
            <Text style={{ color: "#4b5563", marginBottom: 20, lineHeight: 20 }}>
                Your password must be at least 6 characters and should include a combination of numbers, letters and special characters (!@$%).
            </Text>

            <View style={{ marginBottom: 15 }}>
                <Text style={{ marginBottom: 5, color: '#374151', fontWeight: '500' }}>Current Password</Text>
                <TextInput
                    placeholder="Enter current password"
                    placeholderTextColor="#9ca3af"
                    secureTextEntry
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                    style={styles.input}
                />
            </View>

            <View style={{ marginBottom: 15 }}>
                <Text style={{ marginBottom: 5, color: '#374151', fontWeight: '500' }}>New Password</Text>
                <TextInput
                    placeholder="Enter new password"
                    placeholderTextColor="#9ca3af"
                    secureTextEntry
                    value={newPassword}
                    onChangeText={setNewPassword}
                    style={styles.input}
                />
            </View>

            <View style={{ marginBottom: 20 }}>
                <Text style={{ marginBottom: 5, color: '#374151', fontWeight: '500' }}>Confirm New Password</Text>
                <TextInput
                    placeholder="Re-enter new password"
                    placeholderTextColor="#9ca3af"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    style={styles.input}
                />
            </View>

            <TouchableOpacity 
                onPress={handleForgotPassword}
                style={{ alignSelf: 'flex-start', marginBottom: 20 }}
            >
                <Text style={{ color: "#3b82f6", fontWeight: '500' }}>Forgot your password?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={handleChangePassword}
                disabled={loading}
                style={[styles.button, loading && { opacity: 0.7 }]}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Change Password</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = {
    input: {
        backgroundColor: "#F3F4F6",
        borderRadius: 10, 
        width: '100%', 
        height: 50, 
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: "#D1D5DB",
        fontSize: 16,
        color: '#111827'
    },
    button: {
        backgroundColor: "#1d4ed8", 
        width: '100%', 
        height: 50, 
        borderRadius: 10, 
        justifyContent: "center", 
        alignItems: "center",
        marginTop: 10
    },
    buttonText: { 
        color: "#fff", 
        fontWeight: "600",
        fontSize: 16
    }
};

export default Password;