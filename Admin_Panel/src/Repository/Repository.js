/** @format */

import axios from "axios";
import { Store } from "react-notifications-component";

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
    const res = await axios.get(`${process.env.React_App_Baseurl}${url}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    
    setResponse(res?.data);
    additionalFunctions.forEach((func) => {
      if (typeof func === "function") {
        func();
      }
    });
  } catch (e) {
    console.log(url, e);
    setResponse({});
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
    const res = await axios.post(
      `${process.env.React_App_Baseurl}${url}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (res) {
      const data = res?.data;
      if (successMsg) {
        showNotification({ message: successMsg });
      }
      additionalFunctions.forEach((func) => {
        if (typeof func === "function") {
          func(data);
        }
      });
    }
  } catch (e) {
    const msg = e?.response?.data?.message || "Something went wrong";
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
    const res = await axios.delete(`${process.env.React_App_Baseurl}${url}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (res) {
      if (successMsg) {
        showNotification({ message: successMsg });
      }
      additionalFunctions.forEach((func) => {
        if (typeof func === "function") {
          func();
        }
      });
    }
  } catch (e) {
    const msg = e?.response?.data?.message || "Something went wrong";
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
    const res = await axios.put(
      `${process.env.React_App_Baseurl}${url}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (res) {
      const msg = res?.data?.message;
      if (successMsg || msg) {
        showNotification({ message: successMsg || msg });
      }
      additionalFunctions.forEach((func) => {
        if (typeof func === "function") {
          func();
        }
      });
    }
  } catch (e) {
    const msg = e?.response?.data?.message || "Something went wrong";
    showNotification({ message: msg, type: "danger" });
  } finally {
    if (setLoading) {
      setLoading(false);
    }
  }
};


