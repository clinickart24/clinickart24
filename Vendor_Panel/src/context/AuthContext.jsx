import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { supabase } from "../services/supabase";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);

        if (session?.user) {
          await fetchUserProfile(session.user.id);
        } else {
          setUserProfile(null);
        }

        setLoading(false);

        if (event === 'SIGNED_IN') {
          console.log('Vendor signed in:', session?.user);
          // Check if user is vendor or admin
          if (userProfile?.role === 'vendor' || userProfile?.role === 'admin') {
            navigate('/dashboard');
          }
        } else if (event === 'SIGNED_OUT') {
          console.log('Vendor signed out');
          navigate('/');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate, userProfile?.role]);

  const fetchUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*, vendors(*)')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setUserProfile(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        setUser(data.user);
        await fetchUserProfile(data.user.id);

        // Check if user is vendor or admin
        const profile = await supabase
          .from('users')
          .select('role')
          .eq('id', data.user.id)
          .single();

        if (profile.data?.role === 'vendor' || profile.data?.role === 'admin') {
          navigate("/dashboard");
        } else {
          throw new Error('Access denied. Vendor account required.');
        }
      }

      return data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (credentials) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          data: {
            first_name: credentials.firstName,
            last_name: credentials.lastName,
            role: 'vendor' // Default to vendor for vendor panel
          }
        }
      });

      if (error) {
        throw error;
      }

      // Create vendor profile after signup
      if (data.user) {
        await supabase
          .from('vendors')
          .insert({
            user_id: data.user.id,
            business_name: credentials.businessName || `${credentials.firstName} ${credentials.lastName}`,
            verification_status: 'pending'
          });
      }

      return data;
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      setUser(null);
      setUserProfile(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = !!user;
  const isVendor = userProfile?.role === 'vendor' || userProfile?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        login,
        signup,
        logout,
        loading,
        isAuthenticated,
        isVendor
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
