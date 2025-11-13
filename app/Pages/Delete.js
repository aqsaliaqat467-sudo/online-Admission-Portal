import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, StyleSheet, TextInput } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { auth, db } from '../../Firebase';
import { deleteUser, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/Slices/HomeDataSlice';
import { setRole } from '../redux/roleSlice';

const Delete = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleDeactivateAccount = async () => {
        try {
            setLoading(true);
            const user = auth.currentUser;
            
            // Update user document to mark as deactivated
            await updateDoc(doc(db, 'users', user.uid), {
                status: 'deactivated',
                deactivatedAt: new Date().toISOString()
            });
            
            // Sign out the user
            await auth.signOut();
            
            // Clear Redux store
            dispatch(setUser(null));
            dispatch(setRole({}));
            
            Alert.alert(
                'Account Deactivated',
                'Your account has been deactivated. You can reactivate it by logging in again.',
                [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
            );
        } catch (error) {
            console.error('Error deactivating account:', error);
            Alert.alert('Error', 'Failed to deactivate account. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (!password) {
            Alert.alert('Error', 'Please enter your password to confirm account deletion');
            return;
        }

        try {
            setLoading(true);
            const user = auth.currentUser;
            
            // Re-authenticate user
            const credential = EmailAuthProvider.credential(user.email, password);
            await reauthenticateWithCredential(user, credential);
            
            // Delete user document from Firestore
            await updateDoc(doc(db, 'users', user.uid), {
                status: 'deleted',
                deletedAt: new Date().toISOString()
            });
            
            // Delete the user account
            await deleteUser(user);
            
            // Clear Redux store
            dispatch(setUser(null));
            dispatch(setRole({}));
            
            Alert.alert(
                'Account Deleted',
                'Your account has been permanently deleted.',
                [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
            );
        } catch (error) {
            console.error('Error deleting account:', error);
            let errorMessage = 'Failed to delete account. Please try again.';
            
            if (error.code === 'auth/wrong-password') {
                errorMessage = 'Incorrect password. Please try again.';
            } else if (error.code === 'auth/requires-recent-login') {
                errorMessage = 'Please log in again before deleting your account.';
            }
            
            Alert.alert('Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const confirmAction = () => {
        if (selectedOption === 'deactivate') {
            Alert.alert(
                'Deactivate Account',
                'Are you sure you want to deactivate your account? You can reactivate it by logging in again.',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Deactivate', onPress: handleDeactivateAccount, style: 'destructive' }
                ]
            );
        } else if (selectedOption === 'delete') {
            Alert.alert(
                'Delete Account',
                'WARNING: This action cannot be undone. All your data will be permanently deleted.',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { 
                        text: 'Delete', 
                        onPress: () => setSelectedOption('confirmDelete'),
                        style: 'destructive' 
                    }
                ]
            );
        }
    };

    if (selectedOption === 'confirmDelete') {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Confirm Account Deletion</Text>
                <Text style={styles.subtitle}>
                    To delete your account, please enter your password to confirm this action.
                </Text>
                
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor="#9ca3af"
                />
                
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={[styles.button, styles.cancelButton]}
                        onPress={() => setSelectedOption(null)}
                        disabled={loading}
                    >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={[styles.button, styles.deleteButton, loading && styles.disabledButton]}
                        onPress={handleDeleteAccount}
                        disabled={loading || !password}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.deleteButtonText}>Delete Account</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Deactivating or Deleting Your Account</Text>
            <Text style={styles.description}>
                If you want to take a break from this app, you can temporarily deactivate your account.
                If you want to permanently delete your account, you can also do that below.
            </Text>

            {/* Deactivate Account Option */}
            <TouchableOpacity 
                style={[
                    styles.optionContainer,
                    selectedOption === 'deactivate' && styles.selectedOption
                ]}
                onPress={() => setSelectedOption('deactivate')}
                disabled={loading}
            >
                <View style={styles.optionContent}>
                    <Text style={styles.optionTitle}>Deactivate Account</Text>
                    <Text style={styles.optionDescription}>
                        Deactivating your account is temporary. Your profile and information will be 
                        hidden from other users until you reactivate it by logging in again.
                    </Text>
                </View>
                <MaterialIcons 
                    name={selectedOption === 'deactivate' ? 'radio-button-on' : 'radio-button-off'} 
                    size={24} 
                    color={selectedOption === 'deactivate' ? '#2563eb' : '#6b7280'} 
                />
            </TouchableOpacity>

            {/* Delete Account Option */}
            <TouchableOpacity 
                style={[
                    styles.optionContainer,
                    selectedOption === 'delete' && styles.selectedOption
                ]}
                onPress={() => setSelectedOption('delete')}
                disabled={loading}
            >
                <View style={styles.optionContent}>
                    <Text style={[styles.optionTitle, { color: '#dc2626' }]}>Delete Account</Text>
                    <Text style={styles.optionDescription}>
                        Deleting your account is permanent. All your profile details, applications, 
                        messages, and activity will be permanently removed. This action cannot be undone.
                    </Text>
                </View>
                <MaterialIcons 
                    name={selectedOption === 'delete' ? 'radio-button-on' : 'radio-button-off'} 
                    size={24} 
                    color={selectedOption === 'delete' ? '#dc2626' : '#6b7280'}
                />
            </TouchableOpacity>

            {selectedOption && (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={[styles.button, styles.cancelButton]}
                        onPress={() => setSelectedOption(null)}
                        disabled={loading}
                    >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={[styles.button, styles.actionButton, loading && styles.disabledButton]}
                        onPress={confirmAction}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>
                                {selectedOption === 'deactivate' ? 'Deactivate Account' : 'Delete Account'}
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 12,
    },
    description: {
        color: '#4b5563',
        marginBottom: 24,
        lineHeight: 20,
    },
    optionContainer: {
        backgroundColor: '#f9fafb',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    selectedOption: {
        borderColor: '#2563eb',
        backgroundColor: '#eff6ff',
    },
    optionContent: {
        flex: 1,
        marginRight: 12,
    },
    optionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 8,
    },
    optionDescription: {
        color: '#4b5563',
        fontSize: 14,
        lineHeight: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        flex: 1,
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButton: {
        backgroundColor: '#f3f4f6',
        marginRight: 10,
    },
    actionButton: {
        backgroundColor: '#2563eb',
    },
    deleteButton: {
        backgroundColor: '#dc2626',
    },
    disabledButton: {
        opacity: 0.7,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 16,
    },
    cancelButtonText: {
        color: '#374151',
        fontWeight: '600',
        fontSize: 16,
    },
    deleteButtonText: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 16,
    },
    input: {
        backgroundColor: '#f9fafb',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 10,
        padding: 14,
        marginBottom: 20,
        fontSize: 16,
        color: '#111827',
    },
    subtitle: {
        color: '#4b5563',
        marginBottom: 20,
        lineHeight: 20,
    },
});

export default Delete;