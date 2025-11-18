// firestoreService.js
import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import {
    addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc
} from 'firebase/firestore';
import { auth, db } from '../../Firebase'; // make sure you export both db and auth in firebase.js

//--------------------------------
// 🔹 Firestore Services
//--------------------------------

// ✅ Add data
export const addData = async (collectionName, data) => {
    try {
        const docRef = await addDoc(collection(db, collectionName), data);
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        throw e;
    }
};

// 🔹 Reset Password
// ✅ Send password reset email
export const resetPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return { success: true, message: 'Password reset email sent successfully!' };
    } catch (error) {
        console.error("Error sending password reset email: ", error);
        let errorMessage = 'Failed to send password reset email. Please try again.';
        
        if (error.code === 'auth/user-not-found') {
            errorMessage = 'No user found with this email address.';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'The email address is not valid.';
        } else if (error.code === 'auth/too-many-requests') {
            errorMessage = 'Too many requests. Please try again later.';
        }
        
        return { success: false, message: errorMessage };
    }
};

// ✅ Get all data
export const getAllData = async (collectionName) => {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return data;
    } catch (e) {
        console.error("Error getting documents: ", e);
        throw e;
    }
};

// ✅ Get single document
export const getDataById = async (collectionName, id) => {
    try {
        const docRef = doc(db, collectionName, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (e) {
        console.error("Error getting document: ", e);
        throw e;
    }
};

// ✅ Update document
export const updateData = async (collectionName, id, newData) => {
    try {
        const docRef = doc(db, collectionName, id);
        await updateDoc(docRef, newData);
        console.log("Document updated successfully");
        return { success: true };
    } catch (e) {
        console.error("Error updating document: ", e);
        throw e;
    }
};

// ✅ Delete document
export const deleteData = async (collectionName, id) => {
    try {
        await deleteDoc(doc(db, collectionName, id));
        console.log("Document deleted successfully");
        return { success: true };
    } catch (e) {
        console.error("Error deleting document: ", e);
        throw e;
    }
};

//--------------------------------
// 🔹 Firebase Auth Services
//--------------------------------

// ✅ Sign Up
export const handleSignUp = async (email, password, extraData = {}) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userData = {
            uid: user.uid,
            email: user.email,
            createdAt: new Date().toISOString(),
            ...extraData, // merge additional data (e.g. name, phone, etc.)
        };

        await setDoc(doc(db, "users", user.uid), userData);

        return userData;
    } catch (error) {
        console.error("Error signing up:", error.message);
        throw error;
    }
};

// ✅ Login
export const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error logging in:", error.message);
        throw error;
    }
};

// ✅ Forgot Password
export const forgotPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        console.log("Password reset email sent!");
    } catch (error) {
        console.error("Error sending reset email:", error.message);
        throw error;
    }
};

// ✅ Logout
export const logout = async () => {
    try {
        await signOut(auth);
        console.log("User logged out successfully");
    } catch (error) {
        console.error("Error logging out:", error.message);
        throw error;
    }
};

//--------------------------------
// 🔹 Cloudinary Upload Service
//--------------------------------

// ✅ Upload Image to Cloudinary
export const uploadImageToCloudinary = async (imageUri) => {
    const CLOUD_NAME = "dwvcbnb3f";
    const UPLOAD_PRESET = "react_native_uploads";

    try {
        console.log("Uploading image:", imageUri);

        let data = new FormData();
        data.append("file", {
            uri: imageUri,
            type: "image/jpeg",
            name: `upload_${new Date().getTime()}.jpg`,
        });
        data.append("upload_preset", UPLOAD_PRESET);

        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            {
                method: "POST",
                body: data,
            }
        );

        const result = await res.json();
        
        if (result.error) {
            console.error("Cloudinary error:", result.error);
            throw new Error(result.error.message);
        }

        console.log("Upload successful:", result.secure_url);
        return result.secure_url; // 🔥 Cloudinary hosted URL
    } catch (err) {
        console.error("Cloudinary upload failed:", err);
        throw err;
    }
};
