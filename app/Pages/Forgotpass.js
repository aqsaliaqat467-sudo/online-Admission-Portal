import { router } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { resetPassword } from '../Helper/FirebaseHelper';

const ForgotPass = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const handleResetPassword = async () => {
        if (!email) {
            alert('Please enter your email address');
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        setLoading(true);
        try {
            const result = await resetPassword(email);
            if (result.success) {
                setEmailSent(true);
            } else {
                alert(result.message || 'Failed to send reset email. Please try again.');
            }
        } catch (error) {
            console.error('Password reset error:', error);
            alert('An unexpected error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (emailSent) {
        return (
            <View style={styles.container}>
                <View style={styles.successContainer}>
                    <View style={styles.iconContainer}>
                        <Text style={styles.icon}>✓</Text>
                    </View>
                    <Text style={styles.successTitle}>Check Your Email</Text>
                    <Text style={styles.successText}>
                        We've sent a password reset link to {email}. 
                        Please check your inbox and follow the instructions to reset your password.
                    </Text>
                    <Text style={styles.noteText}>
                        Didn't receive the email? Check your spam folder or try again.
                    </Text>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <Text style={styles.backButtonText}>Back to Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView 
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView 
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Forgot Password</Text>
                        <Text style={styles.subtitle}>
                            Enter your email address and we'll send you a link to reset your password.
                        </Text>
                    </View>

                    <View style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email Address</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your email"
                                placeholderTextColor="#999"
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                autoCorrect={false}
                                editable={!loading}
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.button, loading && styles.buttonDisabled]}
                            onPress={handleResetPassword}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.buttonText}>Send Reset Link</Text>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.backToLogin}
                            onPress={() => router.back()}
                            disabled={loading}
                        >
                            <Text style={styles.backToLoginText}>
                                Back to Login
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        marginTop: 40,
        marginBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#003366',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        lineHeight: 22,
    },
    formContainer: {
        marginTop: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: '#333',
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        backgroundColor: '#F8F9FA',
        borderRadius: 10,
        height: 56,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#003366',
        height: 56,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    backToLogin: {
        marginTop: 20,
        alignItems: 'center',
    },
    backToLoginText: {
        color: '#003366',
        fontSize: 15,
        fontWeight: '500',
    },
    successContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#e8f5e9',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    icon: {
        fontSize: 40,
        color: '#4caf50',
        fontWeight: 'bold',
    },
    successTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#003366',
        marginBottom: 15,
        textAlign: 'center',
    },
    successText: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 24,
    },
    noteText: {
        fontSize: 14,
        color: '#777',
        textAlign: 'center',
        marginBottom: 30,
        fontStyle: 'italic',
    },
    backButton: {
        backgroundColor: '#003366',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
    },
    backButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});

export default ForgotPass;