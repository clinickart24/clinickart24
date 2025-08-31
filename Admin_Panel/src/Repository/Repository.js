/** @format */

import { Store } from "react-notifications-component";
import {
  usersService,
  vendorsService,
  productsService,
  ordersService,
  categoriesService,
  analyticsService,
  authService
} from "../services/supabase";

export const showNotification = ({ message, type = "success" }) => {
  Store.addNotification({
    title: "",
    message,
    type,
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 3000,
      onScreen: true,
    },
  });
};

// Updated API functions using Supabase
export const getApi = async ({
  url,
  setResponse,
  setLoading,
  additionalFunctions = [],
}) => {
  if (setLoading) {
    setLoading(true);
  }

  try {
    let data = {};

    // Route to appropriate service based on URL
    if (url.includes('getAllUser')) {
      const params = new URLSearchParams(url.split('?')[1]);
      const page = parseInt(params.get('page')) || 1;
      const limit = parseInt(params.get('limit')) || 10;
      const search = params.get('search') || '';
      data = await usersService.getAll(page, limit, search);
    }
    else if (url.includes('getAllVendor')) {
      const params = new URLSearchParams(url.split('?')[1]);
      const page = parseInt(params.get('page')) || 1;
      const limit = parseInt(params.get('limit')) || 10;
      const search = params.get('search') || '';
      data = await vendorsService.getAll(page, limit, search);
    }
    else if (url.includes('getVenderProfile')) {
      const vendorId = url.split('/').pop();
      data = await vendorsService.getById(vendorId);
    }
    else if (url.includes('getVendorAllProduct')) {
      const vendorId = url.split('/').pop();
      data = await vendorsService.getVendorProducts(vendorId);
    }
    else if (url.includes('Product') && !url.includes('delete')) {
      const params = new URLSearchParams(url.split('?')[1]);
      const page = parseInt(params.get('page')) || 1;
      const limit = parseInt(params.get('limit')) || 10;
      const search = params.get('search') || '';
      data = await productsService.getAll(page, limit, search);
    }
    else if (url.includes('faq/All')) {
      // For now, return empty array for FAQ
      data = { data: [] };
    }
    else if (url.includes('area/getAreasAll')) {
      // For now, return empty array for areas
      data = { data: [] };
    }
    else if (url.includes('dashboard') || url === '') {
      data = await analyticsService.getDashboardStats();
    }
    else {
      // Default fallback
      data = { data: [] };
    }

    setResponse(data);
    additionalFunctions.forEach((func) => {
      if (typeof func === "function") {
        func();
      }
    });
  } catch (e) {
    console.error('API Error:', url, e);
    showNotification({
      message: e.message || "Something went wrong",
      type: "danger"
    });
    setResponse({ data: [] });
  } finally {
    if (setLoading) {
      setLoading(false);
    }
  }
};

export const createApi = async ({
  url,
  payload,
  successMsg,
  setLoading,
  additionalFunctions = [],
}) => {
  if (setLoading) {
    setLoading(true);
  }

  try {
    let data = {};

    // Route to appropriate service based on URL
    if (url.includes('Product') && !url.includes('delete')) {
      data = await productsService.create(payload);
    }
    else if (url.includes('vendor')) {
      // Handle vendor creation/updates
      data = await vendorsService.create(payload);
    }
    else if (url.includes('category')) {
      data = await categoriesService.create(payload);
    }
    else if (url.includes('faq')) {
      // For now, return success for FAQ
      data = { success: true };
    }
    else if (url.includes('area')) {
      // For now, return success for areas
      data = { success: true };
    }
    else {
      // Default fallback
      data = { success: true };
    }

    if (successMsg) {
      showNotification({ message: successMsg });
    }

    additionalFunctions.forEach((func) => {
      if (typeof func === "function") {
        func(data);
      }
    });
  } catch (e) {
    console.error('Create API Error:', url, e);
    const msg = e?.message || "Something went wrong";
    showNotification({ message: msg, type: "danger" });
  } finally {
    if (setLoading) {
      setLoading(false);
    }
  }
};

export const removeApi = async ({
  url,
  successMsg,
  payload,
  setLoading,
  additionalFunctions = [],
}) => {
  if (setLoading) {
    setLoading(true);
  }

  try {
    // Route to appropriate service based on URL
    if (url.includes('Product/delete')) {
      const productId = url.split('/').pop();
      await productsService.delete(productId);
    }
    else if (url.includes('vendor') && url.includes('delete')) {
      const vendorId = url.split('/').pop();
      await vendorsService.delete(vendorId);
    }
    else if (url.includes('category') && url.includes('delete')) {
      const categoryId = url.split('/').pop();
      await categoriesService.delete(categoryId);
    }
    else if (url.includes('faq')) {
      // For now, return success for FAQ
      console.log('FAQ delete:', url);
    }
    else if (url.includes('user') && url.includes('delete')) {
      const userId = url.split('/').pop();
      await usersService.delete(userId);
    }

    if (successMsg) {
      showNotification({ message: successMsg });
    }

    additionalFunctions.forEach((func) => {
      if (typeof func === "function") {
        func();
      }
    });
  } catch (e) {
    console.error('Remove API Error:', url, e);
    const msg = e?.message || "Something went wrong";
    showNotification({ message: msg, type: "danger" });
  } finally {
    if (setLoading) {
      setLoading(false);
    }
  }
};

export const updateApi = async ({
  url,
  payload,
  successMsg,
  setLoading,
  additionalFunctions = [],
}) => {
  if (setLoading) {
    setLoading(true);
  }

  try {
    let data = {};

    // Route to appropriate service based on URL
    if (url.includes('Product') && url.includes('update')) {
      const productId = url.split('/').pop();
      data = await productsService.update(productId, payload);
    }
    else if (url.includes('vendor') && url.includes('update')) {
      const vendorId = url.split('/').pop();
      data = await vendorsService.updateStatus(vendorId, payload.status);
    }
    else if (url.includes('category') && url.includes('update')) {
      const categoryId = url.split('/').pop();
      data = await categoriesService.update(categoryId, payload);
    }
    else if (url.includes('user') && url.includes('update')) {
      const userId = url.split('/').pop();
      data = await usersService.update(userId, payload);
    }
    else if (url.includes('order') && url.includes('status')) {
      const orderId = url.split('/').pop();
      data = await ordersService.updateStatus(orderId, payload.status, payload.tracking_info);
    }
    else {
      // Default fallback
      data = { success: true };
    }

    const msg = data?.message || successMsg;
    if (msg) {
      showNotification({ message: msg });
    }

    additionalFunctions.forEach((func) => {
      if (typeof func === "function") {
        func(data);
      }
    });
  } catch (e) {
    console.error('Update API Error:', url, e);
    const msg = e?.message || "Something went wrong";
    showNotification({ message: msg, type: "danger" });
  } finally {
    if (setLoading) {
      setLoading(false);
    }
  }
};

// Authentication helper
export const loginApi = async (credentials) => {
  try {
    const data = await authService.signIn(credentials.email, credentials.password);
    showNotification({ message: "Login successful!" });
    return data;
  } catch (error) {
    showNotification({ message: error.message, type: "danger" });
    throw error;
  }
};

// Logout helper
export const logoutApi = async () => {
  try {
    await authService.signOut();
    showNotification({ message: "Logged out successfully!" });
  } catch (error) {
    console.error('Logout error:', error);
  }
};


