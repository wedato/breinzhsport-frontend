import React, { createContext, useState, useEffect } from "react";
import { Auth } from "aws-amplify";

export const AuthContext = createContext();

export const AuthProvider = ({ children, value }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    value?.isAuthenticated || false
  );
  const [user, setUser] = useState(value?.user || null);
  const [loading, setLoading] = useState(true);

  const checkAuthState = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setIsAuthenticated(true);
      setUser(user);
      return user;
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthState();
  }, []);

  useEffect(() => {
    if (value) {
      setIsAuthenticated(value.isAuthenticated);
      setUser(value.user);
      setLoading(false);
    }
  }, [value]);

  const signIn = async (email, password) => {
    try {
      const user = await Auth.signIn(email, password);
      setIsAuthenticated(true);
      setUser(user);
      return user;
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      throw error;
    }
  };

  const signUp = async (email, password, attributes) => {
    try {
      const result = await Auth.signUp({
        username: email,
        password,
        attributes,
      });
      return result;
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      throw error;
    }
  };

  const confirmSignUp = async (email, code) => {
    try {
      return await Auth.confirmSignUp(email, code);
    } catch (error) {
      console.error("Erreur lors de la confirmation de l'inscription:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        checkAuthState,
        signIn,
        signUp,
        confirmSignUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
