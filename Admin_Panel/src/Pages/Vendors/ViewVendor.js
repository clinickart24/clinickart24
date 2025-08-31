/** @format */
import HOC from "../../Layout/HOC";
import { Form, FloatingLabel, InputGroup } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { getApi } from "../../Repository/Repository";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TableLayout from "../../Component/TableLayout";



const ViewVendor = () => {
  const { ids } = useParams();
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchHandler = () => {
    getApi({
      url: `api/v1/admin/getVenderProfile/${ids}`,
      setResponse,
      setLoading,
    });
  };

  useEffect(() => {
    fetchHandler();
  }, []);


  const thead = [
    "Sno.",
    "Store Name",
    "City",
    "Country",
    "Phone Number",
    "Email",
    "",
  ];


  const tbody = response?.data?.stores?.map((i, index) => [
    `#${index + 1}`,
    i?.StoreName,
    i?.city,
    i?.country,
    i?.vendorMobile,
    i?.email,
    <span className="flexCont">
      <Link to={`/view-vendor-store/${i._id}`}>
        <i className="fa-solid fa-eye" />
      </Link>
    </span>,
  ]);

  const expDate = response?.data?.planExpiration?.slice(0, 10)



  return (
    <>
      <section className="sectionCont">
        <Form>
          <h3>Basic Details</h3>
          <hr />
          <div className="vendor-profile-div">
            <img
              src={response?.data?.stores?.[0]?.storeLogo}
              alt=""
              className="profile-img"
            />
          </div>

          <Row>
            <Col xs={12} md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Vendor Name</Form.Label>
                <Form.Control type="text" value={response?.data?.stores?.[0]?.StoreName} />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" value={response?.data?.phone} />
              </Form.Group>
            </Col>

            <Col xs={12} md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" value={response?.data?.email} />
              </Form.Group>
            </Col>

            <Col xs={12} md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Vendor Acceptance Status</Form.Label>
                <Form.Control type="text" value={response?.data?.kycStatus} />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Control type="text" value={response?.data?.status} />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                {response?.data?.allIndiaCity ? (
                  <p>All India</p>
                ) : (
                  <ul>
                    {response?.data?.cities?.map((city) => (
                      <li key={city._id}>{city?.name}</li>
                    ))}
                  </ul>
                )}
              </Form.Group>
            </Col>

            <Col xs={12} md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Plan Name</Form.Label>
                <Form.Control type="text" value={response?.data?.planBuyId?.planName} />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Plan Type</Form.Label>
                <Form.Control type="text" value={response?.data?.planBuyId?.planType} />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Plan Price</Form.Label>
                <Form.Control type="text" value={response?.data?.planBuyId?.amount} />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Plan Expiration</Form.Label>
                <Form.Control
                  type="text"
                  value={expDate}
                />
              </Form.Group>
            </Col>
          </Row>
          <Col xs={12} md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <ul>
                {response?.data?.categoryId?.map((category) => (
                  <li key={category._id}>{category.name}</li>
                ))}
              </ul>,
            </Form.Group>
          </Col>
        </Form>
      </section>
      <section className="sectionCont">
        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold"
            style={{ fontSize: "1.5rem" }}
          >
            All Store's ({response?.data?.stores?.length || 0})
          </span>
          <button className="submitBtn" onClick={() => navigate('/vendors')}>
            back
          </button>
        </div>
        <TableLayout thead={thead} tbody={tbody} loading={loading} />
      </section>
    </>
  );
};

export default HOC(ViewVendor);
