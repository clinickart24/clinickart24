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
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);

        if (session?.user) {
          await fetchUserProfile(session.user.id);
        } else {
          setUserProfile(null);
          setLoading(false);
        }

        if (event === 'SIGNED_OUT') {
          console.log('Vendor signed out');
          navigate('/');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchUserProfile = async (userId) => {
    try {
      // First get user data
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (userError) {
        console.error('Error fetching user profile:', userError);
        // If user doesn't exist in users table, create it
        if (userError.code === 'PGRST116') {
          await createMissingUserProfile(userId);
          return;
        }
        setLoading(false);
        return;
      }

      // Then get vendor data if user exists
      const { data: vendorData, error: vendorError } = await supabase
        .from('vendors')
        .select('*')
        .eq('user_id', userId)
        .single();

      // Don't treat vendor not found as an error - user might not be a vendor
      let profileWithVendorId = {
        ...userData,
        vendor_id: null,
        vendor_info: null
      };

      if (!vendorError && vendorData) {
        profileWithVendorId = {
          ...userData,
          vendor_id: vendorData.id,
          vendor_info: vendorData
        };
      }

      console.log('User profile loaded:', profileWithVendorId);
      setUserProfile(profileWithVendorId);
      setLoading(false);

      // Only navigate to dashboard if we're on the home page or login page
      const currentPath = window.location.pathname;
      if ((profileWithVendorId.role === 'vendor' || profileWithVendorId.role === 'admin') &&
          (currentPath === '/' || currentPath === '/login' || currentPath === '/sign-up')) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setLoading(false);
    }
  };

  const createMissingUserProfile = async (userId) => {
    try {
      // Get user data from auth
      const { data: authUser } = await supabase.auth.getUser();
      if (!authUser.user) return;

      // Create user record
      const { error: userError } = await supabase
        .from('users')
        .insert({
          id: userId,
          email: authUser.user.email,
          role: 'vendor',
          first_name: authUser.user.user_metadata?.first_name || '',
          last_name: authUser.user.user_metadata?.last_name || '',
          phone: authUser.user.user_metadata?.phone || '',
          is_active: true
        });

      if (userError) {
        console.error('Error creating user profile:', userError);
        return;
      }

      // Create vendor profile
      const { error: vendorError } = await supabase
        .from('vendors')
        .insert({
          user_id: userId,
          business_name: `${authUser.user.user_metadata?.first_name || 'Vendor'} Business`,
          business_type: 'healthcare',
          verification_status: 'pending',
          commission_rate: 10.0
        });

      if (vendorError) {
        console.error('Error creating vendor profile:', vendorError);
      }

      // Fetch the newly created profile
      await fetchUserProfile(userId);
    } catch (error) {
      console.error('Error creating missing user profile:', error);
      setLoading(false);
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

        if (profile.error) {
          // If user doesn't exist in users table, create it and allow access
          console.log('User profile not found, creating...');
          await createMissingUserProfile(data.user.id);
          navigate("/dashboard");
        } else if (profile.data?.role === 'vendor' || profile.data?.role === 'admin') {
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
