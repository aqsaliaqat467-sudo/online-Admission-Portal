import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { db } from "../../Firebase";

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigation = useNavigation();  // <-- ADD THIS

  // Fetch all colleges on component mount
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        setLoading(true);
        const collegesRef = collection(db, 'colleges');
        const q = query(collegesRef, where('status', '==', 'approved')); // Only show approved colleges
        const querySnapshot = await getDocs(q);
        
        const collegesData = [];
        querySnapshot.forEach((doc) => {
          collegesData.push({ id: doc.id, ...doc.data() });
        });
        
        setColleges(collegesData);

        console.log("colleges", collegesData);
        
        setFilteredColleges(collegesData);
      } catch (err) {
        console.error("Error fetching colleges:", err);
        setError("Failed to load colleges. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  // Filter colleges based on search query (case-insensitive)
  useEffect(() => {
    console.log('Search query changed:', searchQuery);
    
    if (!searchQuery.trim()) {
      console.log('Empty search query, showing all colleges');
      setFilteredColleges(colleges);
      return;
    }
    
    const searchTerm = searchQuery.trim().toLowerCase();
    console.log('Searching for:', searchTerm);
    
    const filtered = colleges.filter(college => {
      // Safely get college name and city, defaulting to empty string if undefined
      const collegeName = String(college.collegeName || '').toLowerCase();
      const city = String(college.city || '').toLowerCase();
      
      // Log the values being compared
      console.log('Checking:', {
        id: college.id,
        name: collegeName,
        city: city,
        searchTerm: searchTerm
      });
      
      // Check if either name or city includes the search term
      const nameMatch = collegeName.includes(searchTerm);
      const cityMatch = city.includes(searchTerm);
      
      const matches = nameMatch || cityMatch;
      console.log(`College ${collegeName} - matches: ${matches} (name: ${nameMatch}, city: ${cityMatch})`);
      
      return matches;
    });
    
    console.log(`Found ${filtered.length} matching colleges`);
    setFilteredColleges(filtered);
  }, [searchQuery, colleges]);

  const renderCollegeCard = (college) => (
    <View key={college.id} style={styles.card}>
      <View style={styles.cardHeader}>
        {college.logoUrl ? (
          <Image source={{ uri: college.logoUrl }} style={styles.logo} />
        ) : (
          <View style={[styles.logo, styles.logoPlaceholder]}>
            <Text style={styles.logoText}>
              {college.collegeName.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
        <View style={styles.collegeInfo}>
          <Text style={styles.collegeName}>{college.collegeName}</Text>
          <Text style={styles.collegeLocation}>
            {[college.city, college.state, college.country].filter(Boolean).join(', ')}
          </Text>
        </View>
      </View>
      
      {college.description && (
        <Text style={styles.description} numberOfLines={3}>
          {college.description}
        </Text>
      )}
      
      <View style={styles.detailsContainer}>
        {college.establishedYear && (
          <View style={styles.detailItem}>
            <MaterialIcons name="calendar-today" size={16} color="#666" />
            <Text style={styles.detailText}>Est. {college.establishedYear}</Text>
          </View>
        )}
        
        {college.type && (
          <View style={styles.detailItem}>
            <MaterialIcons name="category" size={16} color="#666" />
            <Text style={styles.detailText}>
              {college.type.charAt(0).toUpperCase() + college.type.slice(1)}
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.contactContainer}>        
       <TouchableOpacity 
  style={[styles.contactButton, styles.viewDetailsButton]}
  onPress={() => navigation.navigate("College", { college })}
>
  <Text style={[styles.contactButtonText, { color: '#2563eb' }]}>View Details</Text>
</TouchableOpacity>

      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color="#666" style={styles.searchIcon} />
        <TextInput
          value={searchQuery}
          onChangeText={(text) => {
            console.log('Input changed to:', text);
            setSearchQuery(text);
          }}
          placeholder="Search by college name or city..."
          placeholderTextColor="#999"
          style={styles.searchInput}
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity 
            onPress={() => {
              console.log('Clearing search');
              setSearchQuery('');
            }}
            style={styles.clearButton}
          >
            <MaterialIcons name="close" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563eb" />
          <Text style={styles.loadingText}>Loading colleges...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <MaterialIcons name="error-outline" size={48} color="#dc2626" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : filteredColleges.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="search-off" size={48} color="#999" />
          <Text style={styles.emptyText}>No colleges found</Text>
          <Text style={styles.emptySubtext}>Try a different search term</Text>
        </View>
      ) : (
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {filteredColleges.map(renderCollegeCard)}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'relative',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 50,
    paddingLeft: 40,
    paddingRight: 40,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  clearButton: {
    position: 'absolute',
    right: 10,
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  logoPlaceholder: {
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6b7280',
  },
  collegeInfo: {
    flex: 1,
  },
  collegeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  collegeLocation: {
    fontSize: 14,
    color: '#6b7280',
  },
  description: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  detailText: {
    fontSize: 13,
    color: '#6b7280',
    marginLeft: 4,
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingTop: 12,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563eb',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  viewDetailsButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2563eb',
    marginLeft: 'auto',
  },
  contactButtonText: {
    color: '#fff',
    fontWeight: '500',
    marginLeft: 6,
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#6b7280',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: '#dc2626',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
});

export default SearchScreen;
