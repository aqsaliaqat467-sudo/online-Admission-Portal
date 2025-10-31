import React from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function ApplicationDetails({ route, navigation }) {
  const { application } = route.params || {};

  if (!application) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffffff" }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: "#6B7280" }}>No application data found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

  const statusColors = getStatusColor(application.status);

  const InfoRow = ({ label, value }) => (
    <View style={{ marginBottom: 12 }}>
      <Text style={{ fontSize: 12, color: "#6B7280", marginBottom: 2 }}>{label}</Text>
      <Text style={{ fontSize: 14, color: "#111827", fontWeight: "500" }}>{value || 'N/A'}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: "#ffffff", padding: 16, borderBottomWidth: 1, borderBottomColor: "#E5E7EB" }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 12 }}>
          <Ionicons name="arrow-back" size={24} color="#002D62" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "700", color: "#002D62" }}>Application Details</Text>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {/* College & Course Info */}
        <View style={{ backgroundColor: "#FFFFFF", margin: 16, padding: 16, borderRadius: 12, borderWidth: 1, borderColor: "#E5E7EB" }}>
          <Text style={{ fontSize: 18, fontWeight: "700", color: "#002D62", marginBottom: 8 }}>
            {application.collegeName}
          </Text>
          <Text style={{ fontSize: 16, color: "#374151", marginBottom: 4 }}>
            {application.courseName}
          </Text>
          <Text style={{ fontSize: 13, color: "#6B7280", marginTop: 8 }}>
            Applied On: {formatDate(application.appliedAt)}
          </Text>
          <View style={{ marginTop: 12, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, backgroundColor: statusColors.bg, alignSelf: 'flex-start' }}>
            <Text style={{ fontSize: 13, fontWeight: "700", color: statusColors.text }}>
              {application.status ? application.status.charAt(0).toUpperCase() + application.status.slice(1) : 'Pending'}
            </Text>
          </View>
        </View>

        {/* Personal Information */}
        <View style={{ backgroundColor: "#FFFFFF", marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 12, borderWidth: 1, borderColor: "#E5E7EB" }}>
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#002D62", marginBottom: 16 }}>
            📋 Personal Information
          </Text>
          <InfoRow label="Full Name" value={`${application.firstName} ${application.lastName}`} />
          <InfoRow label="Email" value={application.email} />
          <InfoRow label="Phone" value={application.phone} />
          <InfoRow label="Date of Birth" value={application.dateOfBirth} />
          <InfoRow label="Gender" value={application.gender} />
          <InfoRow label="Nationality" value={application.nationality} />
        </View>

        {/* Previous Education */}
        <View style={{ backgroundColor: "#FFFFFF", marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 12, borderWidth: 1, borderColor: "#E5E7EB" }}>
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#002D62", marginBottom: 16 }}>
            🎓 Previous Education
          </Text>
          <InfoRow label="Education Level" value={application.previousEducation} />
          <InfoRow label="Institution" value={application.previousInstitution} />
          <InfoRow label="Year of Completion" value={application.previousYear} />
          <InfoRow label="Grade/Percentage" value={application.previousGrade} />
        </View>

        {/* Address Details */}
        <View style={{ backgroundColor: "#FFFFFF", marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 12, borderWidth: 1, borderColor: "#E5E7EB" }}>
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#002D62", marginBottom: 16 }}>
            📍 Address Details
          </Text>
          <InfoRow label="Street Address" value={application.address} />
          <InfoRow label="City" value={application.city} />
          <InfoRow label="State/Province" value={application.state} />
          <InfoRow label="Country" value={application.country} />
          <InfoRow label="Postal Code" value={application.postalCode} />
        </View>

        {/* Emergency Contact */}
        <View style={{ backgroundColor: "#FFFFFF", marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 12, borderWidth: 1, borderColor: "#E5E7EB" }}>
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#002D62", marginBottom: 16 }}>
            🚨 Emergency Contact
          </Text>
          <InfoRow label="Contact Name" value={application.emergencyContactName} />
          <InfoRow label="Contact Phone" value={application.emergencyContactPhone} />
          <InfoRow label="Relationship" value={application.emergencyContactRelation} />
        </View>

        {/* Additional Information */}
        <View style={{ backgroundColor: "#FFFFFF", marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 12, borderWidth: 1, borderColor: "#E5E7EB" }}>
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#002D62", marginBottom: 16 }}>
            ✍️ Additional Information
          </Text>
          <InfoRow label="Motivation" value={application.motivation} />
          <InfoRow label="Additional Info" value={application.additionalInfo} />
        </View>

        {/* Documents */}
        {(application.photoFile !== 'null' || application.documentsFile !== 'null') && (
          <View style={{ backgroundColor: "#FFFFFF", marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 12, borderWidth: 1, borderColor: "#E5E7EB" }}>
            <Text style={{ fontSize: 16, fontWeight: "700", color: "#002D62", marginBottom: 16 }}>
              📎 Uploaded Documents
            </Text>
            {application.photoFile !== 'null' && (
              <InfoRow label="Photo" value="Uploaded ✓" />
            )}
            {application.documentsFile !== 'null' && (
              <InfoRow label="Supporting Documents" value="Uploaded ✓" />
            )}
          </View>
        )}

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}