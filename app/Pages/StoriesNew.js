import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from "react-native";
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { db } from '../../Firebase';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const Stories = ({ navigation, route }) => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Get collegeId from route params or from Redux store
    const collegeIdFromRoute = route?.params?.collegeId;
    const userCollegeId = useSelector((state) => state.home.uid);
    const collegeId = collegeIdFromRoute || userCollegeId;

    useEffect(() => {
        fetchSuccessStories();
    }, [collegeId]);

    const fetchSuccessStories = async () => {
        try {
            setLoading(true);
            
            let q;
            if (collegeId) {
                // Filter by collegeId if available
                try {
                    q = query(
                        collection(db, 'successStories'),
                        where('collegeId', '==', collegeId),
                        orderBy('createdAt', 'desc')
                    );
                    console.log('Fetching stories for collegeId:', collegeId);
                } catch (indexError) {
                    // Fallback without orderBy if index not available
                    console.log('Index not found, fetching without orderBy');
                    q = query(
                        collection(db, 'successStories'),
                        where('collegeId', '==', collegeId)
                    );
                }
            } else {
                // Fetch all stories if no collegeId
                q = query(
                    collection(db, 'successStories'),
                    orderBy('createdAt', 'desc')
                );
                console.log('Fetching all stories');
            }
            
            const querySnapshot = await getDocs(q);
            const storiesData = [];
            querySnapshot.forEach((doc) => {
                storiesData.push({ id: doc.id, ...doc.data() });
            });
            
            // Sort in memory if filtering by collegeId
            if (collegeId) {
                storiesData.sort((a, b) => {
                    const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
                    const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
                    return dateB - dateA;
                });
            }
            
            setStories(storiesData);
            console.log('Fetched stories:', storiesData.length);
            console.log('Stories data:', storiesData);
        } catch (error) {
            console.error("Error fetching success stories:", error);
            console.error("Error details:", error.message);
        } finally {
            setLoading(false);
        }
    };

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

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#003366" />
                </TouchableOpacity>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerTitle}>Success Stories</Text>
                    <Text style={styles.headerSubtitle}>
                        {collegeId ? 'College graduate achievements and testimonials' : 'Showcase graduate achievements and testimonials'}
                    </Text>
                </View>
            </View>

            {/* College Filter Info */}
            {collegeId && (
                <View style={styles.filterInfo}>
                    <Ionicons name="filter" size={16} color="#003366" />
                    <Text style={styles.filterText}>Showing stories for this college</Text>
                </View>
            )}

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#003366" />
                        <Text style={styles.loadingText}>Loading success stories...</Text>
                    </View>
                ) : stories.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <MaterialIcons name="auto-stories" size={60} color="#ccc" />
                        <Text style={styles.emptyText}>No success stories yet</Text>
                        <Text style={styles.emptySubtext}>
                            {collegeId ? 'This college has no success stories yet' : 'Check back later for inspiring stories!'}
                        </Text>
                    </View>
                ) : (
                    stories.map((story, index) => (
                        <View key={story.id || index} style={styles.storyCard}>
                            {/* Student Header */}
                            <View style={styles.studentHeader}>
                                {story.studentPhotoUrl ? (
                                    <Image 
                                        source={{ uri: story.studentPhotoUrl }} 
                                        style={styles.studentPhoto}
                                    />
                                ) : (
                                    <View style={styles.defaultPhoto}>
                                        <MaterialIcons name="person" size={30} color="#003366" />
                                    </View>
                                )}
                                <View style={styles.studentInfo}>
                                    <Text style={styles.studentName}>{story.studentName || 'Anonymous'}</Text>
                                    <Text style={styles.dateText}>
                                        <Ionicons name="time-outline" size={12} color="#888" />
                                        {' '}{formatDate(story.createdAt)}
                                    </Text>
                                </View>
                            </View>

                            {/* Journey Highlight */}
                            {story.journeyHighlight && (
                                <View style={styles.highlightContainer}>
                                    <Ionicons name="star" size={16} color="#FFA500" />
                                    <Text style={styles.highlightText}>{story.journeyHighlight}</Text>
                                </View>
                            )}

                            {/* Story Text */}
                            <Text style={styles.storyText}>{story.storyText}</Text>

                            {/* Timestamps Footer */}
                            <View style={styles.timestampsContainer}>
                                <View style={styles.timestampItem}>
                                    <Ionicons name="calendar-outline" size={14} color="#666" />
                                    <Text style={styles.timestampLabel}>Created: </Text>
                                    <Text style={styles.timestampValue}>{formatDate(story.createdAt)}</Text>
                                </View>
                                {story.updatedAt && story.updatedAt !== story.createdAt && (
                                    <View style={styles.timestampItem}>
                                        <Ionicons name="refresh-outline" size={14} color="#666" />
                                        <Text style={styles.timestampLabel}>Updated: </Text>
                                        <Text style={styles.timestampValue}>{formatDate(story.updatedAt)}</Text>
                                    </View>
                                )}
                            </View>

                            {/* Action Buttons */}
                            <View style={styles.actionButtons}>
                                <TouchableOpacity style={styles.actionButton}>
                                    <Ionicons name="heart-outline" size={20} color="#003366" />
                                    <Text style={styles.actionButtonText}>Inspire</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.actionButton}>
                                    <Ionicons name="share-social-outline" size={20} color="#003366" />
                                    <Text style={styles.actionButtonText}>Share</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                )}

                <View style={{ height: 20 }} />
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    backButton: {
        marginRight: 15,
    },
    headerTextContainer: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#003366',
    },
    headerSubtitle: {
        fontSize: 13,
        color: '#666',
        marginTop: 2,
    },
    filterInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e6f0ff',
        padding: 10,
        marginHorizontal: 15,
        marginTop: 10,
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#003366',
    },
    filterText: {
        fontSize: 13,
        color: '#003366',
        marginLeft: 8,
        fontWeight: '600',
    },
    scrollView: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        marginTop: 50,
    },
    loadingText: {
        marginTop: 15,
        fontSize: 16,
        color: '#666',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        marginTop: 50,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#999',
        marginTop: 15,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#bbb',
        marginTop: 5,
    },
    storyCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 18,
        margin: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    studentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    studentPhoto: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
        borderWidth: 2,
        borderColor: '#003366',
    },
    defaultPhoto: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
        backgroundColor: '#e6f0ff',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#003366',
    },
    studentInfo: {
        flex: 1,
    },
    studentName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 5,
    },
    dateText: {
        fontSize: 12,
        color: '#888',
    },
    highlightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff8e1',
        padding: 12,
        borderRadius: 10,
        marginBottom: 15,
        borderLeftWidth: 4,
        borderLeftColor: '#FFA500',
    },
    highlightText: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#856404',
        marginLeft: 10,
        flex: 1,
        fontWeight: '600',
    },
    storyText: {
        fontSize: 15,
        color: '#444',
        lineHeight: 24,
        marginBottom: 15,
        textAlign: 'justify',
    },
    timestampsContainer: {
        backgroundColor: '#f8f9fa',
        padding: 12,
        borderRadius: 8,
        marginBottom: 15,
    },
    timestampItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    timestampLabel: {
        fontSize: 12,
        color: '#666',
        marginLeft: 5,
        fontWeight: '600',
    },
    timestampValue: {
        fontSize: 12,
        color: '#888',
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: '#e6f0ff',
    },
    actionButtonText: {
        fontSize: 14,
        color: '#003366',
        fontWeight: '600',
        marginLeft: 8,
    },
});

export default Stories;
