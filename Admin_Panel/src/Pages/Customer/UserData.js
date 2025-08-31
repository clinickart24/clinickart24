/** @format */
import HOC from "../../Layout/HOC";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getApi } from "../../Repository/Repository";
import TableLayout from "../../Component/TableLayout";


const UserData = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [response, setResponse] = useState({});
  const [response1, setResponse1] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchHandler = () => {
    getApi({
      url: `api/v1/admin/viewUser/${id}`,
      setResponse,
      setLoading,
    });
  };
  const fetchHandler1 = () => {
    getApi({
      url: `api/v1/admin/getWishlistByUserId/${id}`,
      setResponse: setResponse1,
      setLoading,
    });
  };

  useEffect(() => {
    fetchHandler();
    fetchHandler1();
  }, [id]);

  const thead = [
    "Sno.",
    "ID",
    "Category Name",
    // "Category Type",
    "SubCategory",
    "Product Name",
    "Stock Status",
    "Action"
  ];

  const tbody = response1?.wishlist?.flatMap((wishlistItem, index) =>
    wishlistItem?.products?.map((product, productIndex) => [
      `#${index + 1}-${productIndex + 1}`, // Unique index for each product
      product.ID,
      product.categoryId?.name,
      // product.categoryId?.gender,
      product.categoryId?.name, // Fetching subcategory name
      product.productName, // Fetching product name
      product.stockStatus, // Fetching stock status
      <span className="flexCont">
        <Link to={`/product/${product._id}`}>
          <i className="fa-solid fa-eye" />
        </Link>
      </span>,
    ])
  );



  console.log(response1?.wishlist?.products, "hajhd");
  return (
    <>
      <section className="sectionCont">
        <div className="img-cont mb-3">
          <img
            src={response?.data?.image}
            alt=""
            className="centerImage"
          />
        </div>
        <Row>
          <Col xs={12} md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" value={response?.data?.userName} disabled />
            </Form.Group>
          </Col>
          <Col xs={12} md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control type="text" value={response?.data?.phone} disabled />
            </Form.Group>
          </Col>
          <Col xs={12} md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="text" value={response?.data?.email} disabled />
            </Form.Group>
          </Col>
          <Col xs={12} md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control type="text" value={response?.data?.status} disabled />
            </Form.Group>
          </Col>
          <Col xs={12} md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" value={response?.data?.city} disabled />
            </Form.Group>
          </Col>
          <Col xs={12} md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Shipping Address</Form.Label>
              <Form.Control type="text" value={response?.data?.city} disabled />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="dark" onClick={() => navigate(-1)}>
          Back
        </Button>
      </section>
      <section className="sectionCont">
        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold"
            style={{ fontSize: "1.5rem" }}
          >
            All Wishlist Product's ({response?.wishlist?.products?.length || 0})
          </span>
          <button className="submitBtn" onClick={() => navigate(-1)}>
            back
          </button>
        </div>
        <TableLayout thead={thead} tbody={tbody} loading={loading} />
      </section>
    </>
  );
};

export default HOC(UserData);
