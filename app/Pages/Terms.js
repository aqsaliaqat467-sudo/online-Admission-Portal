import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Terms() {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Terms of Use</Text>
        <Text style={styles.lastUpdated}>Last updated: {new Date().toLocaleDateString()}</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
          <Text style={styles.paragraph}>
            By accessing or using our application, you agree to be bound by these Terms of Use and all applicable laws and regulations. 
            If you do not agree with any of these terms, you are prohibited from using or accessing this application.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. User Responsibilities</Text>
          <Text style={styles.paragraph}>
            As a user of this application, you agree to:
          </Text>
          <Text style={styles.listItem}>• Provide accurate and complete information</Text>
          <Text style={styles.listItem}>• Maintain the security of your account credentials</Text>
          <Text style={styles.listItem}>• Use the application only for lawful purposes</Text>
          <Text style={styles.listItem}>• Not engage in any activity that could harm the application or other users</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Prohibited Activities</Text>
          <Text style={styles.paragraph}>You agree not to:</Text>
          <Text style={styles.listItem}>• Violate any applicable laws or regulations</Text>
          <Text style={styles.listItem}>• Infringe on intellectual property rights</Text>
          <Text style={styles.listItem}>• Transmit any viruses or malicious code</Text>
          <Text style={styles.listItem}>• Attempt to gain unauthorized access to the application</Text>
          <Text style={styles.listItem}>• Use the application for any fraudulent or illegal purposes</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Account Termination</Text>
          <Text style={styles.paragraph}>
            We reserve the right to suspend or terminate your account at our sole discretion, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Intellectual Property</Text>
          <Text style={styles.paragraph}>
            All content included in the application, such as text, graphics, logos, and software, is the property of the application owner or its content suppliers and protected by international copyright laws.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Limitation of Liability</Text>
          <Text style={styles.paragraph}>
            To the fullest extent permitted by law, in no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Changes to Terms</Text>
          <Text style={styles.paragraph}>
            We reserve the right to modify these terms at any time. We will provide notice of any changes by updating the "Last updated" date at the top of these Terms.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Contact Us</Text>
          <Text style={styles.paragraph}>
            If you have any questions about these Terms, please contact us at support@yourapp.com
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Back to Settings</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  lastUpdated: {
    color: '#666',
    marginBottom: 20,
    fontSize: 12,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
    marginBottom: 10,
  },
  listItem: {
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
    marginLeft: 15,
    marginBottom: 5,
  },
  backButton: {
    backgroundColor: '#003366',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});