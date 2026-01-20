import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from "react";
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Clgprofile = ({ route, navigation }) => {
    // Get college data from navigation params
    const college = route?.params?.college;

    // Format timestamp to readable date
    const formatDate = (timestamp) => {
        if (!timestamp) return 'N/A';
        try {
            const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
            return date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            return 'N/A';
        }
    };

    // Handle opening URLs
    const openURL = (url) => {
        if (url) {
            Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
        }
    };

    const openPhone = (phone) => {
        if (phone) {
            Linking.openURL(`tel:${phone}`).catch(err => console.error("Failed to open phone:", err));
        }
    };

    const openEmail = (email) => {
        if (email) {
            Linking.openURL(`mailto:${email}`).catch(err => console.error("Failed to open email:", err));
        }
    };

    if (!college) {
        return (
            <View style={styles.errorContainer}>
                <MaterialIcons name="error-outline" size={60} color="#999" />
                <Text style={styles.errorText}>No college data available</Text>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header with Logo */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="#003366" />
                </TouchableOpacity>
                {college.logoUrl ? (
                    <Image source={{ uri: college.logoUrl }} style={styles.logo} />
                ) : (
                    <View style={styles.defaultLogo}>
                        <MaterialIcons name="school" size={60} color="#003366" />
                    </View>
                )}
                <Text style={styles.collegeName}>{college.collegeName}</Text>
                

                {/* Type Badge */}
                <View style={styles.typeBadge}>
                    <Text style={styles.typeText}>
                        {college.type === 'public' ? '🏛️ Public Institution' : '🏢 Private Institution'}
                    </Text>
                </View>
            </View>

            {/* About Section */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Ionicons name="information-circle" size={24} color="#003366" />
                    <Text style={styles.sectionTitle}>About</Text>
                </View>
                <Text style={styles.description}>{college.description}</Text>
            </View>

            {/* Key Information */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Ionicons name="calendar" size={24} color="#003366" />
                    <Text style={styles.sectionTitle}>Key Information</Text>
                </View>
                <View style={styles.infoGrid}>
                    <View style={styles.infoBox}>
                        <Text style={styles.infoLabel}>Established</Text>
                        <Text style={styles.infoValue}>{college.establishedYear}</Text>
                    </View>
                    <View style={styles.infoBox}>
                        <Text style={styles.infoLabel}>Type</Text>
                        <Text style={styles.infoValue}>{college.type?.toUpperCase()}</Text>
                    </View>
                </View>
            </View>

            {/* Contact Information */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Ionicons name="call" size={24} color="#003366" />
                    <Text style={styles.sectionTitle}>Contact Information</Text>
                </View>
                
                <TouchableOpacity style={styles.contactItem} onPress={() => openPhone(college.phone)}>
                    <Ionicons name="call-outline" size={20} color="#003366" />
                    <Text style={styles.contactText}>{college.phone}</Text>
                    <Ionicons name="chevron-forward" size={20} color="#999" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.contactItem} onPress={() => openEmail(college.email)}>
                    <Ionicons name="mail-outline" size={20} color="#003366" />
                    <Text style={styles.contactText}>{college.email}</Text>
                    <Ionicons name="chevron-forward" size={20} color="#999" />
                </TouchableOpacity>

                {college.website && (
                    <TouchableOpacity style={styles.contactItem} onPress={() => openURL(college.website)}>
                        <Ionicons name="globe-outline" size={20} color="#003366" />
                        <Text style={styles.contactText}>{college.website}</Text>
                        <Ionicons name="chevron-forward" size={20} color="#999" />
                    </TouchableOpacity>
                )}
            </View>

            {/* Address Section */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Ionicons name="location" size={24} color="#003366" />
                    <Text style={styles.sectionTitle}>Address</Text>
                </View>
                <View style={styles.addressContainer}>
                    <Text style={styles.addressText}>{college.address}</Text>
                    <Text style={styles.addressText}>{college.city}, {college.state}</Text>
                    <Text style={styles.addressText}>{college.country} - {college.postalCode}</Text>
                </View>
            </View>

            {/* Facilities Section */}
            {college.facilities && college.facilities.length > 0 && (
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <MaterialIcons name="local-library" size={24} color="#003366" />
                        <Text style={styles.sectionTitle}>Facilities</Text>
                    </View>
                    <View style={styles.facilitiesGrid}>
                        {college.facilities.map((facility, index) => (
                            <View key={index} style={styles.facilityChip}>
                                <Ionicons name="checkmark-circle" size={16} color="#28a745" />
                                <Text style={styles.facilityText}>{facility}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            )}

            {/* Documents Section */}
            {college.registrationCertificateUrl && (
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <MaterialIcons name="description" size={24} color="#003366" />
                        <Text style={styles.sectionTitle}>Documents</Text>
                    </View>
                    <TouchableOpacity 
                        style={styles.documentItem}
                        onPress={() => openURL(college.registrationCertificateUrl)}
                    >
                        <MaterialIcons name="verified" size={24} color="#28a745" />
                        <View style={styles.documentInfo}>
                            <Text style={styles.documentTitle}>Registration Certificate</Text>
                            <Text style={styles.documentSubtitle}>Tap to view</Text>
                        </View>
                        <Ionicons name="open-outline" size={20} color="#003366" />
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    errorText: {
        fontSize: 18,
        color: '#666',
        marginTop: 15,
        marginBottom: 20,
    },
    backButton: {
        backgroundColor: '#003366',
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 25,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    header: {
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 20,
        paddingTop: 40,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    backBtn: {
        position: 'absolute',
        top: 15,
        left: 15,
        zIndex: 10,
    },
    logo: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 15,
        borderWidth: 4,
        borderColor: '#003366',
    },
    defaultLogo: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 15,
        backgroundColor: '#e6f0ff',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#003366',
    },
    collegeName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#003366',
        textAlign: 'center',
        marginBottom: 10,
    },
    statusBadge: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
        marginBottom: 8,
    },
    approvedBadge: {
        backgroundColor: '#d4edda',
    },
    pendingBadge: {
        backgroundColor: '#fff3cd',
    },
    statusText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#155724',
    },
    typeBadge: {
        backgroundColor: '#e6f0ff',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
    },
    typeText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#003366',
    },
    section: {
        backgroundColor: '#fff',
        margin: 15,
        padding: 18,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#003366',
        marginLeft: 10,
    },
    description: {
        fontSize: 15,
        color: '#555',
        lineHeight: 24,
        textAlign: 'justify',
    },
    infoGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    infoBox: {
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        padding: 15,
        borderRadius: 12,
        minWidth: 140,
    },
    infoLabel: {
        fontSize: 13,
        color: '#888',
        marginBottom: 5,
    },
    infoValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#003366',
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#f8f9fa',
        borderRadius: 10,
        marginBottom: 10,
    },
    contactText: {
        flex: 1,
        fontSize: 14,
        color: '#444',
        marginLeft: 12,
    },
    addressContainer: {
        backgroundColor: '#f8f9fa',
        padding: 15,
        borderRadius: 10,
    },
    addressText: {
        fontSize: 14,
        color: '#444',
        marginBottom: 5,
        lineHeight: 20,
    },
    facilitiesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    facilityChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e6f0ff',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
    },
    facilityText: {
        fontSize: 13,
        color: '#003366',
        marginLeft: 6,
        fontWeight: '600',
    },
    documentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#f8f9fa',
        borderRadius: 10,
    },
    documentInfo: {
        flex: 1,
        marginLeft: 12,
    },
    documentTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#003366',
        marginBottom: 3,
    },
    documentSubtitle: {
        fontSize: 12,
        color: '#888',
    },
    timestampContainer: {
        backgroundColor: '#f8f9fa',
        padding: 12,
        borderRadius: 10,
    },
    timestampItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    timestampLabel: {
        fontSize: 13,
        color: '#666',
        marginLeft: 8,
        fontWeight: '600',
    },
    timestampValue: {
        fontSize: 12,
        color: '#888',
        flex: 1,
    },
});

export default Clgprofile;