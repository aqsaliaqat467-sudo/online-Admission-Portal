import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import { MaterialIcons, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { db } from '../../Firebase';
import { doc, getDoc } from 'firebase/firestore';

const CollegeDetails = ({ route, navigation }) => {
  const { collegeId } = route.params;
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollegeDetails = async () => {
      try {
        setLoading(true);
        const docRef = doc(db, 'colleges', collegeId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setCollege({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError('College not found');
        }
      } catch (err) {
        console.error('Error fetching college details:', err);
        setError('Failed to load college details');
      } finally {
        setLoading(false);
      }
    };

    fetchCollegeDetails();
  }, [collegeId]);

  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleEmail = (email) => {
    Linking.openURL(`mailto:${email}`);
  };

  const handleWebsite = (url) => {
    const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
    Linking.openURL(formattedUrl);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Loading college details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <MaterialIcons name="error-outline" size={48} color="#dc2626" />
        <Text style={styles.errorText}>{error}</Text>
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
    <ScrollView style={styles.container}>
      {/* Header with College Image and Basic Info */}
      <View style={styles.header}>
        {college.logoUrl ? (
          <Image source={{ uri: college.logoUrl }} style={styles.logo} />
        ) : (
          <View style={[styles.logo, styles.logoPlaceholder]}>
            <Text style={styles.logoText}>
              {college.collegeName?.charAt(0).toUpperCase() || 'C'}
            </Text>
          </View>
        )}
        
        <Text style={styles.collegeName}>{college.collegeName}</Text>
        <Text style={styles.collegeLocation}>
          {[college.city, college.state, college.country].filter(Boolean).join(', ')}
        </Text>
        
        <View style={styles.establishedContainer}>
          <Text style={styles.establishedText}>
            <MaterialIcons name="calendar-today" size={16} color="#4b5563" />
            {' '}Est. {college.establishedYear}
          </Text>
          <Text style={[styles.typeBadge, { backgroundColor: college.type === 'public' ? '#d1fae5' : '#e0f2fe' }]}>
            {college.type?.charAt(0).toUpperCase() + college.type?.slice(1) || 'N/A'}
          </Text>
        </View>
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.description}>
          {college.description || 'No description available.'}
        </Text>
      </View>

      {/* Contact Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        
        {college.email && (
          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => handleEmail(college.email)}
          >
            <MaterialIcons name="email" size={24} color="#2563eb" />
            <Text style={styles.contactText}>{college.email}</Text>
          </TouchableOpacity>
        )}
        
        {college.phone && (
          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => handleCall(college.phone)}
          >
            <MaterialIcons name="phone" size={24} color="#2563eb" />
            <Text style={styles.contactText}>{college.phone}</Text>
          </TouchableOpacity>
        )}
        
        {college.website && (
          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => handleWebsite(college.website)}
          >
            <MaterialIcons name="public" size={24} color="#2563eb" />
            <Text style={styles.contactText}>{college.website}</Text>
          </TouchableOpacity>
        )}
        
        {college.address && (
          <View style={styles.contactItem}>
            <MaterialIcons name="location-on" size={24} color="#2563eb" />
            <Text style={styles.contactText}>
              {college.address}{'\n'}
              {[college.city, college.state, college.postalCode].filter(Boolean).join(', ')}
            </Text>
          </View>
        )}
      </View>

      {/* Documents Section */}
      {college.documents && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Documents</Text>
          
          {college.documents.registrationCertificateUrl && (
            <TouchableOpacity 
              style={styles.documentItem}
              onPress={() => handleWebsite(college.documents.registrationCertificateUrl)}
            >
              <MaterialIcons name="description" size={24} color="#2563eb" />
              <Text style={styles.documentText}>Registration Certificate</Text>
              <MaterialIcons name="open-in-new" size={20} color="#6b7280" />
            </TouchableOpacity>
          )}
          
          {college.documents.affiliationCertificateUrl && (
            <TouchableOpacity 
              style={styles.documentItem}
              onPress={() => handleWebsite(college.documents.affiliationCertificateUrl)}
            >
              <MaterialIcons name="description" size={24} color="#2563eb" />
              <Text style={styles.documentText}>Affiliation Certificate</Text>
              <MaterialIcons name="open-in-new" size={20} color="#6b7280" />
            </TouchableOpacity>
          )}
        </View>
      )}
      
      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        {college.website && (
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: '#2563eb' }]}
            onPress={() => handleWebsite(college.website)}
          >
            <MaterialIcons name="public" size={20} color="white" />
            <Text style={[styles.actionButtonText, { color: 'white' }]}>Visit Website</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={[styles.actionButton, { borderWidth: 1, borderColor: '#2563eb' }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.actionButtonText, { color: '#2563eb' }]}>Back to Search</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  loadingText: {
    marginTop: 16,
    color: '#6b7280',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: '#dc2626',
    textAlign: 'center',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginBottom: 16,
  },
  logoPlaceholder: {
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#6b7280',
  },
  collegeName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 4,
  },
  collegeLocation: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 12,
  },
  establishedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  establishedText: {
    color: '#4b5563',
    fontSize: 14,
    marginRight: 12,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '500',
    color: '#1e40af',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 12,
    padding: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f3f4f6',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#4b5563',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  contactText: {
    marginLeft: 12,
    flex: 1,
    color: '#374151',
    lineHeight: 20,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    marginBottom: 8,
  },
  documentText: {
    flex: 1,
    marginLeft: 12,
    color: '#374151',
  },
  actionButtons: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#f3f4f6',
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  backButton: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default CollegeDetails;
