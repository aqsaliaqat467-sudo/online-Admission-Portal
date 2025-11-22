import Fontisto from '@expo/vector-icons/Fontisto';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { handleSignUp } from '../Helper/FirebaseHelper';
import { setRole, setUser } from '../redux/Slices/HomeDataSlice';

const Signup = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  
  // Address fields
  const [streetAddress, setStreetAddress] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState(false);

  const dispatch = useDispatch();

  const goToRegister = async () => {
    if (password !== confirmpassword) {
      alert("Passwords do not match");
      return;
    }
    
    // Validate city
    if (city.trim().toLowerCase() !== "sargodha") {
      setCityError(true);
      alert("Please enter 'Sargodha' as the city");
      return;
    }
    
    if (!streetAddress || !state || !country) {
      alert("Please fill in all required address fields");
      return;
    }
    
    setCityError(false);

    const user = await handleSignUp(
      email,
      password,
      { 
        role: "Student", 
        name, 
        email, 
        mobile,
        address: {
          street: streetAddress,
          city: city,
          state: state,
          country: country
        }
      }
    );

    if (user?.uid) {
      dispatch(setRole("Student"));
      dispatch(setUser(user));
      // navigation.navigate("Login");
    } else {
      alert("Error in sign up");
    }
  };

  return (
    <View style={{ backgroundColor: "#ffffffff", width: '100%', height: '100%' }}>
      <View style={{ width: '10%', height: 40, backgroundColor: "#ffffffff", borderColor: "#003366", borderWidth: 3, borderRadius: 12, alignSelf: "flex-end", marginTop: 15, marginRight: 20 }} >
        <Text style={{ fontSize: 25, fontWeight: "bold", color: "#003366", textAlign: "center" }}>A</Text>
      </View>
      <ScrollView 
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
        style={{ width: "100%", height: "90%", backgroundColor: "#ffff" }}
      >
        <View style={{ backgroundColor: "#ffffffff", marginTop: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 25, textAlign: 'center' }}>Create your account</Text>
        </View>
        <Text style={{ marginStart: 40, marginTop: 10 }}>Name</Text>
        <TextInput
          onChangeText={(text) => setName(text)}
          placeholder="ex: jon smith"
          placeholderTextColor="#c2c2c2ff"
          style={{ backgroundColor: "#F4F4F4", borderRadius: 10, width: '80%', height: 40, justifyContent: "center", marginStart: 40, marginTop: 5 }}>
        </TextInput>
        <Text style={{ marginStart: 40, marginTop: 5 }}>Email</Text>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          placeholder="ex: jon.smith@email.com"
          placeholderTextColor="#c2c2c2ff"
          style={{ backgroundColor: "#F4F4F4", borderRadius: 10, width: '80%', height: 40, justifyContent: "center", marginStart: 40, marginTop: 5 }}>
        </TextInput>
        <Text style={{ marginStart: 40, marginTop: 5 }}>Mobile</Text>
        <TextInput
          onChangeText={(text) => setMobile(text)}
          placeholder="03xx-xxxxxxx"
          placeholderTextColor="#c2c2c2ff"
          style={{ backgroundColor: "#F4F4F4", borderRadius: 5, width: '80%', height: 40, justifyContent: "center", marginStart: 40, marginTop: 5 }}>
        </TextInput>
        <Text style={{ marginStart: 40, marginTop: 5 }}>Password</Text>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          placeholder="********"
          placeholderTextColor="#c2c2c2ff"
          style={{ backgroundColor: "#F4F4F4", borderRadius: 5, width: '80%', height: 40, justifyContent: "center", marginStart: 40, marginTop: 5 }}>
        </TextInput>
        <Text style={{ marginStart: 40, marginTop: 5 }}>Confirm password</Text>
        <TextInput
          onChangeText={(text) => setConfirmpassword(text)}
          placeholder="********"
          secureTextEntry
          placeholderTextColor="#c2c2c2ff"
          style={{ backgroundColor: "#F4F4F4", borderRadius: 10, width: '80%', height: 40, justifyContent: "center", marginStart: 40, marginTop: 5, paddingHorizontal: 10 }}>
        </TextInput>
        
        {/* Address Section */}    
        <Text style={{ marginStart: 40, marginTop: 10 }}>Street Address</Text>
        <TextInput
          value={streetAddress}
          onChangeText={setStreetAddress}
          placeholder="House no, Street name"
          placeholderTextColor="#c2c2c2ff"
          style={{ backgroundColor: "#F4F4F4", borderRadius: 10, width: '80%', height: 40, justifyContent: "center", marginStart: 40, marginTop: 5, paddingHorizontal: 10 }}
        />
        
        <View style={{ flexDirection: 'row', width: '80%', marginStart: 40, justifyContent: 'space-between' }}>
          <View style={{ width: '48%' }}>
            <Text style={{ marginTop: 10 }}>City</Text>
            <TextInput
              value={city}
              onChangeText={(text) => {
                setCity(text);
                if (text.trim().toLowerCase() === "sargodha") {
                  setCityError(false);
                } else {
                  setCityError(true);
                }
              }}
              placeholder="City"
          placeholderTextColor="#c2c2c2ff"
              style={[
                { 
                  backgroundColor: "#F4F4F4", 
                  borderRadius: 10, 
                  height: 40, 
                  marginTop: 5, 
                  paddingHorizontal: 10, 
                  color: '#666',
                  borderWidth: 1,
                  borderColor: cityError ? 'red' : '#F4F4F4'
                }
              ]}
            />
            {cityError && (
              <Text style={{ color: 'red', fontSize: 10, marginTop: 2 }}>
                Only 'Sargodha' is allowed
              </Text>
            )}
          </View>
          <View style={{ width: '48%' }}>
            <Text style={{ marginTop: 10 }}>State/Province</Text>
            <TextInput
              value={state}
              onChangeText={setState}
              placeholder="State/Province"
              placeholderTextColor="#c2c2c2ff"
              style={{ backgroundColor: "#F4F4F4", borderRadius: 10, height: 40, marginTop: 5, paddingHorizontal: 10 }}
            />
          </View>
        </View>
        
        <Text style={{ marginStart: 40, marginTop: 10 }}>Country</Text>
        <TextInput
          value={country}
          onChangeText={setCountry}
          placeholder="Country"
          placeholderTextColor="#c2c2c2ff"
          style={{ backgroundColor: "#F4F4F4", borderRadius: 10, width: '80%', height: 40, justifyContent: "center", marginStart: 40, marginTop: 5, paddingHorizontal: 10, marginBottom: 10 }}
        />
        <TouchableOpacity style={{ marginTop: 5, flexDirection: "row", marginStart: 40 }}>
          <Fontisto name="checkbox-passive" size={15} color="#3b3b3bff" />
          <Text style={{ color: "#3b3b3bff", fontWeight: "300", fontSize: 10, textAlign: "right", marginRight: 35 }}>   I understood the terms & policy.</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToRegister}
          style={{ backgroundColor: "#002D62", borderRadius: 8, alignSelf: "center", width: '80%', height: 45, justifyContent: "center", marginTop: 15 }}>
          <Text 
            style={{ color: "#fff", fontWeight: "600", fontSize: 16, textAlign: "center" }}>SIGN UP</Text>
        </TouchableOpacity>
        <Text style={{ textAlign: "center", fontWeight: "200", marginTop: 5 }}>or sign up with</Text>
        <TouchableOpacity style={{ backgroundColor: "#F4F4F4", width: "13%", height: "6%", alignSelf: "center", marginTop: 10 }}>
          <Text style={{ textAlign: "center" }}>🔵🟢🟡🔴</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={{ color: "#3b3b3bff", fontWeight: "300", fontSize: 11, textAlign: "center", marginTop: 10 }}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: "#003366", fontWeight: "800", fontSize: 11, marginTop: 10 }}>Signin</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Signup;
