import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Carousel from "react-native-reanimated-carousel";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Firebase';

const { width } = Dimensions.get("window");

const College = ({ navigation, route }) => {
    // Get college data passed from Home1
    const college = route?.params?.college;
    
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const images = [
        require("./images.png"),
        require("./image1.jpg"),
        require("./image2.jpg"),
    ];

    // Fetch courses for this college
    useEffect(() => {
        if (college?.uid) {
            fetchCourses();
        } else {
            setLoading(false);
        }
    }, [college]);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const q = query(
                collection(db, 'courses'), 
                where('collegeId', '==', college.uid)
            );
            const querySnapshot = await getDocs(q);
            
            const coursesData = [];
            querySnapshot.forEach((doc) => {
                coursesData.push({ id: doc.id, ...doc.data() });
            });
            
            setCourses(coursesData);
            console.log('Courses fetched:', coursesData);
        } catch (error) {
            console.error("Error fetching courses:", error);
        } finally {
            setLoading(false);
        }
    };

    // Format timestamp to readable date
    const formatDate = (timestamp) => {
        if (!timestamp) return 'N/A';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
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
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* College Header */}
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        {college.logoUrl ? (
                            <Image source={{ uri: college.logoUrl }} style={styles.collegeLogo} />
                        ) : (
                            <View style={styles.defaultLogo}>
                                <MaterialIcons name="school" size={50} color="#003366" />
                            </View>
                        )}
                        <View style={styles.headerInfo}>
                            <Text style={styles.collegeName}>{college.collegeName}</Text>
                            <View style={styles.typeBadge}>
                                <Text style={styles.typeText}>
                                    {college.type === 'public' ? '🏛️ Public' : '🏢 Private'}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Image Carousel */}
                <View style={styles.carouselContainer}>
                    <Carousel
                        loop
                        width={width}
                        height={220}
                        autoPlay={true}
                        data={college.logoUrl ? [{ uri: college.logoUrl }, ...images] : images}
                        scrollAnimationDuration={1000}
                        renderItem={({ item }) => (
                            <Image
                                source={typeof item === 'string' ? { uri: item } : item}
                                style={styles.carouselImage}
                                resizeMode="cover"
                            />
                        )}
                    />
                </View>

                {/* College Information */}
                <View style={styles.infoSection}>
                    <Text style={styles.sectionTitle}>About College</Text>
                    <Text style={styles.description}>{college.description}</Text>

                    <View style={styles.infoRow}>
                        <Ionicons name="location" size={18} color="#003366" />
                        <Text style={styles.infoText}>
                            {college.address}, {college.city}, {college.state}, {college.country}
                        </Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Ionicons name="call" size={18} color="#003366" />
                        <Text style={styles.infoText}>{college.phone}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Ionicons name="mail" size={18} color="#003366" />
                        <Text style={styles.infoText}>{college.email}</Text>
                    </View>

                    {college.website && (
                        <View style={styles.infoRow}>
                            <Ionicons name="globe" size={18} color="#003366" />
                            <Text style={styles.websiteText}>{college.website}</Text>
                        </View>
                    )}

                    <View style={styles.statsRow}>
                        <View style={styles.statBox}>
                            <Text style={styles.statLabel}>Established</Text>
                            <Text style={styles.statValue}>{college.establishedYear}</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statLabel}>Postal Code</Text>
                            <Text style={styles.statValue}>{college.postalCode}</Text>
                        </View>
                    </View>
                </View>

                {/* Courses Section */}
                <View style={styles.coursesSection}>
                    <Text style={styles.sectionTitle}>Available Courses ({courses.length})</Text>
                    
                    {loading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#003366" />
                            <Text style={styles.loadingText}>Loading courses...</Text>
                        </View>
                    ) : courses.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <MaterialIcons name="school" size={50} color="#ccc" />
                            <Text style={styles.emptyText}>No courses available yet</Text>
                        </View>
                    ) : (
                        courses.map((course, index) => (
                            <View key={course.id || index} style={styles.courseCard}>
                                {/* Course Header */}
                                <View style={styles.courseHeader}>
                                    <View style={styles.courseIcon}>
                                        <MaterialIcons name="book" size={30} color="#003366" />
                                    </View>
                                    <View style={styles.courseHeaderInfo}>
                                        <Text style={styles.courseTitle}>{course.title}</Text>
                                        <View style={styles.courseTypeBadge}>
                                            <Text style={styles.courseTypeText}>
                                                {course.courseType?.toUpperCase()}
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                {/* Course Description */}
                                <Text style={styles.courseDescription}>{course.description}</Text>

                                {/* Course Details Grid */}
                                <View style={styles.courseDetailsGrid}>
                                    <View style={styles.detailItem}>
                                        <Text style={styles.detailLabel}>Department</Text>
                                        <Text style={styles.detailValue}>{course.department}</Text>
                                    </View>
                                    <View style={styles.detailItem}>
                                        <Text style={styles.detailLabel}>Duration</Text>
                                        <Text style={styles.detailValue}>{course.duration}</Text>
                                    </View>
                                </View>

                                <View style={styles.courseDetailsGrid}>
                                    <View style={styles.detailItem}>
                                        <Text style={styles.detailLabel}>Fees</Text>
                                        <Text style={styles.detailValue}>₨ {course.fees?.toLocaleString()}</Text>
                                    </View>
                                    <View style={styles.detailItem}>
                                        <Text style={styles.detailLabel}>Intake Capacity</Text>
                                        <Text style={styles.detailValue}>{course.intakeCapacity} students</Text>
                                    </View>
                                </View>

                                {/* Eligibility */}
                                <View style={styles.eligibilitySection}>
                                    <Text style={styles.eligibilityLabel}>Eligibility:</Text>
                                    <Text style={styles.eligibilityText}>{course.eligibility}</Text>
                                </View>

                                {/* Admission Dates */}
                                <View style={styles.datesSection}>
                                    <View style={styles.dateItem}>
                                        <Ionicons name="calendar-outline" size={16} color="#28a745" />
                                        <View style={styles.dateInfo}>
                                            <Text style={styles.dateLabel}>Admission Start</Text>
                                            <Text style={styles.dateValue}>{formatDate(course.admissionStart)}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.dateItem}>
                                        <Ionicons name="calendar-outline" size={16} color="#dc3545" />
                                        <View style={styles.dateInfo}>
                                            <Text style={styles.dateLabel}>Admission End</Text>
                                            <Text style={styles.dateValue}>{formatDate(course.admissionEnd)}</Text>
                                        </View>
                                    </View>
                                </View>

                                {/* Apply Button */}
                                <TouchableOpacity 
                                    style={styles.applyButton}
                                    onPress={() => navigation.navigate('AdmissionNew', { course, college })}
                                >
                                    <Text style={styles.applyButtonText}>Apply Now</Text>
                                    <Ionicons name="arrow-forward" size={18} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        ))
                    )}
                </View>

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                    <TouchableOpacity 
                        style={styles.actionButton}
                        onPress={() => navigation.navigate("Clgprofile", { college })}
                    >
                        <Ionicons name="information-circle-outline" size={24} color="#fff" />
                        <Text style={styles.actionButtonText}>View Full Profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.actionButton}
                        onPress={() => navigation.navigate("Stories", { collegeId: college?.uid })}
                    >
                        <Ionicons name="star-outline" size={24} color="#fff" />
                        <Text style={styles.actionButtonText}>Success Stories</Text>
                    </TouchableOpacity>
                </View>

                {/* Chat Button */}
                <TouchableOpacity 
                    style={styles.chatButton}
                    onPress={() => navigation.navigate("Chat")}
                >
                    <Ionicons name="chatbox-outline" size={30} color="#003366" />
                    <Text style={styles.chatButtonText}>Chat</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

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
        padding: 20,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    collegeLogo: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 15,
        borderWidth: 3,
        borderColor: '#e0e0e0',
    },
    defaultLogo: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 15,
        backgroundColor: '#e6f0ff',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#003366',
    },
    headerInfo: {
        flex: 1,
    },
    collegeName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 8,
    },
    typeBadge: {
        backgroundColor: '#e6f0ff',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
        alignSelf: 'flex-start',
    },
    typeText: {
        fontSize: 13,
        color: '#003366',
        fontWeight: '600',
    },
    carouselContainer: {
        marginVertical: 15,
    },
    carouselImage: {
        width: '90%',
        height: 180,
        alignSelf: 'center',
        borderRadius: 20,
        marginTop: 12,
    },
    infoSection: {
        backgroundColor: '#fff',
        margin: 15,
        padding: 20,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#003366',
        marginBottom: 15,
    },
    description: {
        fontSize: 15,
        color: '#555',
        lineHeight: 22,
        marginBottom: 20,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    infoText: {
        fontSize: 14,
        color: '#444',
        marginLeft: 12,
        flex: 1,
    },
    websiteText: {
        fontSize: 14,
        color: '#0066cc',
        marginLeft: 12,
        flex: 1,
        textDecorationLine: 'underline',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    statBox: {
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 12,
        minWidth: 130,
    },
    statLabel: {
        fontSize: 13,
        color: '#888',
        marginBottom: 5,
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#003366',
    },
    coursesSection: {
        margin: 15,
    },
    loadingContainer: {
        padding: 40,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 15,
    },
    loadingText: {
        marginTop: 10,
        color: '#666',
        fontSize: 14,
    },
    emptyContainer: {
        padding: 40,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 15,
    },
    emptyText: {
        marginTop: 10,
        color: '#999',
        fontSize: 15,
    },
    courseCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 18,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    courseHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    courseIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#e6f0ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    courseHeaderInfo: {
        flex: 1,
    },
    courseTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 8,
    },
    courseTypeBadge: {
        backgroundColor: '#28a745',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    courseTypeText: {
        fontSize: 11,
        color: '#fff',
        fontWeight: '600',
    },
    courseDescription: {
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
        marginBottom: 15,
    },
    courseDetailsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    detailItem: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        padding: 12,
        borderRadius: 10,
        marginHorizontal: 4,
    },
    detailLabel: {
        fontSize: 12,
        color: '#888',
        marginBottom: 4,
    },
    detailValue: {
        fontSize: 15,
        fontWeight: '600',
        color: '#003366',
    },
    eligibilitySection: {
        backgroundColor: '#fff3cd',
        padding: 12,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 15,
        borderLeftWidth: 4,
        borderLeftColor: '#ffc107',
    },
    eligibilityLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: '#856404',
        marginBottom: 5,
    },
    eligibilityText: {
        fontSize: 13,
        color: '#856404',
        lineHeight: 18,
    },
    datesSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    dateItem: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#f8f9fa',
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 4,
    },
    dateInfo: {
        marginLeft: 8,
        flex: 1,
    },
    dateLabel: {
        fontSize: 11,
        color: '#888',
        marginBottom: 2,
    },
    dateValue: {
        fontSize: 12,
        fontWeight: '600',
        color: '#444',
    },
    applyButton: {
        backgroundColor: '#003366',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 10,
        marginTop: 10,
    },
    applyButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginRight: 8,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        marginBottom: 15,
    },
    actionButton: {
        flex: 1,
        backgroundColor: '#003366',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 8,
    },
    chatButton: {
        alignSelf: 'flex-end',
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginRight: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    chatButtonText: {
        color: '#003366',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 8,
    },
});

export default College