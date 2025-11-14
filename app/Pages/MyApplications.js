import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from 'react-redux';
import { db } from '../../Firebase';

import { MaterialIcons } from '@expo/vector-icons';

export default function MyApplications({navigation}) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  let  {user} = useSelector((state)=>state.home)

  alert (user.uid)
  
  // Get current user from Redux
  const currentUser = useSelector(state => state.user?.currentUser);
  // const userId = currentUser?.uid;

  useEffect(() => {
    if (user) {
      fetchApplications();
    }
  }, [user]);

  const fetchApplications = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      // Only fetch applications for the current user
      const q = query(
        collection(db, 'applications'),
        where('userId', '==', user.uid),
        orderBy('appliedAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      
      const apps = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Only add application if it belongs to current user (extra safety check)
        if (data.userId === user.uid) {
          apps.push({
            id: doc.id,
            ...data
          });
        }
      });
      
      setApplications(apps);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'pending':
        return { bg: '#FEF3C7', text: '#92400E' };
      case 'approved':
        return { bg: '#D1FAE5', text: '#065F46' };
      case 'rejected':
        return { bg: '#FEE2E2', text: '#991B1B' };
      default:
        return { bg: '#F3F4F6', text: '#374151' };
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  const getInitials = (collegeName) => {
    if (!collegeName) return 'NA';
    const words = collegeName.split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return collegeName.substring(0, 2).toUpperCase();
  };

  if (!user.uid ) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <Text style={{ fontSize: 16, color: '#6B7280' }}>Please sign in to view your applications</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#ffffffff", flex: 1 }}>
      <View style={{ paddingTop: 18, paddingBottom: 10, paddingHorizontal: 16, backgroundColor: "#fefefeff", borderBottomWidth: 1, borderBottomColor: "#E5E7EB" }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 20, fontWeight: "700", color: "#002D62" }}>My Applications</Text>
            <Text style={{ fontSize: 14, color: "#6B7280", marginTop: 4 }}>
              {applications.length} {applications.length === 1 ? 'Application' : 'Applications'}
            </Text>
          </View>
          <TouchableOpacity 
            onPress={fetchApplications}
            style={{ padding: 8 }}
          >
            <MaterialIcons name="refresh" size={24} color="#002D62" />
          </TouchableOpacity>
        </View>
      </View>
      
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#002D62" />
          <Text style={{ marginTop: 10, color: "#6B7280" }}>Loading applications...</Text>
        </View>
      ) : applications.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text style={{ fontSize: 16, color: "#6B7280", textAlign: 'center' }}>
            No applications found
          </Text>
        </View>
      ) : (
        <ScrollView>
          {applications.map((app) => {
            const statusColors = getStatusColor(app.status);
            return (
              <View
                key={app.id}
                style={{ flexDirection: "row", padding: 14, margin: 16, marginBottom: 8, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 18, }}>
                <View
                  style={{ width: "20%", aspectRatio: 1, borderRadius: 14, backgroundColor: "#E6F3ED", alignItems: "center", justifyContent: "center", marginRight: 12,}}>
                  <Text style={{ fontSize: 16, fontWeight: "800", color: "#002D62" }}>
                    {getInitials(app.collegeName)}
                  </Text>
                </View>
                <View style={{ width: "80%" }}>
                  <Text style={{ fontSize: 16, fontWeight: "700", color: "#0B1B13" }}>
                    {app.collegeName || 'N/A'}
                  </Text>
                  <Text style={{ marginTop: 4, fontSize: 13, color: "#6B7280" }}>
                    {app.courseName || 'N/A'}
                  </Text>
                  <Text style={{ marginTop: 2, fontSize: 12, color: "#9CA3AF" }}>
                    {app.firstName} {app.lastName}
                  </Text>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                    <View style={{ paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, backgroundColor: statusColors.bg }}>
                      <Text style={{ fontSize: 12, fontWeight: "700", color: statusColors.text }}>
                        {app.status ? app.status.charAt(0).toUpperCase() + app.status.slice(1) : 'Pending'}
                      </Text>
                    </View>
                    <Text style={{ fontSize: 12, color: "#6B7280" }}>
                      {formatDate(app.appliedAt)}
                    </Text>
                  </View>
                  <TouchableOpacity 
                    onPress={() => navigation.navigate("ApplicationDetails", { application: app })}
                    style={{ marginTop: 10, backgroundColor: "#002D62", paddingVertical: 10, borderRadius: 12, alignItems: "center" }}>
                    <Text style={{ color: "#FFFFFF", fontWeight: "700" }}>View Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
