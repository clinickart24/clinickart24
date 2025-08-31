/** @format */

import { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Modal, Row, Col } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import { createApi, getApi, removeApi, updateApi } from "../../Repository/Repository";
import { IoCloseSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { Store } from "react-notifications-component";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";



const showNotification = ({ message, type = "success" }) => {
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

const CreateBanner = ({ show, handleClose, edit, id, fetchApi, data }) => {
  const [type, setType] = useState(data?.type || '');
  const [desc, setDesc] = useState(data?.desc || '');
  const [media, setMedia] = useState(data?.image || data?.bannerVideo || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (edit && data) {
      setType(data?.type || "");
      setDesc(data?.desc || "");
      setMedia(data.image || data.bannerVideo || "");
    } else {
      setType("");
      setDesc("");
      setMedia("");
    }
  }, [edit, data]);

  const resetForm = () => {
    setType("");
    setDesc("");
    setMedia("");
  };

  const additionalFunctions = [handleClose, fetchApi];


  const createHandler = (e) => {
    e.preventDefault();
    const fd = new FormData();

    fd.append("type", type);
    fd.append("desc", desc);


    // Determine if media is an image or video and set the appropriate API endpoint
    const isImage = media.type && media.type.startsWith('image/');
    const isVideo = media.type && media.type.startsWith('video/');
    const apiUrl = isImage
      ? "api/v1/Banner/addBanner"
      : isVideo
        ? "admin/addNewVideoToBanner"
        : null;

    if (!apiUrl) {
      showNotification({ message: "Unsupported media format. Only images or videos are allowed.", type: "danger" });
      return;
    }

    if (isImage && media.size > 1048576) {
      showNotification({ message: "File size should be less than 1 MB.", type: "danger" });
      handleClose();
      return;
    }

    // Append media with appropriate key
    fd.append(isImage ? "image" : "video", media);

    createApi({
      url: apiUrl,
      payload: fd,
      setLoading,
      successMsg: "Created",
      additionalFunctions,
    });

    resetForm();
  };

  const updateHandler = (e) => {
    e.preventDefault();
    const fd = new FormData();

    // Append type and description only if they have changed
    if (type !== data?.type) fd.append("type", type);
    if (desc !== data?.desc) fd.append("desc", desc);

    // Check if the media is a File and validate its type and size
    const isImage = media instanceof File && media.type.startsWith('image/');
    const isVideo = media instanceof File && media.type.startsWith('video/');

    // Check for media size
    if (isImage && media.size > 1048576) {
      showNotification({ message: "File size should be less than 1 MB.", type: "danger" });
      handleClose();
      return;
    }

    let apiUrl;
    if (isImage) {
      fd.append("image", media);
      apiUrl = `api/v1/Banner/updateBanner/${id}`;
    } else if (isVideo) {
      fd.append("video", media);
      apiUrl = `admin/updateBannerVideo/${id}`;
    } else if (media && media !== data?.image) {
      showNotification({ message: "Unsupported media format. Only images or videos are allowed.", type: "danger" });
      return;
    }

    // Execute the API call with the determined URL
    updateApi({
      url: apiUrl, // Use the determined URL here
      payload: fd,
      setLoading,
      successMsg: "Updated",
      additionalFunctions,
    });

    resetForm();
  };


  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {edit ? "Edit Banner" : "Add Banner"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={edit ? updateHandler : createHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Media</Form.Label>
            <Form.Control
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setMedia(e.target.files[0])}
            />
            {media && (
              // Check if media is a File or a URL
              (media instanceof File || typeof media === "string") && (
                // For File instance, we check its type
                media instanceof File ? (
                  media.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(media)}
                      alt="Selected"
                      style={{ width: "100%", height: "300px", marginTop: "10px" }}
                    />
                  ) : media.type.startsWith("video/") ? (
                    <video
                      src={URL.createObjectURL(media)}
                      controls
                      style={{ width: "100%", height: "300px", marginTop: "10px" }}
                    />
                  ) : null
                ) : (
                  media.endsWith('.mp4') ? (
                    <video
                      src={media}
                      controls
                      style={{ width: "100%", height: "300px", marginTop: "10px" }}
                    />
                  ) :
                    <img
                      src={media}
                      alt="Selected"
                      style={{ width: "100%", height: "300px", marginTop: "10px" }}
                    />
                )
              )
            )}


          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Select
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select your preference</option>
              <option value="Top">Top</option>
              <option value="Bottom">Bottom</option>
              {/* <option value="LOGIN">Login</option>
              <option value="BACKGROUNDIMAGE">Background Image</option> */}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </Form.Group>
          <button className="submitBtn" type="submit" disabled={loading}>
            {loading ? <ClipLoader color="#fff" /> : "Submit"}
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};


const CreateType = ({ show, handleClose, edit, id, fetchApi, data }) => {
  const [type, setType] = useState(data?.gender || '');
  const [desc, setDesc] = useState(data?.desc || '');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (edit && data) {
      setType(data?.gender || "");
      setDesc(data?.desc || "");
    } else {
      setType("");
      setDesc("");
    }
  }, [edit, data]);


  const resetForm = () => {
    setType("");
    setDesc("");
  };



  const fd = {
    gender: type,
    desc: desc
  }
  const additionalFunctions = [handleClose, fetchApi];

  const createHandler = (e) => {
    e.preventDefault();
    createApi({
      url: "api/v1/admin/createGender",
      payload: fd,
      setLoading,
      successMsg: "Created",
      additionalFunctions,
    });
    resetForm();
  };


  const updateHandler = (e) => {
    e.preventDefault();
    const fd = {
      gender: type,
      desc: desc
    }

    updateApi({
      url: `api/v1/admin/updateGender/${id}`,
      payload: fd,
      setLoading,
      successMsg: "Updated",
      additionalFunctions,
    });
    resetForm();
  };



  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {edit ? "Edit Type" : "Add Type"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={edit ? updateHandler : createHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Control
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </Form.Group>
          <button className="submitBtn" type="submit" disabled={loading}>
            {loading ? <ClipLoader color="#fff" /> : "Submit"}
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
const CreateSubType = ({ show, handleClose, edit, id, fetchApi, data }) => {
  const [type, setType] = useState(data?.type || '');
  const [desc, setDesc] = useState(data?.desc || '');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (edit && data) {
      setType(data?.type || "");
      setDesc(data?.desc || "");
    } else {
      setType("");
      setDesc("");
    }
  }, [edit, data]);


  const resetForm = () => {
    setType("");
    setDesc("");
  };



  const fd = {
    type: type,
    desc: desc
  }
  const additionalFunctions = [handleClose, fetchApi];

  const createHandler = (e) => {
    e.preventDefault();
    createApi({
      url: "createSubCategoryType",
      payload: fd,
      setLoading,
      successMsg: "Created",
      additionalFunctions,
    });
    resetForm();
  };


  const updateHandler = (e) => {
    e.preventDefault();
    const fd = {
      type: type,
      desc: desc
    }

    updateApi({
      url: `updateSubCategoryType/${id}`,
      payload: fd,
      setLoading,
      successMsg: "Updated",
      additionalFunctions,
    });
    resetForm();
  };



  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {edit ? "Edit Type" : "Add Type"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={edit ? updateHandler : createHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Control
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </Form.Group>
          <button className="submitBtn" type="submit" disabled={loading}>
            {loading ? <ClipLoader color="#fff" /> : "Submit"}
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const CreateCategory = ({ show, handleClose, edit, id, fetchApi, data }) => {
  const [name, setName] = useState(data?.name || '');
  // const [type, setType] = useState(data?.gender || '');
  const [image, setImage] = useState(null); // Changed initial value to null
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  // Add useEffect to update state when `data` prop changes
  useEffect(() => {
    if (edit && data) {
      setName(data.name || "");
      // setType(data.gender || "");
      setImage(data.image || "");
    } else {
      resetForm();
    }
  }, [edit, data]);

  const resetForm = () => {
    setName("");
    // setType("");
    setImage(null); // Reset to null// Clear error
  };

  const createHandler = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", name);
    // fd.append("gender", type);

    if (image) {
      if (image.size > 1048576) {
        showNotification({ message: "File size should be less than 1 MB.", type: "danger" });
        return; // Prevent form submission
      }
      fd.append("image", image);
    }

    createApi({
      url: "api/v1/Category/addCategory",
      payload: fd,
      setLoading,
      successMsg: "Created",
      additionalFunctions: [handleClose, fetchApi],
    });
    resetForm();
  };

  const updateHandler = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", name);
    // fd.append("gender", type);

    if (image) {
      if (image.size > 1048576) {
        showNotification({ message: "File size should be less than 1 MB.", type: "danger" });
        return; // Prevent form submission
      }
      fd.append("image", image);
    }

    updateApi({
      url: `api/v1/Category/updateCategory/${id}`,
      payload: fd,
      setLoading,
      successMsg: "Updated",
      additionalFunctions: [handleClose, fetchApi],
    });
    resetForm();
  };

  const fetchHandler = () => {
    getApi({
      url: "api/v1/admin/getAllGenders",
      setLoading,
      setResponse: setResponse,
    });
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {edit ? "Edit Category" : " Add Category"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={edit ? updateHandler : createHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
            {image && (
              <img
                src={image instanceof File ? URL.createObjectURL(image) : image}
                alt="Selected"
                style={{ width: "100%", height: '', marginTop: "10px" }}
              />
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          {/* <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Select
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option>Select Type</option>
              {response?.data?.length ? response.data.map(type => (
                <option key={type?._id} value={type?.gender}>{type?.gender}</option>
              )) : <option disabled>No types available</option>}
            </Form.Select>
          </Form.Group> */}

          <button className="submitBtn" type="submit">
            {loading ? <ClipLoader color="#fff" /> : "Submit"}
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};


const EditVendorStatus = ({ show, handleClose, id, fetchApi }) => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);


  const data = {
    kycStatus: status,
  }

  const additionalFunctions = [handleClose, fetchApi];


  const updateHandler = (e) => {
    e.preventDefault();
    updateApi({
      url: `api/v1/kyc/vendorKycVerification/${id}`,
      payload: data,
      setLoading,
      successMsg: "Updated",
      additionalFunctions,
    });
  };
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Change Vendor Acceptance Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={updateHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value=''>Select your preference</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECT">Reject</option>
            </Form.Select>
          </Form.Group>
          <button className="submitBtn" type="submit" disabled={loading}>
            {loading ? <ClipLoader color="#fff" /> : "Submit"}
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};


const CreateSubCategory = ({ show, handleClose, edit, id, fetchApi, data }) => {
  const [name, setName] = useState(data?.name || '');
  const [image, setImage] = useState(data?.image || '');
  const [categoryid, setCategoryId] = useState(data?.categoryId._id || '');
  // const [type, setType] = useState(data?.type || '');
  // const [imagePreview, setImagePreview] = useState(data?.image || '');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [response1, setResponse1] = useState(null);
  const [categoryName, setCategoryName] = useState(data?.categoryId.name || null);



  // Add useEffect to update state when `data` prop changes
  useEffect(() => {
    if (edit && data) {
      setName(data.name || "");
      setImage(data.image || "");
      // setType(data?.type || "");
      // setImagePreview(data.image || "");
      setCategoryId(data?.categoryId._id || "");
      setCategoryName(data?.categoryId.name || "");
    }
    else {
      setName("");
      setImage("");
      // setType('');
      setCategoryName("");
      setCategoryId("")
      // setImagePreview("");
    }
  }, [edit, data]);


  const resetForm = () => {
    setName("");
    setImage("");
    setCategoryName("");
    // setType('');
    setCategoryId("")
    // setImagePreview("");
  };



  const additionalFunctions = [handleClose, fetchApi];

  const createHandler = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", name);
    if (image) {
      if (image.size > 1048576) {
        showNotification({ message: "File size should be less than 1 MB.", type: "danger" });
        return; // Prevent form submission
      }
      fd.append("image", image);
    }
    fd.append("categoryId", categoryid);
    // fd.append("type", type);
    createApi({
      url: "api/v1/SubCategory/addSubcategory",
      payload: fd,
      setLoading,
      successMsg: "Created",
      additionalFunctions,
    });
    resetForm();
  };

  const updateHandler = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", name);
    if (image) {
      if (image.size > 1048576) {
        showNotification({ message: "File size should be less than 1 MB.", type: "danger" });
        return; // Prevent form submission
      }
      fd.append("image", image);
    }
    fd.append("categoryId", categoryid);
    // fd.append("type", type);
    updateApi({
      url: `api/v1/SubCategory/updateSubcategory/${id}`,
      payload: fd,
      setLoading,
      successMsg: "Updated",
      additionalFunctions,
    });
    resetForm();
  };


  const fetchHandler = () => {
    getApi({
      url: "api/v1/Category/allCategory",
      setLoading,
      setResponse: setResponse,
    });
  };

  const fetchHandler1 = () => {
    getApi({
      url: "getAllSubCategoryTypes",
      setLoading,
      setResponse: setResponse1,
    });
  };

  useEffect(() => {
    fetchHandler();
    fetchHandler1();
  }, []);


  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {" "}
          {edit ? "Edit Sub Category" : "Create Sub Category"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={edit ? updateHandler : createHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />
            {image && (
              <img
                src={image instanceof File ? URL.createObjectURL(image) : image}
                alt="Selected"
                style={{ width: "100%", height: '', marginTop: "10px" }}
              />
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          {/* <Form.Group className="mb-3">
            <Form.Label>Sub Category Type</Form.Label>
            <Form.Select
              value={type}
              onChange={(e) => {
                const selectedType = response1?.data?.find(type => type?.type === e.target.value);
                // setCategoryId(selectedCategory?._id);
                setType(e.target.value);
              }}
            >
              <option>Select Type</option>
              {response1?.data?.map(type => (
                <option key={type?._id} value={type?.type}>{type?.type}</option>
              ))}
            </Form.Select>
          </Form.Group> */}
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={categoryName}
              onChange={(e) => {
                const selectedCategory = response?.data?.find(category => category?.name === e.target.value);
                setCategoryId(selectedCategory?._id);
                setCategoryName(e.target.value);
              }}
            >
              <option>Select Category</option>
              {response?.data?.map(category => (
                <option key={category?._id} value={category?.name}>{category?.name}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <button className="submitBtn" type="submit">
            {loading ? <ClipLoader color="#fff" /> : "Submit"}
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const CreateNotification = ({ show, handleClose, fetchApi }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [total, setTotal] = useState('ALL');
  const [sendTo, setSendTo] = useState('');

  const resetForm = () => {
    setTitle("");
    setBody("");
    setSendTo("");
  };

  const data = {
    sendTo: sendTo,
    total: total,
    title: title,
    body: body
  };

  const additionalFunctions = [handleClose, fetchApi];

  const createHandler = (e) => {
    e.preventDefault();
    createApi({
      url: "api/v1/notification/sendNotification",
      payload: data,
      setLoading: () => { },
      successMsg: "Notification Created",
      additionalFunctions,
    });
    resetForm();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Create Notification</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={createHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <FloatingLabel label="Description">
              <Form.Control
                as="textarea"
                style={{ height: "100px" }}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Send To</Form.Label>
            <Form.Select
              value={sendTo}
              onChange={(e) => setSendTo(e.target.value)}
              required
            >
              <option value="">Select User type</option>
              <option value="USER">User</option>
              <option value="VENDOR">Vendor</option>
              <option value="BOTH">Both</option>
            </Form.Select>
          </Form.Group>
          <button className="submitBtn" type="submit">
            Send
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const CreateSubscription = ({ show, handleClose, edit, id, name, fetchApi, data }) => {
  const [subscriptionData, setSubscriptionData] = useState({
    name: data?.name || '',
    monthly: data?.monthly || '',
    quarterly: data?.quarterly || '',
    halfYearly: data?.halfYearly || '',
    yearly: data?.yearly || '',
    isShowHomeScreen: data?.isShowHomeScreen || false,
    isShowSalesScreen: data?.isShowSalesScreen || false,
    isShowOrderScreen: data?.isShowOrderScreen || false,
    features: {
      monthlyData: data?.monthlyData || [],
      quarterlyData: data?.quarterlyData || [],
      halfYearlyData: data?.halfYearlyData || [],
      yearlyData: data?.yearlyData || []
    }
  });

  const [newFeature, setNewFeature] = useState({ features: "", count: 0 });
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setSubscriptionData({
      name: data?.name || '',
      monthly: data?.monthly || '',
      quarterly: data?.quarterly || '',
      halfYearly: data?.halfYearly || '',
      yearly: data?.yearly || '',
      isShowHomeScreen: data?.isShowHomeScreen || false,
      isShowSalesScreen: data?.isShowSalesScreen || false,
      isShowOrderScreen: data?.isShowOrderScreen || false,
      features: {
        monthlyData: data?.monthlyData || [],
        quarterlyData: data?.quarterlyData || [],
        halfYearlyData: data?.halfYearlyData || [],
        yearlyData: data?.yearlyData || []
      }
    });

    setNewFeature({ features: "", count: 0 });
  };

  useEffect(() => {
    if (edit && data) {
      setSubscriptionData({
        name: data?.name || '',
        monthly: data?.monthly || '',
        quarterly: data?.quarterly || '',
        halfYearly: data?.halfYearly || '',
        yearly: data?.yearly || '',
        isShowHomeScreen: data?.isShowHomeScreen || false,
        isShowSalesScreen: data?.isShowSalesScreen || false,
        isShowOrderScreen: data?.isShowOrderScreen || false,
        features: {
          monthlyData: data?.monthlyData || [],
          quarterlyData: data?.quarterlyData || [],
          halfYearlyData: data?.halfYearlyData || [],
          yearlyData: data?.yearlyData || []
        }
      });
    } else {
      setSubscriptionData({
        name: '',
        monthly: '',
        quarterly: '',
        halfYearly: '',
        yearly: '',
        isShowHomeScreen: false,
        isShowSalesScreen: false,
        isShowOrderScreen: false,
        features: {
          monthlyData: [],
          quarterlyData: [],
          halfYearlyData: [],
          yearlyData: []
        }
      });
    }
  }, [edit, data]);


  const handleChange = (e) => {
    const { name, value } = e.target;

    // Convert string "true"/"false" to actual boolean values
    const booleanValue = value === "true" ? true : value === "false" ? false : value;

    setSubscriptionData({
      ...subscriptionData,
      [name]: booleanValue,
    });
  };


  const handleFeatureChange = (e, period) => {
    const { name, value } = e.target;
    setNewFeature((prev) => ({
      ...prev,
      [period]: {
        ...prev[period], // Maintain previous data for this period
        [name]: value // Update the input field based on its name (either "features" or "count")
      }
    }));
  };



  // Add a feature to the appropriate period
  const addFeature = (period) => {
    if (newFeature[period]?.features && newFeature[period]?.count) {
      setSubscriptionData((prevData) => ({
        ...prevData,
        features: {
          ...prevData.features,
          [period]: [
            ...prevData.features[period], // Access the correct period data
            newFeature[period] // Add the new feature for the correct period
          ]
        }
      }));

      // Reset the newFeature state for that period after adding the feature
      setNewFeature((prev) => ({
        ...prev,
        [period]: { features: '', count: 0 } // Reset only the specific period
      }));
    }
  };


  // Remove a feature from the appropriate period
  const removeFeature = (index, period) => {
    setSubscriptionData((prevData) => ({
      ...prevData,
      features: {
        ...prevData.features,
        [period]: prevData.features[period].filter((_, i) => i !== index)
      }
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    // Creating the payload with the correct structure
    const payload = {
      ...subscriptionData,
      monthlyData: subscriptionData.features.monthlyData,
      quarterlyData: subscriptionData.features.quarterlyData,
      halfYearlyData: subscriptionData.features.halfYearlyData,
      yearlyData: subscriptionData.features.yearlyData,
    };

    // API call to create or update the subscription
    if (edit) {
      updateApi({
        url: `api/v1/admin/Plans/update/${id}`,
        payload,
        setLoading,
        successMsg: "Updated",
        additionalFunctions: [handleClose, fetchApi]
      });
    } else {
      createApi({
        url: "api/v1/admin/Plans/create",
        payload,
        setLoading,
        successMsg: "Created",
        additionalFunctions: [handleClose, fetchApi]
      });
    }
    resetForm()
  };

  const featureOptions = [
    'Products',
    'Images/ Product',
    'Video clips/ Product',
    'Homescreen Flash',
    'Invoice creation',
    'Inventory management',
    'Reports',
  ];


  const closemodal = () => {
    handleClose()
    resetForm()
  }




  return (
    <Modal show={show} onHide={closemodal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{edit ? "Edit Subscription" : "Create New Subscription"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Subscription Plan Name */}
          <Form.Group className="mb-3">
            <Form.Label>Plan Name</Form.Label>
            <Form.Control type="text" name="name" value={subscriptionData.name} onChange={handleChange} placeholder="Enter plan name" required />
          </Form.Group>

          {/* Subscription Prices */}
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Monthly Price</Form.Label>
                <Form.Control type="number" name="monthly" value={subscriptionData.monthly} onChange={handleChange} placeholder="Enter monthly price" required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Quarterly Price</Form.Label>
                <Form.Control type="number" name="quarterly" value={subscriptionData.quarterly} onChange={handleChange} placeholder="Enter quarterly price" required />
              </Form.Group>
            </Col>
          </Row>
          {/* Additional Price Fields */}
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Half-Yearly Price</Form.Label>
                <Form.Control type="number" name="halfYearly" value={subscriptionData.halfYearly} onChange={handleChange} placeholder="Enter half-yearly price" required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Yearly Price</Form.Label>
                <Form.Control type="number" name="yearly" value={subscriptionData.yearly} onChange={handleChange} placeholder="Enter yearly price" required />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Show on Home Screen</Form.Label>
            <Form.Select

              name="isShowHomeScreen"
              value={subscriptionData.isShowHomeScreen === true ? "true" : subscriptionData.isShowHomeScreen === false ? "false" : ''}
              onChange={handleChange}
            >
              <option value=''>Select your preference</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Show on Sales Screen</Form.Label>
            <Form.Select
              name="isShowSalesScreen"
              value={subscriptionData.isShowSalesScreen === true ? "true" : subscriptionData.isShowSalesScreen === false ? "false" : ''}
              onChange={handleChange}
            >
              <option value=''>Select your preference</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Show on Order Screen</Form.Label>
            <Form.Select
              name="isShowOrderScreen"
              value={subscriptionData.isShowOrderScreen === true ? "true" : subscriptionData.isShowOrderScreen === false ? "false" : ''}
              onChange={handleChange}
            >
              <option value=''>Select your preference</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Form.Select>
          </Form.Group>


          {/* Features for different plans */}
          {['monthlyData', 'quarterlyData', 'halfYearlyData', 'yearlyData'].map((period) => (
            <div key={period}>
              <h5>{period.replace('Data', '')} Features</h5>
              {/* Render each feature for the current period */}
              {subscriptionData.features[period]?.map((feature, index) => (
                <div key={index} className="feature-item">
                  <span>{feature.features} - {feature.count}</span>
                  <IoCloseSharp onClick={() => removeFeature(index, period)} style={{ cursor: 'pointer' }} color="red" size={25} />
                </div>
              ))}
              <Form.Group className="mb-3">
                <Form.Label>Add New Feature</Form.Label>
                {/* Handle new feature name input */}
                <Form.Select
                  name="features"
                  value={newFeature[period]?.features || ''}
                  onChange={(e) => handleFeatureChange(e, period)}
                >
                  <option value="" disabled>Select feature</option>
                  {featureOptions.map((option, idx) => (
                    <option key={idx} value={option}>{option}</option>
                  ))}
                </Form.Select>
                {/* Handle new feature count input */}
                <Form.Control
                  type="number"
                  name="count"
                  value={newFeature[period]?.count || ''}
                  onChange={(e) => handleFeatureChange(e, period)}
                  min={0}
                  placeholder="Enter feature count"
                  style={{ marginTop: '10px' }}
                />
                <Button
                  variant="secondary"
                  onClick={() => addFeature(period)}
                  style={{ marginTop: '10px' }}
                >
                  Add Feature
                </Button>
              </Form.Group>
            </div>
          ))}



          <Button variant="primary" type="submit" className="mt-3">
            {edit ? "Update Subscription" : "Create Subscription"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const CreateSubscriptionDiscount = ({ show, handleClose, name, fetchApi, data }) => {
  const [subscriptionData, setSubscriptionData] = useState({
    discountmonthly: data?.monthlyDiscount || '',
    discountquarterly: data?.quarterlyDiscount || '',
    discounthalfYearly: data?.halfYearlyDiscount || '',
    discountyearly: data?.yearlyDiscount || '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubscriptionData({ ...subscriptionData, [name]: value });
  };

  const payload = {
    monthlyDiscount: subscriptionData.discountmonthly,
    quarterlyDiscount: subscriptionData.discountquarterly,
    halfYearlyDiscount: subscriptionData.discounthalfYearly,
    yearlyDiscount: subscriptionData.discountyearly,
  };

  const additionalFunctions = [handleClose, fetchApi];

  const createHandler = (e) => {
    e.preventDefault();
    createApi({
      url: `api/v1/admin/plans/addDiscountToPlan/${name}`,
      payload: payload,
      setLoading,
      successMsg: 'Created',
      additionalFunctions,
    });
    // resetForm(); // Uncomment if needed
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Discount Subscription</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={createHandler}>
          <div>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Monthly Discount</Form.Label>
                  <Form.Control
                    type="number"
                    name="discountmonthly"
                    value={subscriptionData.discountmonthly}
                    onChange={handleChange}
                    placeholder="Enter discount"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Quarterly Discount</Form.Label>
                  <Form.Control
                    type="number"
                    name="discountquarterly"
                    value={subscriptionData.discountquarterly}
                    onChange={handleChange}
                    placeholder="Enter discount"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>HalfYearly Discount</Form.Label>
                  <Form.Control
                    type="number"
                    name="discounthalfYearly"
                    value={subscriptionData.discounthalfYearly}
                    onChange={handleChange}
                    placeholder="Enter discount"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Yearly Discount</Form.Label>
                  <Form.Control
                    type="number"
                    name="discountyearly"
                    value={subscriptionData.discountyearly}
                    onChange={handleChange}
                    placeholder="Enter discount"
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>

          <Button variant="primary" type="submit" className="mt-3">
            Add
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateSubscriptionDiscount;




const CreateFaq = ({ show, handleClose, edit, id, fetchApi, data }) => {
  const [question, setQuestion] = useState(data?.question || '');
  const [answer, setAnswer] = useState(data?.answer || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setQuestion(data?.question || "");
      setAnswer(data?.answer || "");
    }
  }, [data]);

  const resetForm = () => {
    setQuestion("");
    setAnswer("");
  };

  const fd = {
    question: question,
    answer: answer
  }

  const additionalFunctions = [handleClose, fetchApi];

  const createHandler = (e) => {
    e.preventDefault();
    createApi({
      url: "api/v1/static/faq/createFaq",
      payload: fd,
      setLoading,
      successMsg: "Created",
      additionalFunctions,
    });
    resetForm();
  };

  const updateHandler = (e) => {
    e.preventDefault();
    updateApi({
      url: `api/v1/static/faq/${id}`,
      payload: fd,
      setLoading,
      successMsg: "Updated",
      additionalFunctions,
    });
    resetForm();
  };




  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {" "}
          {edit ? "Edit FAQs" : "Add New FAQs"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={edit ? updateHandler : createHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Question</Form.Label>
            <Form.Control type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Answer</Form.Label>
            <FloatingLabel>
              <Form.Control as="textarea" style={{ height: "100px" }} value={answer} onChange={(e) => setAnswer(e.target.value)} />
            </FloatingLabel>
          </Form.Group>

          <button className="submitBtn" type="submit">
            Submit
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const EditReview = ({ show, handleClose, id, ids, fetchApi, data }) => {
  const [rating, setRating] = useState(data?.rating || '');
  const [comment, setComment] = useState(data?.comment || '');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (data) {
      setRating(data?.rating || "");
      setComment(data?.comment || "");
    }
  }, [data]);

  const resetForm = () => {
    setRating("");
    setComment("");
  };

  const fd = {
    rating: rating,
    comment: comment
  }

  const additionalFunctions = [handleClose, fetchApi];

  const updateHandler = (e) => {
    e.preventDefault();
    updateApi({
      url: `api/v1/admin/Product/updateProductReview/${id}/${ids}`,
      payload: fd,
      setLoading,
      successMsg: "Updated",
      additionalFunctions,
    });
    resetForm();
  };




  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {" "}
          Edit Rating
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={updateHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Rating</Form.Label>
            <Form.Control type="text" value={rating} onChange={(e) => setRating(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Comment</Form.Label>
            <FloatingLabel>
              <Form.Control as="textarea" style={{ height: "100px" }} value={comment} onChange={(e) => setComment(e.target.value)} />
            </FloatingLabel>
          </Form.Group>

          <button className="submitBtn" type="submit">
            {loading ? <ClipLoader color="#fff" /> : "Submit"}
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const CreateAdminStore = ({ show, handleClose, fetchApi }) => {
  const [storeName, setStoreName] = useState('');
  const [loading, setLoading] = useState(false);


  const resetForm = () => {
    setStoreName("");
  };

  const fd = {
    StoreName: storeName,
  }

  const additionalFunctions = [handleClose, fetchApi];

  const createHandler = (e) => {
    e.preventDefault();
    createApi({
      url: "api/v1/Admin/store/addAdminStore",
      payload: fd,
      setLoading,
      successMsg: "Created",
      additionalFunctions,
    });
    resetForm();
  };


  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Store
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={createHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Store Name</Form.Label>
            <Form.Control type="text" value={storeName} onChange={(e) => setStoreName(e.target.value)} />
          </Form.Group>
          <button className="submitBtn" type="submit">
            {loading ? <ClipLoader color="#fff" /> : "Submit"}
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const CreateBlog = ({ show, handleClose, edit, id, fetchApi, data }) => {
  const [name, setName] = useState(data?.name || '');
  const [desc, setDesc] = useState(data?.desc || '');
  const [location, setLocation] = useState(data?.locationOfBlog || '');
  const [locationId, setLocationId] = useState('');
  const [image, setImage] = useState(data?.blogImage || []);
  const [video, setVideo] = useState(data?.blogVideo || []);
  const [loading, setLoading] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [imgid, setImageId] = useState('');
  const [viewimg, setViewImage] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (edit && data) {
      setName(data?.name || "");
      setDesc(data?.desc || "");
      setLocation(data?.locationOfBlog || '');
      setImage(data.blogImage || []);
      setVideo(data.blogVideo || []);
    } else {
      setName('');
      setDesc('');
      setImage([]);
      setVideo([]);
      setLocation('');
    }
  }, [edit, data]);

  const resetForm = () => {
    setName("");
    setDesc("");
    setLocation("");
    setImage([]);
    setVideo([]);
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = [];
    selectedFiles.forEach(file => {
      if (file.size <= 1048576) {
        validFiles.push(file);
        setError("");
      } else {
        setError("Picture size should be less than 1 MB.");
      }
    });
    setImage([...image, ...validFiles]);
  };

  const fd = new FormData();
  fd.append("name", name);
  fd.append("desc", desc);
  fd.append("locationOfBlog", location);
  image.forEach(img => {
    fd.append("blogImages", img instanceof File ? img : img.img);
  });

  const additionalFunctions = [handleClose, fetchApi];

  const createHandler = (e) => {
    e.preventDefault();
    createApi({
      url: "api/v1/admin/blog/blogAdd",
      payload: fd,
      setLoading,
      successMsg: "Created",
      additionalFunctions,
    });
    resetForm();
    setError("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    const fd = {
      name: name,
      desc: desc,
      locationOfBlog: location
    };
    updateApi({
      url: `api/v1/admin/blog/${id}/content`,
      payload: fd,
      setLoading,
      successMsg: "Updated",
      additionalFunctions,
    });
    resetForm();
    setError("");
  };

  const fetchHandler = () => {
    getApi({
      url: "api/getCitiesWithOutPagination",
      setLoading,
      setResponse: setResponse,
    });
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <UpdateBlogImage
        show={show1}
        handleClose={() => setShow1(false)}
        id={id}
        imgid={imgid}
        fetchApi={fetchApi}
        handleClose1={handleClose}
        img={viewimg}
      />
      <AddBlogImage
        show={show2}
        handleClose={() => setShow2(false)}
        id={id}
        fetchApi={fetchApi}
        handleClose1={handleClose}
      />
      <AddBlogVideo
        show={show3}
        handleClose={() => setShow3(false)}
        id={id}
        fetchApi={fetchApi}
        handleClose1={handleClose}
      />
      <UpdateBlogVideo
        show={show4}
        handleClose={() => setShow4(false)}
        id={id}
        imgid={imgid}
        fetchApi={fetchApi}
        handleClose1={handleClose}
        img={viewimg}
      />
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {edit ? "Edit Blog" : "Add Blog"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={edit ? updateHandler : createHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            {!edit && (
              <>
                <Form.Control
                  type="file"
                  multiple
                  onChange={handleImageChange}
                />
                {error && <div style={{ color: "red", marginTop: "5px" }}>{error}</div>}
              </>
            )}

            <div className="imagePreview" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {image.map((img, index) => (
                <div key={index} className="imagePreview1">
                  <img
                    src={img instanceof File ? URL.createObjectURL(img) : img.img}
                    alt="Selected"
                    style={{ width: "100px", height: '100px', objectFit: 'cover' }}
                  />
                  <div className="overlay">
                    <div className="overlay-content" onClick={() => {
                      setImageId(img._id);
                      setShow1(true);
                      setViewImage(img.img);
                    }}>
                      <MdEdit color="#ffffff" size={20} />
                      <span>update</span>
                    </div>
                  </div>
                </div>
              ))}
              {edit && (
                <div className="imagePreview2" onClick={() => setShow2(true)}>
                  Add Image
                </div>
              )}
            </div>
            {/* Video previews */}
            <div className="imagePreview" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {video.map((video, index) => (
                <div key={index} className="imagePreview1">
                  <video
                    src={video.video}
                    className="centerImage"
                    controls
                    style={{ width: "100px", height: '100px', objectFit: 'cover' }}
                  />
                  <div className="overlay">
                    <div className="overlay-content" onClick={() => {
                      setImageId(video._id);
                      setShow4(true);
                      setViewImage(video.video);
                    }}>
                      <MdEdit color="#ffffff" size={20} />
                      <span>update</span>
                    </div>
                  </div>
                </div>
              ))}
              {edit && (
                <div className="imagePreview2" onClick={() => setShow3(true)}>
                  Add Video
                </div>
              )}
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Select
              value={location}
              onChange={(e) => {
                const selectedCity = response?.data?.find(city => city?.name === e.target.value);
                setLocationId(selectedCity?._id);
                setLocation(e.target.value);
              }}
            >
              <option>Select City</option>
              {response?.data?.map(city => (
                <option key={city?._id} value={city?.name}>{city?.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            {/* <Form.Control
              as="textarea"
              rows={3}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            /> */}
            <ReactQuill value={desc} onChange={setDesc} className="bg-white" />
          </Form.Group>
          <button className="submitBtn" type="submit" disabled={loading}>
            {loading ? <ClipLoader color="#fff" /> : "Submit"}
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const AddBlogImage = ({ show, handleClose, id, fetchApi, handleClose1 }) => {
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resetForm = () => {
    setImage([]); // Clear image after form reset
  };

  // Handle new images by appending them to the existing state
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = [];

    // Check each file size and add to validFiles if within limit
    selectedFiles.forEach(file => {
      if (file.size <= 1048576) { // 1 MB in bytes
        validFiles.push(file);
      } else {
        setError("Picture size should be less than 1 MB.");
      }
    });

    setImage([...image, ...validFiles]);
  };

  // Prepare FormData including all images
  const fd = new FormData();
  image.forEach((img) => {
    fd.append("images", img instanceof File ? img : img.img);
  });

  const additionalFunctions = [handleClose, fetchApi, handleClose1];

  const createHandler = (e) => {
    e.preventDefault();

    if (image.some(img => img.size > 1048576)) {
      setError("One or more images exceed the 1 MB size limit.");
      return;
    }

    createApi({
      url: `api/v1/admin/addNewImageToBlog/${id}`,
      payload: fd,
      setLoading,
      successMsg: "Added Image",
      additionalFunctions,
    });

    resetForm();
    setError(""); // Clear any previous error
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Blog Image
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={createHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              multiple // Allow multiple file selection
              onChange={handleImageChange}
            />
            {error && <div style={{ color: "red", marginTop: "5px" }}>{error}</div>}
            <div className="imagePreview" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {image.map((img, index) => (
                <div key={index} className="imagePreview1">
                  <img
                    src={img instanceof File ? URL.createObjectURL(img) : img.img}
                    alt="Selected"
                    style={{ width: "100px", height: '100px', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </Form.Group>
          <button className="submitBtn" type="submit" disabled={loading}>
            {loading ? <ClipLoader color="#fff" /> : "Add"}
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const AddBlogVideo = ({ show, handleClose, id, fetchApi, handleClose1 }) => {
  const [video, setVideo] = useState([]);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setVideo([]); // Clear image after form reset
  };

  // Handle new images by appending them to the existing state
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setVideo([...video, ...selectedFiles]);
  };

  // Prepare FormData including all images


  const fd = new FormData();
  video.forEach((video) => {
    fd.append("video", video instanceof File ? video : video.video);
  });

  const additionalFunctions = [handleClose, fetchApi, handleClose1];

  const createHandler = (e) => {
    e.preventDefault();
    createApi({
      url: `admin/addNewVideoToBlog/${id}`,
      payload: fd,
      setLoading,
      successMsg: "Added Video",
      additionalFunctions,
    });
    resetForm();
  };


  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Blog Video
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={createHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Video</Form.Label>
            <Form.Control
              type="file"
              multiple // Allow multiple file selection
              onChange={handleImageChange}
            />
            <div className="imagePreview" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {video.map((video, index) => (
                <div key={index} className="imagePreview1">
                  <video
                    src={video instanceof File ? URL.createObjectURL(video) : video.video}
                    alt="Selected"
                    controls
                    style={{ width: "100px", height: '100px', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </Form.Group>
          <button className="submitBtn" type="submit" disabled={loading}>
            {loading ? <ClipLoader color="#fff" /> : "Add"}
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};


const UpdateBlogImage = ({ show, handleClose, id, imgid, fetchApi, handleClose1, img }) => {
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setImage('');
  };

  const additionalFunctions = [handleClose, fetchApi, handleClose1];

  const updateHandler = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("image", image);
    updateApi({
      url: `api/v1/admin/blog/${id}/image/${imgid}`,
      payload: fd,
      setLoading,
      successMsg: "Image Updated",
      additionalFunctions,
    });
    if (image && image.size > 1048576) {
      showNotification({ message: "Picture size should be less than 1 MB.", type: "danger" });
      handleClose()
      return;
    }
    resetForm();
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    removeApi({
      url: `deleteBlogImageById/${id}/${imgid}`,
      successMsg: "Removed Image!",
      additionalFunctions,
    });
    resetForm();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Image
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={updateHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              // multiple // Allow multiple file selection
              onChange={(e) => setImage(e.target.files[0])}
            />
            <div className="imagePreview" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <div className="imagePreview1">
                <img
                  src={image instanceof File ? URL.createObjectURL(image) : img}
                  alt="Selected"
                  style={{ width: "100%", height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </Form.Group>
          <div style={{ display: 'flex', justifyContent: "space-between" }}>
            <button className="submitBtn" type="submit" disabled={loading}>
              {loading ? <ClipLoader color="#fff" /> : "Submit"}
            </button>
            <button className="submitBtn" onClick={deleteHandler} >
              Delete Image
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
const UpdateBlogVideo = ({ show, handleClose, id, imgid, fetchApi, handleClose1, img }) => {
  const [video, setVideo] = useState('');
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setVideo('');
  };

  const additionalFunctions = [handleClose, fetchApi, handleClose1];

  const updateHandler = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("video", video);
    updateApi({
      url: `admin/updateBlogVideo/${id}/${imgid}`,
      payload: fd,
      setLoading,
      successMsg: "Video Updated",
      additionalFunctions,
    });
    resetForm();
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    removeApi({
      url: `admin/deleteVideoFromBlog/${id}/${imgid}`,
      successMsg: "Removed Video!",
      additionalFunctions,
    });
    resetForm();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Video
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={updateHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Video</Form.Label>
            <Form.Control
              type="file"
              // multiple // Allow multiple file selection
              onChange={(e) => setVideo(e.target.files[0])}
            />
            <div className="imagePreview">
              <div className="imagePreview1">
                <video
                  src={video instanceof File ? URL.createObjectURL(video) : img}
                  alt="Selected"
                  controls
                  style={{ width: "100%", height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </Form.Group>
          <div style={{ display: 'flex', justifyContent: "space-between" }}>
            <button className="submitBtn" type="submit" disabled={loading}>
              {loading ? <ClipLoader color="#fff" /> : "Submit"}
            </button>
            <button className="submitBtn" onClick={deleteHandler} >
              Delete Video
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};


const CreateEvent = ({ show, handleClose, edit, id, fetchApi, data }) => {
  const [name, setName] = useState(data?.name || '');
  const [desc, setDesc] = useState(data?.desc || '');
  const [location, setLocation] = useState(data?.locationOfEvent || '');
  const [locationId, setLocationId] = useState('');
  const [area, setarea] = useState(data?.areaName || '');
  const [areaNameId, setareaNameId] = useState('');
  const [image, setImage] = useState(data?.eventImage || []);
  const [video, setVideo] = useState(data?.eventVideo || []);
  const [loading, setLoading] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [imgid, setImageId] = useState('')
  const [viewimg, setViewImage] = useState('')
  const [response, setResponse] = useState(null);
  const [response1, setResponse1] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (edit && data) {
      setName(data?.name || '');
      setDesc(data?.desc || '');
      setImage(data.eventImage || []);
      setLocation(data?.locationOfEvent || '');
      setarea(data?.areaName || '');
      setVideo(data.eventVideo || []);
    } else {
      // Reset all fields when edit is false
      setName('');
      setDesc('');
      setImage([]);
      setVideo([]);
      setLocation('');
      setarea('');
    }
  }, [edit, data]);



  const resetForm = () => {
    setName("");
    setDesc("");
    setLocation("");
    setarea("");
    setImage([]);
    setVideo([]);
  };




  // Handle new images by appending them to the existing state
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = [];
    selectedFiles.forEach(file => {
      if (file.size <= 1048576) {
        validFiles.push(file);
        setError("");
      } else {
        setError("Picture size should be less than 1 MB.");
      }
    });
    setImage([...image, ...validFiles]);
  };


  const fd = new FormData();
  fd.append("name", name);
  fd.append("desc", desc);
  fd.append("locationOfEvent", location);
  fd.append("areaName", area);
  image?.forEach((img) => {
    fd.append("eventImage", img instanceof File ? img : img.img);
  });

  const additionalFunctions = [handleClose, fetchApi];

  const createHandler = (e) => {
    e.preventDefault();
    createApi({
      url: "api/v1/admin/event/eventAdd",
      payload: fd,
      setLoading,
      successMsg: "Created",
      additionalFunctions,
    });
    resetForm();
    setError("");
  };


  const updateHandler = (e) => {
    e.preventDefault();
    const fd = {
      name: name,
      desc: desc,
      locationOfEvent: location,
      areaName: area
    }

    updateApi({
      url: `api/v1/admin/event/updateEventContentById/${id}`,
      payload: fd,
      setLoading,
      successMsg: "Updated",
      additionalFunctions,
    });
    resetForm();
    setError("");
  };


  const fetchHandler = () => {
    getApi({
      url: "api/getCitiesWithOutPagination",
      setLoading,
      setResponse: setResponse,
    });
  };


  const fetchHandler1 = () => {
    getApi({
      url: `getAllAreasByCityId/${locationId}`,
      setLoading,
      setResponse: setResponse1,
    });
  };


  useEffect(() => {
    fetchHandler1();
  }, [locationId]);

  useEffect(() => {
    fetchHandler();
  }, []);




  return (
    <Modal show={show} onHide={handleClose} centered>
      <UpdateEventImage
        show={show1}
        handleClose={() => setShow1(false)}
        id={id}
        imgid={imgid}
        fetchApi={fetchApi}
        handleClose1={handleClose}
        img={viewimg}
      />
      <AddEventImage
        show={show2}
        handleClose={() => setShow2(false)}
        id={id}
        fetchApi={fetchApi}
        handleClose1={handleClose}
      />
      <AddEventVideo
        show={show3}
        handleClose={() => setShow3(false)}
        id={id}
        fetchApi={fetchApi}
        handleClose1={handleClose}
      />
      <UpdateEventVideo
        show={show4}
        handleClose={() => setShow4(false)}
        id={id}
        imgid={imgid}
        fetchApi={fetchApi}
        handleClose1={handleClose}
        img={viewimg}
      />
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {edit ? "Edit Event" : "Add Event"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={edit ? updateHandler : createHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            {edit ?
              ""
              :
              <>
                <Form.Control
                  type="file"
                  multiple // Allow multiple file selection
                  onChange={handleImageChange}
                />
                {error && <div style={{ color: "red", marginTop: "5px" }}>{error}</div>}
              </>
            }
            <div className="imagePreview" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {image?.map((img, index) => (
                <div key={index} className="imagePreview1">
                  <img
                    src={img instanceof File ? URL.createObjectURL(img) : img.img}
                    alt="Selected"
                    style={{ width: "100px", height: '100px', objectFit: 'cover' }}
                  />
                  <div className="overlay">
                    <div className="overlay-content" onClick={() => {
                      setImageId(img._id);
                      setShow1(true);
                      setViewImage(img.img)
                    }}>
                      <MdEdit color="#ffffff" size={20} />
                      <span>update</span>
                    </div>
                  </div>
                </div>
              ))}
              {edit ?
                <div className="imagePreview2"
                  onClick={() => {
                    setShow2(true);
                  }}>
                  Add Image
                </div>

                :
                ""
              }
            </div>
            {/* Video previews */}
            <div className="imagePreview" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {video.map((video, index) => (
                <div key={index} className="imagePreview1">
                  <video
                    src={video.video}
                    className="centerImage"
                    controls
                    style={{ width: "100px", height: '100px', objectFit: 'cover' }}
                  />
                  <div className="overlay">
                    <div className="overlay-content" onClick={() => {
                      setImageId(video._id);
                      setShow4(true);
                      setViewImage(video.video);
                    }}>
                      <MdEdit color="#ffffff" size={20} />
                      <span>update</span>
                    </div>
                  </div>
                </div>
              ))}
              {edit && (
                <div className="imagePreview2" onClick={() => setShow3(true)}>
                  Add Video
                </div>
              )}
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Select
              value={location}
              onChange={(e) => {
                const selectedCity = response?.data?.find(city => city?.name === e.target.value);
                setLocationId(selectedCity?._id);
                setLocation(e.target.value);
              }}
            >
              <option>Select City</option>
              {response?.data?.map(city => (
                <option key={city?._id} value={city?.name}>{city?.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Area</Form.Label>
            <Form.Select
              value={area}
              onChange={(e) => {
                const selectedArea = response1?.data?.find(area => area?.name === e.target.value);
                setareaNameId(selectedArea?._id);
                setarea(e.target.value);
              }}
            >
              <option>Select Area</option>
              {response1?.data?.map(area => (
                <option key={area?._id} value={area?.name}>{area?.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </Form.Group>
          <button className="submitBtn" type="submit" disabled={loading}>
            {loading ? <ClipLoader color="#fff" /> : "Submit"}
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
const AddEventImage = ({ show, handleClose, id, fetchApi, handleClose1 }) => {
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resetForm = () => {
    setImage([]); // Clear image after form reset
  };

  // Handle new images by appending them to the existing state
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = [];

    // Check each file size and add to validFiles if within limit
    selectedFiles.forEach(file => {
      if (file.size <= 1048576) { // 1 MB in bytes
        validFiles.push(file);
      } else {
        setError("Picture size should be less than 1 MB.");
      }
    });

    setImage([...image, ...validFiles]);
  };

  // Prepare FormData including all images


  const fd = new FormData();
  image.forEach((img) => {
    fd.append("images", img instanceof File ? img : img.img);
  });

  const additionalFunctions = [handleClose, fetchApi, handleClose1];

  const createHandler = (e) => {
    e.preventDefault();
    if (image.some(img => img.size > 1048576)) {
      setError("One or more images exceed the 1 MB size limit.");
      return;
    }
    createApi({
      url: `api/v1/admin/addNewImageToEvent/${id}`,
      payload: fd,
      setLoading,
      successMsg: "Added Image",
      additionalFunctions,
    });
    resetForm();
    setError("");
  };


  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Event Image
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={createHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              multiple // Allow multiple file selection
              onChange={handleImageChange}
            />
            {error && <div style={{ color: "red", marginTop: "5px" }}>{error}</div>}
            <div className="imagePreview" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {image.map((img, index) => (
                <div key={index} className="imagePreview1">
                  <img
                    src={img instanceof File ? URL.createObjectURL(img) : img.img}
                    alt="Selected"
                    style={{ width: "100px", height: '100px', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </Form.Group>
          <button className="submitBtn" type="submit" disabled={loading}>
            {loading ? <ClipLoader color="#fff" /> : "Add"}
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
const AddEventVideo = ({ show, handleClose, id, fetchApi, handleClose1 }) => {
  const [video, setVideo] = useState([]);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setVideo([]); // Clear image after form reset
  };

  // Handle new images by appending them to the existing state
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setVideo([...video, ...selectedFiles]);
  };

  // Prepare FormData including all images


  const fd = new FormData();
  video.forEach((video) => {
    fd.append("video", video instanceof File ? video : video.video);
  });

  const additionalFunctions = [handleClose, fetchApi, handleClose1];

  const createHandler = (e) => {
    e.preventDefault();
    createApi({
      url: `admin/addNewVideoToEvent/${id}`,
      payload: fd,
      setLoading,
      successMsg: "Added Video",
      additionalFunctions,
    });
    resetForm();
  };


  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Event Video
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={createHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Video</Form.Label>
            <Form.Control
              type="file"
              multiple // Allow multiple file selection
              onChange={handleImageChange}
            />
            <div className="imagePreview" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {video.map((video, index) => (
                <div key={index} className="imagePreview1">
                  <video
                    src={video instanceof File ? URL.createObjectURL(video) : video.video}
                    alt="Selected"
                    controls
                    style={{ width: "100px", height: '100px', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </Form.Group>
          <button className="submitBtn" type="submit" disabled={loading}>
            {loading ? <ClipLoader color="#fff" /> : "Add"}
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
const UpdateEventImage = ({ show, handleClose, id, imgid, fetchApi, handleClose1, img }) => {
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setImage('');
  };

  const additionalFunctions = [handleClose, fetchApi, handleClose1];

  const updateHandler = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("eventImage", image);
    updateApi({
      url: `api/v1/admin/event/${id}/updateEventImageById/${imgid}`,
      payload: fd,
      setLoading,
      successMsg: "Image Updated",
      additionalFunctions,
    });
    if (image && image.size > 1048576) {
      showNotification({ message: "Picture size should be less than 1 MB.", type: "danger" });
      handleClose()
      return;
    }
    resetForm();
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    removeApi({
      url: `events/${id}/images/${imgid}`,
      successMsg: "Removed Image!",
      additionalFunctions,
    });
    resetForm();
  };


  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Image
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={updateHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              // multiple // Allow multiple file selection
              onChange={(e) => setImage(e.target.files[0])}
            />
            <div className="imagePreview" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <div className="imagePreview1">
                <img
                  src={image instanceof File ? URL.createObjectURL(image) : img}
                  alt="Selected"
                  style={{ width: "100%", height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </Form.Group>
          <div style={{ display: 'flex', justifyContent: "space-between" }}>
            <button className="submitBtn" type="submit" disabled={loading}>
              {loading ? <ClipLoader color="#fff" /> : "Submit"}
            </button>
            <button className="submitBtn" onClick={deleteHandler} >
              Delete Image
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
const UpdateEventVideo = ({ show, handleClose, id, imgid, fetchApi, handleClose1, img }) => {
  const [video, setVideo] = useState('');
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setVideo('');
  };

  const additionalFunctions = [handleClose, fetchApi, handleClose1];

  const updateHandler = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("video", video);
    updateApi({
      url: `admin/updateEventVideo/${id}/${imgid}`,
      payload: fd,
      setLoading,
      successMsg: "Video Updated",
      additionalFunctions,
    });
    resetForm();
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    removeApi({
      url: `admin/deleteVideoFromEvent/${id}/${imgid}`,
      successMsg: "Removed Video!",
      additionalFunctions,
    });
    resetForm();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Video
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={updateHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Video</Form.Label>
            <Form.Control
              type="file"
              // multiple // Allow multiple file selection
              onChange={(e) => setVideo(e.target.files[0])}
            />
            <div className="imagePreview">
              <div className="imagePreview1">
                <video
                  src={video instanceof File ? URL.createObjectURL(video) : img}
                  alt="Selected"
                  controls
                  style={{ width: "100%", height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </Form.Group>
          <div style={{ display: 'flex', justifyContent: "space-between" }}>
            <button className="submitBtn" type="submit" disabled={loading}>
              {loading ? <ClipLoader color="#fff" /> : "Submit"}
            </button>
            <button className="submitBtn" onClick={deleteHandler} >
              Delete Video
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const CreateContes = ({ show, handleClose, edit, id, fetchApi, data }) => {
  const [name, setName] = useState(data?.name || '');
  const [desc, setDesc] = useState(data?.desc || '');
  const [location, setLocation] = useState(data?.locationOfContest || '');
  const [locationId, setLocationId] = useState('');
  const [image, setImage] = useState(data?.contestImage || []);
  const [video, setVideo] = useState(data?.contestVideo || []);
  const [loading, setLoading] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [imgid, setImageId] = useState('')
  const [viewimg, setViewImage] = useState('')
  const [response, setResponse] = useState(null);
  const [response1, setResponse1] = useState(null);
  const [area, setarea] = useState(data?.areaName || '');
  const [areaNameId, setareaNameId] = useState('');
  const [error, setError] = useState("");

  useEffect(() => {
    if (edit && data) {
      setName(data?.name || "");
      setDesc(data?.desc || "");
      setLocation(data?.locationOfContest || '');
      setImage(data.contestImage || []);
      setVideo(data.contestVideo || []);
    }
    else {
      setName('');
      setDesc('');
      setImage([]);
      setVideo([]);
      setLocation('');
    }
  }, [edit, data]);


  const resetForm = () => {
    setName("");
    setDesc("");
    setImage([]);
    setVideo([]);
    setLocation("");
  };


  // Handle new images by appending them to the existing state
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = [];
    selectedFiles.forEach(file => {
      if (file.size <= 1048576) {
        validFiles.push(file);
        setError("");
      } else {
        setError("Picture size should be less than 1 MB.");
      }
    });
    setImage([...image, ...validFiles]);
  };

  const fd = new FormData();
  fd.append("name", name);
  fd.append("desc", desc);
  fd.append("locationOfContest", location);
  fd.append("areaName", area);
  image?.forEach((img) => {
    fd.append("contestImage", img instanceof File ? img : img.img);
  });

  const additionalFunctions = [handleClose, fetchApi];

  const createHandler = (e) => {
    e.preventDefault();
    createApi({
      url: "api/v1/admin/contests/contestAdd",
      payload: fd,
      setLoading,
      successMsg: "Created",
      additionalFunctions,
    });
    resetForm();
    setError("");
  };


  const updateHandler = (e) => {
    e.preventDefault();
    const fd = {
      name: name,
      desc: desc,
      locationOfContest: location,
      areaName: area
    }

    updateApi({
      url: `api/v1/admin/contests/updateContestContentById/${id}`,
      payload: fd,
      setLoading,
      successMsg: "Updated",
      additionalFunctions,
    });
    resetForm();
    setError("");
  };



  const fetchHandler = () => {
    getApi({
      url: "api/getCitiesWithOutPagination",
      setLoading,
      setResponse: setResponse,
    });
  };

  const fetchHandler1 = () => {
    getApi({
      url: `getAllAreasByCityId/${locationId}`,
      setLoading,
      setResponse: setResponse1,
    });
  };

  useEffect(() => {
    fetchHandler1();
  }, [locationId]);

  useEffect(() => {
    fetchHandler();
  }, []);


  return (
    <Modal show={show} onHide={handleClose} centered>
      <UpdateContestImage
        show={show1}
        handleClose={() => setShow1(false)}
        id={id}
        imgid={imgid}
        fetchApi={fetchApi}
        handleClose1={handleClose}
        img={viewimg}
      />
      <AddContestImage
        show={show2}
        handleClose={() => setShow2(false)}
        id={id}
        fetchApi={fetchApi}
        handleClose1={handleClose}
      />
      <AddContestVideo
        show={show3}
        handleClose={() => setShow3(false)}
        id={id}
        fetchApi={fetchApi}
        handleClose1={handleClose}
      />
      <UpdateContestVideo
        show={show4}
        handleClose={() => setShow4(false)}
        id={id}
        imgid={imgid}
        fetchApi={fetchApi}
        handleClose1={handleClose}
        img={viewimg}
      />
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {edit ? "Edit Contest" : "Add Contest"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={edit ? updateHandler : createHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            {edit ?
              ""
              :
              <>
                <Form.Control
                  type="file"
                  multiple // Allow multiple file selection
                  onChange={handleImageChange}
                />
                {error && <div style={{ color: "red", marginTop: "5px" }}>{error}</div>}
              </>
            }
            <div className="imagePreview" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {image?.map((img, index) => (
                <div key={index} className="imagePreview1">
                  <img
                    src={img instanceof File ? URL.createObjectURL(img) : img.img}
                    alt="Selected"
                    style={{ width: "100px", height: '100px', objectFit: 'cover' }}
                  />
                  <div className="overlay">
                    <div className="overlay-content" onClick={() => {
                      setImageId(img._id);
                      setShow1(true);
                      setViewImage(img.img)
                    }}>
                      <MdEdit color="#ffffff" size={20} />
                      <span>update</span>
                    </div>
                  </div>
                </div>
              ))}
              {edit ?
                <div className="imagePreview2"
                  onClick={() => {
                    setShow2(true);
                  }}>
                  Add Image
                </div>

                :
                ""
              }
            </div>
            <div className="imagePreview" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {video.map((video, index) => (
                <div key={index} className="imagePreview1">
                  <video
                    src={video.video}
                    className="centerImage"
                    controls
                    style={{ width: "100px", height: '100px', objectFit: 'cover' }}
                  />
                  <div className="overlay">
                    <div className="overlay-content" onClick={() => {
                      setImageId(video._id);
                      setShow4(true);
                      setViewImage(video.video);
                    }}>
                      <MdEdit color="#ffffff" size={20} />
                      <span>update</span>
                    </div>
                  </div>
                </div>
              ))}
              {edit && (
                <div className="imagePreview2" onClick={() => setShow3(true)}>
                  Add Video
                </div>
              )}
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Select
              value={location}
              onChange={(e) => {
                const selectedCity = response?.data?.find(city => city?.name === e.target.value);
                setLocationId(selectedCity?._id);
                setLocation(e.target.value);
              }}
            >
              <option>Select City</option>
              {response?.data?.map(city => (
                <option key={city?._id} value={city?.name}>{city?.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Area</Form.Label>
            <Form.Select
              value={area}
              onChange={(e) => {
                const selectedArea = response1?.data?.find(area => area?.name === e.target.value);
                setareaNameId(selectedArea?._id);
                setarea(e.target.value);
              }}
            >
              <option>Select Area</option>
              {response1?.data?.map(area => (
                <option key={area?._id} value={area?.name}>{area?.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </Form.Group>
          <button className="submitBtn" type="submit" disabled={loading}>
            {loading ? <ClipLoader color="#fff" /> : "Submit"}
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
const AddContestImage = ({ show, handleClose, id, fetchApi, handleClose1 }) => {
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resetForm = () => {
    setImage([]); // Clear image after form reset
  };

  // Handle new images by appending them to the existing state
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = [];

    // Check each file size and add to validFiles if within limit
    selectedFiles.forEach(file => {
      if (file.size <= 1048576) { // 1 MB in bytes
        validFiles.push(file);
      } else {
        setError("Picture size should be less than 1 MB.");
      }
    });

    setImage([...image, ...validFiles]);
  };
  // Prepare FormData including all images


  const fd = new FormData();
  image.forEach((img) => {
    fd.append("images", img instanceof File ? img : img.img);
  });

  const additionalFunctions = [handleClose, fetchApi, handleClose1];

  const createHandler = (e) => {
    e.preventDefault();
    if (image.some(img => img.size > 1048576)) {
      setError("One or more images exceed the 1 MB size limit.");
      return;
    }
    createApi({
      url: `api/v1/admin/addNewImageToContest/${id}`,
      payload: fd,
      setLoading,
      successMsg: "Added Image",
      additionalFunctions,
    });
    resetForm();
  };


  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Contest Image
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={createHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              multiple // Allow multiple file selection
              onChange={handleImageChange}
            />
            {error && <div style={{ color: "red", marginTop: "5px" }}>{error}</div>}
            <div className="imagePreview" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {image.map((img, index) => (
                <div key={index} className="imagePreview1">
                  <img
                    src={img instanceof File ? URL.createObjectURL(img) : img.img}
                    alt="Selected"
                    style={{ width: "100px", height: '100px', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </Form.Group>
          <button className="submitBtn" type="submit" disabled={loading}>
            {loading ? <ClipLoader color="#fff" /> : "Add"}
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
const AddContestVideo = ({ show, handleClose, id, fetchApi, handleClose1 }) => {
  const [video, setVideo] = useState([]);
  const [loading, setLoading] = useState(false);


  const resetForm = () => {
    setVideo([]); // Clear image after form reset
  };

  // Handle new images by appending them to the existing state
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setVideo([...video, ...selectedFiles]);
  };
  // Prepare FormData including all images


  const fd = new FormData();
  video.forEach((video) => {
    fd.append("video", video instanceof File ? video : video.video);
  });

  const additionalFunctions = [handleClose, fetchApi, handleClose1];

  const createHandler = (e) => {
    e.preventDefault();
    createApi({
      url: `admin/addNewVideoToContest/${id}`,
      payload: fd,
      setLoading,
      successMsg: "Added Video",
      additionalFunctions,
    });
    resetForm();
  };


  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Contest Video
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={createHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Video</Form.Label>
            <Form.Control
              type="file"
              multiple // Allow multiple file selection
              onChange={handleImageChange}
            />
            <div className="imagePreview" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {video.map((video, index) => (
                <div key={index} className="imagePreview1">
                  <video
                    src={video instanceof File ? URL.createObjectURL(video) : video.video}
                    alt="Selected"
                    controls
                    style={{ width: "100px", height: '100px', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </Form.Group>
          <button className="submitBtn" type="submit" disabled={loading}>
            {loading ? <ClipLoader color="#fff" /> : "Add"}
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
const UpdateContestImage = ({ show, handleClose, id, imgid, fetchApi, handleClose1, img }) => {
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setImage('');
  };

  const additionalFunctions = [handleClose, fetchApi, handleClose1];

  const updateHandler = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("contestImage", image);
    updateApi({
      url: `api/v1/admin/contests/updateContestImageById/${id}/images/${imgid}`,
      payload: fd,
      setLoading,
      successMsg: "Image Updated",
      additionalFunctions,
    });
    if (image && image.size > 1048576) {
      showNotification({ message: "Picture size should be less than 1 MB.", type: "danger" });
      handleClose()
      return;
    }
    resetForm();
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    removeApi({
      url: `deleteContestImageById/${id}/images/${imgid}`,
      successMsg: "Removed Image!",
      additionalFunctions,
    });
    resetForm();
  };
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Image
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={updateHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              // multiple // Allow multiple file selection
              onChange={(e) => setImage(e.target.files[0])}
            />
            <div className="imagePreview" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <div className="imagePreview1">
                <img
                  src={image instanceof File ? URL.createObjectURL(image) : img}
                  alt="Selected"
                  style={{ width: "100%", height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </Form.Group>
          <div style={{ display: 'flex', justifyContent: "space-between" }}>
            <button className="submitBtn" type="submit" disabled={loading}>
              {loading ? <ClipLoader color="#fff" /> : "Submit"}
            </button>
            <button className="submitBtn" onClick={deleteHandler} >
              Delete Image
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
const UpdateContestVideo = ({ show, handleClose, id, imgid, fetchApi, handleClose1, img }) => {
  const [video, setVideo] = useState('');
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setVideo('');
  };

  const additionalFunctions = [handleClose, fetchApi, handleClose1];

  const updateHandler = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("video", video);
    updateApi({
      url: `admin/updateContestVideo/${id}/${imgid}`,
      payload: fd,
      setLoading,
      successMsg: "Video Updated",
      additionalFunctions,
    });
    resetForm();
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    removeApi({
      url: `admin/deleteVideoFromContest/${id}/${imgid}`,
      successMsg: "Removed Video!",
      additionalFunctions,
    });
    resetForm();
  };
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Video
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={updateHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Video</Form.Label>
            <Form.Control
              type="file"
              // multiple // Allow multiple file selection
              onChange={(e) => setVideo(e.target.files[0])}
            />
            <div className="imagePreview" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <div className="imagePreview1">
                <video
                  src={video instanceof File ? URL.createObjectURL(video) : img}
                  alt="Selected"
                  controls
                  style={{ width: "100%", height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </Form.Group>
          <div style={{ display: 'flex', justifyContent: "space-between" }}>
            <button className="submitBtn" type="submit" disabled={loading}>
              {loading ? <ClipLoader color="#fff" /> : "Submit"}
            </button>
            <button className="submitBtn" onClick={deleteHandler} >
              Delete Video
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const CreateAbout = ({ show, handleClose, id, fetchApi, data }) => {
  const [title, setTitle] = useState(data?.title || '');
  const [desc, setDesc] = useState(data?.desc || '');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (data) {
      setTitle(data?.title || "");
      setDesc(data?.desc || "");
    }
  }, [data]);


  const resetForm = () => {
    setTitle("");
    setDesc("");
  };



  const fd = new FormData();
  fd.append("title", title);
  fd.append("desc", desc);

  const additionalFunctions = [handleClose, fetchApi];



  const updateHandler = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", title);
    fd.append("desc", desc);

    updateApi({
      url: `api/v1/static/aboutUs/${id}`,
      payload: fd,
      setLoading,
      successMsg: "Updated",
      additionalFunctions,
    });
    resetForm();
  };



  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit About us
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={updateHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </Form.Group>
          <button className="submitBtn" type="submit" disabled={loading}>
            {loading ? <ClipLoader color="#fff" /> : "Submit"}
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
const CreateTermsConditions = ({ show, handleClose, id, fetchApi, data }) => {
  const [title, setTitle] = useState(data?.title || '');
  const [desc, setDesc] = useState(data?.desc || '');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (data) {
      setTitle(data?.title || "");
      setDesc(data?.desc || "");
    }
  }, [data]);


  const resetForm = () => {
    setTitle("");
    setDesc("");
  };



  const fd = new FormData();
  fd.append("title", title);
  fd.append("desc", desc);

  const additionalFunctions = [handleClose, fetchApi];



  const updateHandler = (e) => {
    e.preventDefault();

    const fd = {
      title: title,
      desc: desc
    }
    updateApi({
      url: `api/v1/static/terms/${id}`,
      payload: fd,
      setLoading,
      successMsg: "Updated",
      additionalFunctions,
    });
    resetForm();
  };



  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Terms & Conditions
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={updateHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </Form.Group>
          <button className="submitBtn" type="submit" disabled={loading}>
            {loading ? <ClipLoader color="#fff" /> : "Submit"}
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const CreateBrand = ({ show, handleClose, edit, id, fetchApi, data }) => {
  const [name, setName] = useState(data?.name || '');
  const [positionnumber, setPositionNumber] = useState(data?.positionNumber || '');
  const [image, setImage] = useState(data?.image || '');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (edit && data) {
      setName(data?.name || "");
      setImage(data.image || "");
      setPositionNumber(data?.positionNumber || '')
    }
    else {
      setName("");
      setImage("");
      setPositionNumber("")
    }
  }, [edit, data]);


  const resetForm = () => {
    setName("");
    setImage("");
    setPositionNumber("")
  };



  const fd = new FormData();
  fd.append("name", name);
  fd.append("image", image);
  fd.append("positionNumber", positionnumber);

  const additionalFunctions = [handleClose, fetchApi];

  const createHandler = (e) => {
    e.preventDefault();
    createApi({
      url: "api/v1/admin/Brand/addBrand",
      payload: fd,
      setLoading,
      successMsg: "Created",
      additionalFunctions,
    });
    resetForm();
  };


  const updateHandler = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", name);
    fd.append("image", image);
    fd.append("positionNumber", positionnumber);

    updateApi({
      url: `api/v1/admin/Brand/updateBrand/${id}`,
      payload: fd,
      setLoading,
      successMsg: "Updated",
      additionalFunctions,
    });
    resetForm();
  };



  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {edit ? "Edit Top Brand" : "Add Top Brand"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={edit ? updateHandler : createHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
            {image && (
              <img
                src={image instanceof File ? URL.createObjectURL(image) : image}
                alt="Selected"
                style={{ width: "100%", height: '300px', marginTop: "10px" }}
              />
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>position Number</Form.Label>
            <Form.Control type="number" value={positionnumber} onChange={(e) => setPositionNumber(e.target.value)} />
          </Form.Group>
          <button className="submitBtn" type="submit" disabled={loading}>
            {loading ? <ClipLoader color="#fff" /> : "Submit"}
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};




const CreateProduct = ({ show, handleClose, edit, id, fetchApi, data }) => {
  const [productImage, setProductImage] = useState(data?.productImage || []);
  const [productVideo, setProductVideo] = useState(data?.productVideo || []);
  const [productName, setProductName] = useState(data?.productName || '');
  const [brandName, setBrandName] = useState(data?.brandName || '');
  const [ids, setIds] = useState(data?.ID || '');
  const [price, setPrice] = useState(data?.originalPrice || '');
  const [discount, setDiscount] = useState(data?.discount || '');
  const [Minimumorder, setMinimumOrder] = useState(data?.minimunOrderUnit || '');
  const [stock, setStock] = useState(data?.stock || '');
  const [stockStatus, setStockStatus] = useState(data?.stockStatus || '');
  const [description, setDescription] = useState(data?.description || '');
  const [returnPolicy, setReturnPolicy] = useState(data?.returnPolicy || '');
  const [categoryid, setCategoryId] = useState(data?.categoryId?._id || '');
  const [categoryName, setCategoryName] = useState(data?.categoryId?.name || '');
  const [subcategoryid, setSubCategoryId] = useState(data?.subcategoryId?._id || '');
  const [subcategoryName, setSubCategoryName] = useState(data?.categoryId?.name || '');
  const [size, setSize] = useState(data?.size || '');
  const [response, setResponse] = useState(null);
  const [response1, setResponse1] = useState(null);
  const [response2, setResponse2] = useState(null);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [imgid, setImageId] = useState('')
  const [viewimg, setViewImage] = useState('')
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {
    if (edit && data) {
      setProductImage(data?.productImage || []);
      setProductVideo(data?.productVideo || []);
      setProductName(data?.productName || '');
      setBrandName(data?.brandName || '');
      setIds(data?.ID || '');
      setPrice(data?.originalPrice || '');
      setDiscount(data?.discount || '');
      setMinimumOrder(data?.minimunOrderUnit || '');
      setStock(data?.stock || '');
      setStockStatus(data?.stockStatus || '');
      setDescription(data?.description || '');
      setReturnPolicy(data?.returnPolicy || '');
      setCategoryId(data?.categoryId?._id || '');
      setCategoryName(data?.categoryId?.name || '');
      setSubCategoryId(data?.subcategoryId?._id || '');
      setSubCategoryName(data?.subcategoryId?.name || '');
      setSize(data?.size || '');
    }
    else {
      setBrandName("");
      setProductName("");
      setIds("");
      setProductImage([]);
      setProductVideo([]);
      setPrice('')
      setDiscount('')
      setMinimumOrder('')
      setStock('')
      setStockStatus('')
      setDescription('')
      setReturnPolicy('')
      setCategoryId('')
      setCategoryName('')
      setSubCategoryId('')
      setSubCategoryName('')
      setSize('')
    }
  }, [edit, data]);

  const resetForm = () => {
    setBrandName("");
    setProductName("");
    setIds("");
    setProductImage([]);
    setProductVideo([]);
    setPrice('')
    setDiscount('')
    setMinimumOrder('')
    setStock('')
    setStockStatus('')
    setDescription('')
    setReturnPolicy('')
    setCategoryId('')
    setCategoryName('')
    setSubCategoryId('')
    setSubCategoryName('')
    setSize('')
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = [];
    selectedFiles.forEach(file => {
      if (file.size <= 1048576) {
        validFiles.push(file);
        setError("");
      } else {
        setError("Picture size should be less than 1 MB.");
      }
    });
    setProductImage([...productImage, ...validFiles]);
  };

  // Prepare FormData including all images


  const fd = new FormData();
  productImage.forEach((img) => {
    fd.append("productImage", img instanceof File ? img : img.img);
  });
  // fd.append("image", productImage);
  fd.append("categoryId", categoryid);
  fd.append("subCategoryId", subcategoryid);
  fd.append("brandName", brandName);
  fd.append("originalPrice", price);
  fd.append("discount", discount);
  fd.append("productName", productName);
  fd.append("minimunOrderUnit", Minimumorder);
  fd.append("stock", stock);
  fd.append("stockStatus", stockStatus);
  fd.append("description", description);
  fd.append("returnPolicy", returnPolicy);
  fd.append("size", size);


  const additionalFunctions = [handleClose, fetchApi];

  const createHandler = (e) => {
    e.preventDefault();
    createApi({
      url: "api/v1/admin/addProduct",
      payload: fd,
      setLoading,
      successMsg: "Created",
      additionalFunctions
    });
    resetForm();
    setError("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    updateApi({
      url: `updateProduct/${id}`,
      payload: fd,
      setLoading,
      successMsg: "Updated",
      additionalFunctions,
    });
    resetForm();
    setError("");
  };


  const fetchHandler = () => {
    getApi({
      url: "api/v1/Category/allCategory",
      setLoading,
      setResponse: setResponse,
    });
  };

  const fetchHandler1 = () => {
    getApi({
      url: `api/v1/SubCategory/allSubcategoryById/${categoryid}`,
      setLoading,
      setResponse: setResponse1,
    });
  };



  useEffect(() => {
    fetchHandler1();
  }, [categoryid]);

  const fetchHandler2 = () => {
    getApi({
      url: "api/v1/admin/Brand/allBrand",
      setLoading,
      setResponse: setResponse2,
    });
  };

  useEffect(() => {
    fetchHandler();
    fetchHandler2()
  }, []);




  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <UpdateProductImage
        show={show1}
        handleClose={() => setShow1(false)}
        id={id}
        imgid={imgid}
        fetchApi={fetchApi}
        handleClose1={handleClose}
        img={viewimg}
      />
      <AddProductImage
        show={show2}
        handleClose={() => setShow2(false)}
        id={id}
        fetchApi={fetchApi}
        handleClose1={handleClose}
      />
      <AddProductVideo
        show={show3}
        handleClose={() => setShow3(false)}
        id={id}
        fetchApi={fetchApi}
        handleClose1={handleClose}
      />
      <UpdateProductVideo
        show={show4}
        handleClose={() => setShow4(false)}
        id={id}
        imgid={imgid}
        fetchApi={fetchApi}
        handleClose1={handleClose}
        img={viewimg}
      />
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {edit ? "Edit Product" : "Add Product"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={edit ? updateHandler : createHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            {edit ?
              ""
              :
              <>
                <Form.Control
                  type="file"
                  multiple
                  onChange={handleImageChange}
                />
                {error && <div style={{ color: "red", marginTop: "5px" }}>{error}</div>}
              </>
            }
            <div className="imagePreview" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {productImage.map((img, index) => (
                <div key={index} className="imagePreview1">
                  <img
                    src={img instanceof File ? URL.createObjectURL(img) : img.img}
                    alt="Selected"
                    style={{ width: "100px", height: '100px', objectFit: 'cover' }}
                  />
                  <div className="overlay">
                    <div className="overlay-content" onClick={() => {
                      setImageId(img._id);
                      setShow1(true);
                      setViewImage(img.img)
                    }}>
                      <MdEdit color="#ffffff" size={20} />
                      <span>update</span>
                    </div>
                  </div>
                </div>
              ))}
              {edit ?
                <div className="imagePreview2"
                  onClick={() => {
                    setShow2(true);
                  }}>
                  Add Image
                </div>

                :
                ""
              }
            </div>
            <div className="imagePreview" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {productVideo.map((video, index) => (
                <div key={index} className="imagePreview1">
                  <video
                    src={video.video}
                    className="centerImage"
                    controls
                    style={{ width: "100px", height: '100px', objectFit: 'cover' }}
                  />
                  <div className="overlay">
                    <div className="overlay-content" onClick={() => {
                      setImageId(video._id);
                      setShow4(true);
                      setViewImage(video.video);
                    }}>
                      <MdEdit color="#ffffff" size={20} />
                      <span>update</span>
                    </div>
                  </div>
                </div>
              ))}
              {/* {edit && (
                <div className="imagePreview2" onClick={() => setShow3(true)}>
                  Add Video
                </div>
              )} */}
            </div>
          </Form.Group>
          <Row>
            <Col xs={12} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Top Seller Name</Form.Label>
                <Form.Select
                  value={brandName}
                  onChange={(e) => {
                    const selectedBrand = response2?.data?.find(brand => brand?.name === e.target.value);
                    // setCategoryId(selectedCategory?._id);
                    setBrandName(e.target.value);
                  }}
                >
                  <option>Select Top Seller</option>
                  {response2?.data?.map(brand => (
                    <option key={brand?._id} value={brand?.name}>{brand?.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Unit of Measurement</Form.Label>
                <Form.Select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                >
                  <option value="">Select Unit</option>
                  <option value="per_1000">Per 1000 Units</option>
                  <option value="per_sqft">Per sq.ft</option>
                  <option value="per_kg">Per kg</option>
                  <option value="per_piece">Per Piece</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" min={0} value={price} onChange={(e) => setPrice(e.target.value)} />
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Discount</Form.Label>
                <Form.Control type="text" value={discount} onChange={(e) => setDiscount(e.target.value)} />
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Stock</Form.Label>
                <Form.Control type="text" value={stock} onChange={(e) => setStock(e.target.value)} />
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Stock Status</Form.Label>
                <Form.Select
                  value={stockStatus}
                  onChange={(e) => setStockStatus(e.target.value)}
                >
                  <option value="Select">Select Status</option>
                  <option value="OUTOFSTOCK">OUTOFSTOCK</option>
                  <option value="LOW">LOW</option>
                  <option value="ADEQUATE">ADEQUATE</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Minimum Order Quantity</Form.Label>
                <Form.Control type="number" min={0} value={Minimumorder} onChange={(e) => setMinimumOrder(e.target.value)} />
              </Form.Group>
            </Col>

            <Col xs={12} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={categoryName}
                  onChange={(e) => {
                    const selectedCategory = response?.data?.find(category => category?.name === e.target.value);
                    setCategoryId(selectedCategory?._id);
                    setCategoryName(e.target.value);
                  }}
                >
                  <option>Select Category</option>
                  {response?.data?.map(category => (
                    <option key={category?._id} value={category?.name}>{category?.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Sub-category</Form.Label>
                <Form.Select
                  value={subcategoryName}
                  onChange={(e) => {
                    const selectedSubCategory = response1?.data?.find(subcategory => subcategory?.name === e.target.value);
                    setSubCategoryId(selectedSubCategory?._id);
                    setSubCategoryName(e.target.value);
                  }}
                >
                  <option>Select Sub Category</option>
                  {response1?.data?.map(subcategory => (
                    <option key={subcategory?._id} value={subcategory?.name}>{subcategory?.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <FloatingLabel>
                  <Form.Control as="textarea" style={{ height: "100px" }} value={description} onChange={(e) => setDescription(e.target.value)} />
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col xs={12} md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Return Policy</Form.Label>
                <FloatingLabel>
                  <Form.Control as="textarea" style={{ height: "100px" }} value={returnPolicy} onChange={(e) => setReturnPolicy(e.target.value)} />
                </FloatingLabel>
              </Form.Group>
            </Col>
          </Row>
          <button className="submitBtn" type="submit" disabled={loading}>
            {loading ? <ClipLoader color="#fff" /> : "Submit"}
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
const AddProductImage = ({ show, handleClose, id, fetchApi, handleClose1 }) => {
  const [productImage, setProductImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const resetForm = () => {
    setProductImage([]); // Clear image after form reset
  };

  // Handle new images by appending them to the existing state
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = [];

    // Check each file size and add to validFiles if within limit
    selectedFiles.forEach(file => {
      if (file.size <= 1048576) { // 1 MB in bytes
        validFiles.push(file);
      } else {
        setError("Picture size should be less than 1 MB.");
      }
    });

    setProductImage([...productImage, ...validFiles]);
  };

  // Prepare FormData including all images


  const fd = new FormData();
  productImage.forEach((img) => {
    fd.append("productImages", img instanceof File ? img : img.img);
  });

  const additionalFunctions = [handleClose, fetchApi, handleClose1];

  const createHandler = (e) => {
    e.preventDefault();
    updateApi({
      url: `addProductImage/${id}`,
      payload: fd,
      setLoading,
      successMsg: "Added Image",
      additionalFunctions,
    });
    resetForm();
    resetForm();
  };


  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Product Image
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={createHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              multiple // Allow multiple file selection
              onChange={handleImageChange}
            />
            {error && <div style={{ color: "red", marginTop: "5px" }}>{error}</div>}
            <div className="imagePreview" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {productImage.map((img, index) => (
                <div key={index} className="imagePreview1">
                  <img
                    src={img instanceof File ? URL.createObjectURL(img) : img.img}
                    alt="Selected"
                    style={{ width: "100px", height: '100px', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </Form.Group>
          <button className="submitBtn" type="submit" disabled={loading}>
            {loading ? <ClipLoader color="#fff" /> : "Add"}
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
const AddProductVideo = ({ show, handleClose, id, fetchApi, handleClose1 }) => {
  const [productVideo, setProductVideo] = useState([]);
  const [loading, setLoading] = useState(false);


  const resetForm = () => {
    setProductVideo([]); // Clear image after form reset
  };

  // Handle new images by appending them to the existing state
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setProductVideo([...productVideo, ...selectedFiles]);
  };

  // Prepare FormData including all images


  const fd = new FormData();
  productVideo.forEach((video) => {
    fd.append("video", video instanceof File ? video : video.video);
  });
  const additionalFunctions = [handleClose, fetchApi, handleClose1];

  const createHandler = (e) => {
    e.preventDefault();
    createApi({
      url: `api/addNewVideoToProduct/${id}`,
      payload: fd,
      setLoading,
      successMsg: "Added Video",
      additionalFunctions,
    });
    resetForm();
  };


  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Product Video
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={createHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Video</Form.Label>
            <Form.Control
              type="file"
              multiple // Allow multiple file selection
              onChange={handleImageChange}
            />
            <div className="imagePreview" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {productVideo.map((video, index) => (
                <div key={index} className="imagePreview1">
                  <video
                    src={video instanceof File ? URL.createObjectURL(video) : video.video}
                    alt="Selected"
                    controls
                    style={{ width: "100px", height: '100px', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </Form.Group>
          <button className="submitBtn" type="submit" disabled={loading}>
            {loading ? <ClipLoader color="#fff" /> : "Add"}
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const UpdateProductImage = ({ show, handleClose, id, imgid, fetchApi, handleClose1, img }) => {
  const [productImage, setProductImage] = useState('');
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setProductImage('');
  };

  const additionalFunctions = [handleClose, fetchApi, handleClose1];

  const updateHandler = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("productImage", productImage);
    updateApi({
      url: `updateProductImage/${id}/${imgid}`,
      payload: fd,
      setLoading,
      successMsg: "Video Updated",
      additionalFunctions,
    });
    if (productImage && productImage.size > 1048576) {
      showNotification({ message: "Picture size should be less than 1 MB.", type: "danger" });
      handleClose()
      return;
    }
    resetForm();
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    removeApi({
      url: `deleteProductImage/${id}/${imgid}`,
      successMsg: "Removed Video!",
      additionalFunctions,
    });
    resetForm();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Image
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={updateHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              // multiple // Allow multiple file selection
              onChange={(e) => setProductImage(e.target.files[0])}
            />
            <div className="imagePreview" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <div className="imagePreview1">
                <img
                  src={productImage instanceof File ? URL.createObjectURL(productImage) : img}
                  alt="Selected"
                  style={{ width: "100%", height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </Form.Group>
          <div style={{ display: 'flex', justifyContent: "space-between" }}>
            <button className="submitBtn" type="submit" disabled={loading}>
              {loading ? <ClipLoader color="#fff" /> : "Submit"}
            </button>
            <button className="submitBtn" onClick={deleteHandler} >
              Delete Image
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
const UpdateProductVideo = ({ show, handleClose, id, imgid, fetchApi, handleClose1, img }) => {
  const [productVideo, setProductVideo] = useState([]);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setProductVideo('');
  };

  const additionalFunctions = [handleClose, fetchApi, handleClose1];

  const updateHandler = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("video", productVideo);
    updateApi({
      url: `api/updateProductVideo/${id}/${imgid}`,
      payload: fd,
      setLoading,
      successMsg: "Image Updated",
      additionalFunctions,
    });
    resetForm();
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    removeApi({
      url: `api/deleteVideoFromProduct/${id}/${imgid}`,
      successMsg: "Removed Image!",
      additionalFunctions,
    });
    resetForm();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Video
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={updateHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Video</Form.Label>
            <Form.Control
              type="file"
              // multiple // Allow multiple file selection
              onChange={(e) => setProductVideo(e.target.files[0])}
            />
            <div className="imagePreview" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <div className="imagePreview1">
                <video
                  src={productVideo instanceof File ? URL.createObjectURL(productVideo) : img}
                  alt="Selected"
                  controls
                  style={{ width: "100%", height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </Form.Group>
          <div style={{ display: 'flex', justifyContent: "space-between" }}>
            <button className="submitBtn" type="submit" disabled={loading}>
              {loading ? <ClipLoader color="#fff" /> : "Submit"}
            </button>
            <button className="submitBtn" onClick={deleteHandler} >
              Delete Video
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};


const ProductStatus = ({ show, handleClose, id, fetchApi }) => {
  const [status1, setStatus1] = useState(false);
  const [status2, setStatus2] = useState(false);
  const [loading, setLoading] = useState(false);


  const data = {
    productShowInIndemand: status1,
    productShowInNewArrival: status2,
  }

  const additionalFunctions = [handleClose, fetchApi];


  const updateHandler = (e) => {
    e.preventDefault();
    updateApi({
      url: `admin/updateProductShowIn/${id}`,
      payload: data,
      setLoading,
      successMsg: "Updated",
      additionalFunctions,
    });
  };
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Change Product Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={updateHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Product Show In demand</Form.Label>
            <Form.Select
              value={status1}
              onChange={(e) => setStatus1(e.target.value)}
            >
              <option value=''>Select your preference</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Product Show In New Arrival</Form.Label>
            <Form.Select
              value={status2}
              onChange={(e) => setStatus2(e.target.value)}
            >
              <option value=''>Select your preference</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Form.Select>
          </Form.Group>
          <button className="submitBtn" type="submit" disabled={loading}>
            {loading ? <ClipLoader color="#fff" /> : "Submit"}
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};


const CreateArea = ({ show, handleClose, edit, id, fetchApi, data }) => {
  const [name, setName] = useState(data?.name || '');
  const [cityId, setCityId] = useState(data?.cityId || '');
  const [cityName, setCityName] = useState(data?.cityId?.name || '');
  const [loading, setLoading] = useState(false);
  const [stateName, setStateName] = useState('');
  const [stateId, setStateId] = useState(data?.cityId?.stateCode || '');
  const [response, setResponse] = useState(null);
  const [response1, setResponse1] = useState(null);

  useEffect(() => {
    if (edit && data) {
      setName(data?.name || "");
      setCityId(data.cityId || "");
    }
    else {
      setName("");
      setCityId("");
    }
  }, [edit, data]);


  const resetForm = () => {
    setName("");
    setCityId("");
  };


  const fd = {
    name: name,
    cityId: cityId
  }





  const additionalFunctions = [handleClose, fetchApi];

  const createHandler = (e) => {
    e.preventDefault();
    createApi({
      url: "api/v1/admin/area/addAreas",
      payload: fd,
      setLoading,
      successMsg: "Created",
      additionalFunctions,
    });
    resetForm();
  };


  const updateHandler = (e) => {
    e.preventDefault();
    const fd = {
      name: name,
      cityId: cityId
    }

    updateApi({
      url: `api/v1/admin/area/get/updateArea/${id}`,
      payload: fd,
      setLoading,
      successMsg: "Updated",
      additionalFunctions,
    });
    resetForm();
  };


  const fetchHandler = () => {
    const maxLimit = 36; // Set this to the total number of states you want to fetch
    getApi({
      url: `api/v1/admin/states/getAllStates?limit=${maxLimit}`,
      setLoading,
      setResponse: setResponse,
    });
  };


  const fetchHandler1 = () => {
    getApi({
      url: `api/v1/admin/getCitiesByStateCode/${stateId}`,
      setLoading,
      setResponse: setResponse1,
    });
  };



  useEffect(() => {
    fetchHandler1();
  }, [stateId]);

  useEffect(() => {
    fetchHandler();
  }, []);


  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {edit ? "Edit Area" : "Add Area"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={edit ? updateHandler : createHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Area Name</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>State</Form.Label>
            <Form.Select
              value={stateName}
              onChange={(e) => {
                const selectedState = response?.data?.find(state => state?.name === e.target.value);
                setStateId(selectedState?.isoCode);
                setStateName(e.target.value);
              }}
            >
              <option>Select State</option>
              {response?.data?.map(state => (
                <option key={state?._id} value={state?.name}>{state?.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Select
              value={cityName}
              onChange={(e) => {
                const selectedCity = response1?.cities?.find(city => city?.name === e.target.value);
                setCityId(selectedCity?._id);
                setCityName(e.target.value);
              }}
            >
              <option>Select City</option>
              {response1?.cities?.map(city => (
                <option key={city?._id} value={city?.name}>{city?.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <button className="submitBtn" type="submit" disabled={loading}>
            {loading ? <ClipLoader color="#fff" /> : "Submit"}
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};


export {
  CreateBanner,
  CreateCategory,
  EditVendorStatus,
  CreateSubCategory,
  CreateNotification,
  CreateSubscription,
  CreateFaq,
  CreateAdminStore,
  CreateBlog,
  CreateEvent,
  CreateContes,
  CreateAbout,
  CreateBrand,
  EditReview,
  CreateType,
  CreateTermsConditions,
  CreateProduct,
  CreateSubscriptionDiscount,
  ProductStatus,
  CreateArea,
  CreateSubType,
  AddBlogVideo
};
