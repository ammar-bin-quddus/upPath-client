import { createContext, useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, provider } from "../firebase/firebase.config";
import UseAxiosPublic from "../hooks/useAxiosPublic";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const axiosPublic = UseAxiosPublic();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  console.log(user);

  const handleRegister = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const handleLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const handleLogOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUser = (userData) => {
    return updateProfile(auth.currentUser, userData);
  };

  useEffect(() => {
    // Watch for changes to the Firebase auth state
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          // Request a JWT from the server using the user's email
          const res = await axiosPublic.post("/auth/jwt", {
            email: currentUser.email,
          });

          // Save token locally and update state
          if (res.data?.token) {
            localStorage.setItem("token", res.data.token);
            setToken(res.data.token);
          }
        } catch (err) {
          console.error("Failed to get JWT token:", err.message);
          setToken(null);
        }
      } else {
        // User is signed out — clean up
        localStorage.removeItem("token");
        setToken(null);
      }

      // Done loading either way
      setLoading(false);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  //console.log(loading)
  const authInfo = {
    handleRegister,
    handleLogin,
    handleLogOut,
    user,
    setUser,
    loading,
    handleGoogleLogin,
    setLoading,
    updateUser,
    token,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
