import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  updatePassword
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  onSnapshot, 
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to format Firebase Auth errors into friendly messages
  const formatAuthError = (error) => {
    const code = error?.code || '';
    switch (code) {
      case 'auth/invalid-credential':
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'Invalid email or password. Please check your credentials and try again.';
      case 'auth/email-already-in-use':
        return 'An account with this email address already exists.';
      case 'auth/weak-password':
        return 'Password must be at least 6 characters long.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      case 'auth/network-request-failed':
        return 'Network connection failed. Please check your internet connection.';
      default:
        return error?.message || 'Authentication error occurred.';
    }
  };

  // Helper to build cohesive user profile object with snake_case & camelCase fields
  const formatUserProfile = (uid, email, data = {}) => {
    const role = data.role || 'farmer';
    const fullName = data.full_name || data.displayName || 'Farmer';
    return {
      uid,
      id: uid, // for compatibility
      email: email || data.email || '',
      full_name: fullName,
      displayName: fullName,
      phone: data.phone || '',
      farm_name: data.farm_name || data.farmName || '',
      farmName: data.farm_name || data.farmName || '',
      village: data.village || '',
      district: data.district || '',
      state: data.state || '',
      rearing_capacity: data.rearing_capacity || data.rearingCapacity || '',
      preferred_language: data.preferred_language || data.preferredLanguage || 'en',
      preferredLanguage: data.preferred_language || data.preferredLanguage || 'en',
      role: role.toUpperCase(), // 'FARMER' or 'ADMIN'
      roleRaw: role,
      createdAt: data.createdAt || null,
      updatedAt: data.updatedAt || null
    };
  };

  useEffect(() => {
    let unsubscribeSnapshot = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);

      if (unsubscribeSnapshot) {
        unsubscribeSnapshot();
        unsubscribeSnapshot = null;
      }

      if (fbUser) {
        const userRef = doc(db, 'users', fbUser.uid);

        // Listen in real-time to the user's profile document in Firestore
        unsubscribeSnapshot = onSnapshot(userRef, async (docSnap) => {
          if (docSnap.exists()) {
            const profileData = docSnap.data();
            setUser(formatUserProfile(fbUser.uid, fbUser.email, profileData));
          } else {
            // Profile document does not exist yet; create default farmer profile
            const defaultProfile = {
              uid: fbUser.uid,
              email: fbUser.email || '',
              full_name: fbUser.displayName || 'Farmer',
              phone: '',
              farm_name: '',
              village: '',
              district: '',
              state: '',
              preferred_language: 'en',
              role: 'farmer',
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            };
            try {
              await setDoc(userRef, defaultProfile, { merge: true });
              setUser(formatUserProfile(fbUser.uid, fbUser.email, defaultProfile));
            } catch (err) {
              console.error('Error creating default Firestore user profile:', err);
              setUser(formatUserProfile(fbUser.uid, fbUser.email, defaultProfile));
            }
          }
          setLoading(false);
        }, (err) => {
          console.error('Firestore user profile listener error:', err);
          setUser(formatUserProfile(fbUser.uid, fbUser.email, {}));
          setLoading(false);
        });
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, []);

  // 1. Firebase Register
  const register = async (userData) => {
    try {
      const email = userData.email?.trim().toLowerCase();
      const password = userData.password;

      if (!email || !password) {
        return { success: false, message: 'Email and password are required' };
      }

      // Create user in Firebase Authentication
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = credential.user.uid;

      // Construct safe profile document with default role: 'farmer'
      const profileData = {
        uid: uid,
        email: email,
        full_name: (userData.full_name || '').trim() || 'Farmer',
        phone: (userData.phone || '').trim(),
        farm_name: (userData.farm_name || '').trim(),
        village: (userData.village || '').trim(),
        district: (userData.district || '').trim(),
        state: (userData.state || '').trim(),
        preferred_language: userData.preferred_language || 'en',
        role: 'farmer', // STRICT ROLE ENFORCEMENT
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      // Create document in Firestore users/{uid}
      await setDoc(doc(db, 'users', uid), profileData);

      const formattedUser = formatUserProfile(uid, email, profileData);
      setUser(formattedUser);

      return { success: true, user: formattedUser };
    } catch (err) {
      console.error('Firebase Registration Error:', err);
      return { success: false, message: formatAuthError(err) };
    }
  };

  // 2. Firebase Login
  const login = async ({ email, password }) => {
    try {
      const cleanEmail = email?.trim().toLowerCase();
      const credential = await signInWithEmailAndPassword(auth, cleanEmail, password);
      const uid = credential.user.uid;

      // Retrieve user profile document from Firestore
      const docSnap = await getDoc(doc(db, 'users', uid));
      let profileData = {};
      if (docSnap.exists()) {
        profileData = docSnap.data();
      }

      const formattedUser = formatUserProfile(uid, credential.user.email, profileData);
      setUser(formattedUser);

      return { success: true, user: formattedUser };
    } catch (err) {
      console.error('Firebase Login Error:', err);
      return { success: false, message: formatAuthError(err) };
    }
  };

  // 3. Profile Update
  const updateProfile = async (formData) => {
    if (!firebaseUser) {
      return { success: false, message: 'No authenticated user found' };
    }

    try {
      const uid = firebaseUser.uid;
      const userRef = doc(db, 'users', uid);

      // Build safe update object — NEVER allow changing uid or role
      const updateData = {
        full_name: (formData.full_name || '').trim(),
        phone: (formData.phone || '').trim(),
        farm_name: (formData.farm_name || '').trim(),
        village: (formData.village || '').trim(),
        district: (formData.district || '').trim(),
        state: (formData.state || '').trim(),
        preferred_language: formData.preferred_language || 'en',
        updatedAt: serverTimestamp()
      };

      await updateDoc(userRef, updateData);

      // Update password if provided
      if (formData.password && formData.password.trim() !== '') {
        await updatePassword(firebaseUser, formData.password.trim());
      }

      const updatedSnap = await getDoc(userRef);
      const updatedUser = formatUserProfile(uid, firebaseUser.email, updatedSnap.data());
      setUser(updatedUser);

      return { success: true, user: updatedUser };
    } catch (err) {
      console.error('Firebase Profile Update Error:', err);
      return { success: false, message: formatAuthError(err) };
    }
  };

  // 4. Firebase Logout
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setFirebaseUser(null);
    } catch (err) {
      console.error('Firebase Logout Error:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      firebaseUser,
      loading, 
      isAuthenticated: !!user,
      login, 
      register, 
      updateProfile, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);