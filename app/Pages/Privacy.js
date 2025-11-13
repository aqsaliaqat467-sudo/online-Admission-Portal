import { EmailAuthProvider, deleteUser, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { auth } from '../../Firebase';
import { setRole } from '../redux/roleSlice';
import { setUser } from '../redux/userSlice';

const Privacy = ({ navigation }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'New passwords do not match');
            return;
        }
        
        if (newPassword.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters long');
            return;
        }

        try {
            const user = auth.currentUser;
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            
            // Re-authenticate user
            await reauthenticateWithCredential(user, credential);
            
            // Update password
            await updatePassword(user, newPassword);
            Alert.alert('Success', 'Password updated successfully');
            
            // Clear fields
            setNewPassword('');
            setCurrentPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error('Error updating password:', error);
            Alert.alert('Error', error.message || 'Failed to update password');
        }
    };

    const handleDeleteAccount = async () => {
        try {
            const user = auth.currentUser;
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            
            // Re-authenticate user
            await reauthenticateWithCredential(user, credential);
            
            // Delete user account
            await deleteUser(user);
            
            // Clear Redux store
            dispatch(setUser(null));
            dispatch(setRole({}));
            
            // Navigate to login
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error deleting account:', error);
            Alert.alert('Error', error.message || 'Failed to delete account');
        }
    };

    const handleLogout = () => {
        auth.signOut().then(() => {
            // Clear Redux store
            dispatch(setUser(null));
            dispatch(setRole({}));
            navigation.navigate('Login');
        }).catch((error) => {
            console.error('Error signing out:', error);
            Alert.alert('Error', 'Failed to sign out');
        });
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Privacy Settings</Text>
            
            {/* Privacy Policy Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Privacy Policy</Text>
                <Text style={styles.policyText}>
                    We respect your privacy and are committed to protecting your personal information. 
                    This Privacy Policy explains how we collect, use, and safeguard your information 
                    when you use our application.
                </Text>
                <Text style={styles.policySubtitle}>Information We Collect:</Text>
                <Text style={styles.policyText}>
                    • Account information (name, email, password)
                    • Application data and preferences
                    • Usage data and analytics
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    section: {
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
        color: '#2c3e50',
    },
    policyText: {
        fontSize: 14,
        lineHeight: 20,
        color: '#555',
        marginBottom: 10,
    },
    policySubtitle: {
        fontWeight: '600',
        marginTop: 10,
        marginBottom: 5,
        color: '#2c3e50',
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        fontSize: 14,
    },
    button: {
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    logoutButton: {
        backgroundColor: '#3498db',
    },
    deleteButton: {
        backgroundColor: '#e74c3c',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});

export default Privacy;