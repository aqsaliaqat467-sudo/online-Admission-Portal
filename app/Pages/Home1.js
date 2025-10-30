import { AntDesign, FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ImageBackground, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getAllData } from "../Helper/FirebaseHelper";

const Home1 = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const getDataFromDatabase = async () => {
        try {
            setLoading(true);
            alert ("hello")
            const clgData = await getAllData("colleges");  // Firestore se data fetch
            
            console.log("this is college data", clgData);
            
            // Filter only approved colleges
            const approvedColleges = clgData?.filter(college => college.status === 'approved') || [];
            setData(approvedColleges);
        } catch (error) {
            console.error("Error fetching colleges:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        getDataFromDatabase();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        getDataFromDatabase();
    };
    return (
        <View style={{ height: "100%", width: "100%", backgroundColor: "#ffffffff" }}>
            <ScrollView style={{ height: "100%" }}>

                <ImageBackground source={require('./uos.jpg')} style={{ width: '100%', height: 205, justifyContent: "flex-start" }}>
                    <View style={{ marginTop: 10, marginStart: 40 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: "#000000ff" }}>Find the Best College{"\n"}for Your Admission</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", backgroundColor: "#fff", borderRadius: 20, width: "80%", height: 27, alignSelf: "center", marginVertical: 10, marginTop: 15 }}>
                        <TouchableOpacity onPress={() => navigation.navigate("Clgprofile")}
                            style={{ flexDirection: 'row', alignItems: "center" }}>
                            <Ionicons name="location" size={14} color="#817f7f" />
                            <Text style={{ fontWeight: 'bold', fontSize: 10, marginStart: 5, color: "#817f7f" }}>Locations</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: "center", backgroundColor: "#c7c6c6ff", borderRadius: 12, paddingHorizontal: 8, paddingVertical: 2 }}>
                            <FontAwesome6 name="building-columns" size={12} color="#817f7f" />
                            <Text style={{ fontWeight: 'bold', fontSize: 10, marginStart: 5, color: "#817f7f" }}>Colleges</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("Search")}
                            style={{ flexDirection: 'row', alignItems: "center", backgroundColor: "#003366", borderRadius: 12, paddingHorizontal: 8, paddingVertical: 2 }}>
                            <Ionicons name="search" size={12} color="#fff" />
                            <Text style={{ fontWeight: 'bold', fontSize: 10, marginStart: 5, color: "#fff" }}>Search</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ backgroundColor: "#fff", borderRadius: 70, width: "20%", height: "35%", alignSelf: "flex-end", alignItems: "center", marginRight: 10, marginTop: 20 }}>
                        <Text style={{ fontSize: 12, textAlign: "center", marginTop: 10 }}>Choose</Text>
                        <Text style={{ fontSize: 12, textAlign: "center" }}>your</Text>
                        <Text style={{ fontSize: 12, textAlign: "center" }}>College</Text>
                    </View>
                </ImageBackground>
                <View style={{ flex: 1, width: "100%", backgroundColor: "#f5f5f5", paddingBottom: 20 }}>
                    {loading && !refreshing ? (
                        <View style={{ padding: 40, alignItems: 'center' }}>
                            <ActivityIndicator size="large" color="#003366" />
                            <Text style={{ marginTop: 10, color: '#666' }}>Loading colleges...</Text>
                        </View>
                    ) : data.length === 0 ? (
                        <View style={{ padding: 40, alignItems: 'center' }}>
                            <MaterialIcons name="school" size={60} color="#cccccc" />
                            <Text style={{ marginTop: 10, color: '#666', fontSize: 16 }}>No approved colleges found</Text>
                        </View>
                    ) : (
                        <ScrollView 
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#003366']} />
                            }
                        >
                            <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 20, marginTop: 20, marginBottom: 10 }}>
                                Approved Colleges ({data.length})
                            </Text>
                            {data?.map((item, index) => (
                                <TouchableOpacity 
                                    key={item.id || index}
                                    style={styles.collegeCard}
                                    onPress={() => navigation.navigate("College", { college: item })}
                                >
                                    {/* College Logo and Name */}
                                    <View style={styles.cardHeader}>
                                        {item.logoUrl ? (
                                            <Image source={{ uri: item.logoUrl }} style={styles.collegeLogo} />
                                        ) : (
                                            <View style={styles.defaultLogo}>
                                                <MaterialIcons name="school" size={40} color="#003366" />
                                            </View>
                                        )}
                                        <View style={styles.headerInfo}>
                                            <Text style={styles.collegeName} numberOfLines={2}>
                                                {item.collegeName}
                                            </Text>
                                            <View style={styles.typeBadge}>
                                                <Text style={styles.typeText}>
                                                    {item.type === 'public' ? '🏛️ Public' : '🏢 Private'}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>

                                    {/* Description */}
                                    {item.description && (
                                        <Text style={styles.description} numberOfLines={3}>
                                            {item.description}
                                        </Text>
                                    )}

                                    {/* Location Info */}
                                    <View style={styles.infoRow}>
                                        <Ionicons name="location" size={16} color="#666" />
                                        <Text style={styles.infoText}>
                                            {item.address}, {item.city}, {item.state}
                                        </Text>
                                    </View>

                                    <View style={styles.infoRow}>
                                        <Ionicons name="globe-outline" size={16} color="#666" />
                                        <Text style={styles.infoText}>{item.country}</Text>
                                    </View>

                                    {/* Contact Info */}
                                    <View style={styles.infoRow}>
                                        <Ionicons name="call" size={16} color="#666" />
                                        <Text style={styles.infoText}>{item.phone}</Text>
                                    </View>

                                    <View style={styles.infoRow}>
                                        <Ionicons name="mail" size={16} color="#666" />
                                        <Text style={styles.infoText} numberOfLines={1}>{item.email}</Text>
                                    </View>

                                    {/* Website */}
                                    {item.website && (
                                        <View style={styles.infoRow}>
                                            <Ionicons name="link" size={16} color="#666" />
                                            <Text style={styles.websiteText} numberOfLines={1}>{item.website}</Text>
                                        </View>
                                    )}

                                    {/* Additional Info */}
                                    <View style={styles.additionalInfo}>
                                        <View style={styles.infoBadge}>
                                            <Text style={styles.badgeLabel}>Established</Text>
                                            <Text style={styles.badgeValue}>{item.establishedYear || 'N/A'}</Text>
                                        </View>
                                        <View style={styles.infoBadge}>
                                            <Text style={styles.badgeLabel}>Postal Code</Text>
                                            <Text style={styles.badgeValue}>{item.postalCode || 'N/A'}</Text>
                                        </View>
                                    </View>

                                    {/* View Details Button */}
                                    <View style={styles.viewDetailsButton}>
                                        <Text style={styles.viewDetailsText}>View Full Details</Text>
                                        <AntDesign name="arrowright" size={18} color="#003366" />
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    )}
                    {/* <View style={{ height: 150, width: '40%', backgroundColor: "#d7d7d7ff", marginTop: 30, marginLeft: 25 }}>
                        <Image source={require('./supp.jpg')} style={{ width: '100%', height: 110, alignSelf: 'center' }}></Image>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ fontWeight: 'bold', marginStart: 8, marginTop: 9 }}>Superior College</Text>
                            <TouchableOpacity style={{ marginTop: 5 }}>
                                <AntDesign name="arrowright" size={30} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ height: 150, width: '40%', backgroundColor: "#d7d7d7ff", alignSelf: "flex-end", marginRight: 20, marginTop: -330 }}>
                        <Image source={require('./ucp.jpg')} style={{ width: '100%', height: 110, alignSelf: 'center' }}></Image>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ fontWeight: 'bold', marginStart: 8, marginTop: 9 }}>Punjab College</Text>
                            <TouchableOpacity style={{ marginTop: 4 }}>
                                <AntDesign name="arrowright" size={30} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ height: 150, width: '40%', backgroundColor: "#d7d7d7ff", alignSelf: "flex-end", marginRight: 20, marginTop: 30 }}>
                        <Image source={require('./ilm.jpg')} style={{ width: '100%', height: 110, alignSelf: 'center' }}></Image>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ fontWeight: 'bold', marginStart: 8, marginTop: 9 }}>ILM College</Text>
                            <TouchableOpacity style={{ marginTop: 4 }}>
                                <AntDesign name="arrowright" size={30} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginTop: 30 }}>
                    </View> */}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    collegeCard: {
        backgroundColor: '#ffffff',
        borderRadius: 15,
        padding: 18,
        marginHorizontal: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    collegeLogo: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 15,
        backgroundColor: '#f0f0f0',
        borderWidth: 2,
        borderColor: '#e0e0e0',
    },
    defaultLogo: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 15,
        backgroundColor: '#e6f0ff',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#003366',
    },
    headerInfo: {
        flex: 1,
    },
    collegeName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 8,
        lineHeight: 24,
    },
    typeBadge: {
        backgroundColor: '#e6f0ff',
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 15,
        alignSelf: 'flex-start',
    },
    typeText: {
        fontSize: 13,
        color: '#003366',
        fontWeight: '600',
    },
    description: {
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
        marginBottom: 15,
        fontStyle: 'italic',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingLeft: 5,
    },
    infoText: {
        fontSize: 14,
        color: '#444',
        marginLeft: 10,
        flex: 1,
    },
    websiteText: {
        fontSize: 14,
        color: '#0066cc',
        marginLeft: 10,
        flex: 1,
        textDecorationLine: 'underline',
    },
    additionalInfo: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15,
        marginBottom: 15,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    infoBadge: {
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        minWidth: 120,
    },
    badgeLabel: {
        fontSize: 12,
        color: '#888',
        marginBottom: 5,
    },
    badgeValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#003366',
    },
    viewDetailsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#003366',
        paddingVertical: 12,
        borderRadius: 10,
        marginTop: 10,
    },
    viewDetailsText: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 15,
        marginRight: 8,
    },
});

export default Home1;           