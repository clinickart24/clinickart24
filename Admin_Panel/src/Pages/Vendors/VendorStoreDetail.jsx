/** @format */
import HOC from "../../Layout/HOC";
import { Form, FloatingLabel, InputGroup } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { getApi } from "../../Repository/Repository";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";



const VendorStoreDetail = () => {
    const { ids } = useParams();
    const [response, setResponse] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchHandler = () => {
        getApi({
            url: `api/v1/admin/getAdminStoreByIdVendor/${ids}`,
            setResponse,
            setLoading,
        });
    };

    useEffect(() => {
        fetchHandler();
    }, []);


    const [openingHours, setOpeningHours] = useState(response?.data?.openingHours || {});

    useEffect(() => {
        if (response?.data?.openingHours) {
            setOpeningHours(response?.data.openingHours);
        }
    }, [response?.data]);



    // Function to handle checkbox change
    const handleCheckboxChange = (day) => {
        setOpeningHours((prevHours) => ({
            ...prevHours,
            [day]: {
                ...prevHours[day],
                open: !prevHours[day].open, // Toggle the open state
            },
        }));
    };



    return (
        <>
            <button className="submitBtn" onClick={() => navigate(-1)} style={{ marginBottom: "30px" }}>
                back
            </button>
            <section className="sectionCont">
                <Form>
                    <h3>Basic Details</h3>
                    <hr />
                    <Row>
                        <Col xs={12} md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Store name</Form.Label>
                                <Form.Control type="text" value={response?.data?.StoreName} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Owner's Full Name</Form.Label>
                                <Form.Control type="text" value={response?.data?.ownerName} />
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control type="text" value={response?.data?.vendorMobile} />
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" value={response?.data?.email} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Bio </Form.Label>
                                <Form.Control as="textarea" value={response?.data?.bio} />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </section>


            <section className="sectionCont mt-3">
                <h3>Working Days</h3>
                <hr />
                <Form>
                    <Row>
                        <Col xs={12} md={12}>
                            <Form.Group className="mb-3">
                                <div className="d-flex gap-2 flex-wrap">
                                    {openingHours && Object.entries(openingHours).map(([day, { open }]) => (
                                        <Form.Check
                                            key={day}
                                            type={"checkbox"}
                                            label={day.charAt(0).toUpperCase() + day.slice(1)}
                                            checked={open}
                                            onChange={() => handleCheckboxChange(day)}
                                        />
                                    ))}
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </section>

            {/* <section className="sectionCont mt-3">
                <h3>Opening & Closing Time</h3>
                <hr />
                <Form>
                    <Row>
                        <Col xs={12} md={12}>
                            <InputGroup>
                                <InputGroup.Radio />
                                <Form.Control
                                    value="I open and close my restaurant at the same time on all working days"
                                    checked={true}
                                />
                            </InputGroup>
                        </Col>
                        <Col xs={12} md={12}>
                            <InputGroup className="mt-3">
                                <InputGroup.Radio />
                                <Form.Control value="Seperate day wise timing" checked={true} />
                            </InputGroup>
                        </Col>
                    </Row>
                </Form>
            </section> */}

            <section className="sectionCont mt-3">
                <h3>Address Details</h3>
                <hr />
                <Row>
                    <Col xs={12} md={3}>
                        <Form.Group className="mb-3">
                            <Form.Label>Shop/Plot no</Form.Label>
                            <Form.Control type="text" value={response?.data?.shopNumber} />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={3}>
                        <Form.Group className="mb-3">
                            <Form.Label>Floor</Form.Label>
                            <Form.Control type="text" value={response?.data?.floor} />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={3}>
                        <Form.Group className="mb-3">
                            <Form.Label>Builing/Mail/Complex Name</Form.Label>
                            <Form.Control type="text" value={response?.data?.complexName} />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={3}>
                        <Form.Group className="mb-3">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" value={response?.data?.city} />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={3}>
                        <Form.Group className="mb-3">
                            <Form.Label>State</Form.Label>
                            <Form.Control type="text" value={response?.data?.state} />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={3}>
                        <Form.Group className="mb-3">
                            <Form.Label>Country</Form.Label>
                            <Form.Control type="text" value={response?.data?.country} />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={3}>
                        <Form.Group className="mb-3">
                            <Form.Label>Zipcode</Form.Label>
                            <Form.Control type="text" value={response?.data?.zipCode} />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={3}>
                        <Form.Group className="mb-3">
                            <Form.Label>Area</Form.Label>
                            <Form.Control type="text" value={response?.data?.shopNumber} />
                        </Form.Group>
                    </Col>
                </Row>
            </section>

            <section className="sectionCont mt-3">
                <h3>Bank Account Details</h3>
                <hr />
                <Row>
                    <Col xs={12} md={3}>
                        <Form.Group className="mb-3">
                            <Form.Label>Bank Name</Form.Label>
                            <Form.Control type="text" value={response?.data?.bankName} />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={3}>
                        <Form.Group className="mb-3">
                            <Form.Label>Account Holder Name</Form.Label>
                            <Form.Control type="text" value={response?.data?.accountHolderName} />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={3}>
                        <Form.Group className="mb-3">
                            <Form.Label>Account Number</Form.Label>
                            <Form.Control type="text" value={response?.data?.accountNumber} />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={3}>
                        <Form.Group className="mb-3">
                            <Form.Label>IFSC Code</Form.Label>
                            <Form.Control type="text" value={response?.data?.ifscCode} />
                        </Form.Group>
                    </Col>
                </Row>
            </section>

            <section className="sectionCont mt-3">
                <h3>Store Photos Details</h3>
                <hr />

                <div className="aadhar-images">
                    {response?.data?.storePhotos?.map((img, index) => (
                        <img
                            src={img}
                            alt=""
                        />
                    ))}
                </div>
            </section>

            <section className="sectionCont mt-3">
                <h3>Aadhar Card Details</h3>
                <hr />
                <div className="aadhar-images">
                    <img
                        src={response?.data?.aadharFrontPhoto}
                        alt=""
                    />
                    <img
                        src={response?.data?.aadharBackPhoto}
                        alt=""
                    />
                </div>
            </section>

            <section className="sectionCont mt-3">
                <h3>PAN Card Details</h3>
                <hr />
                <div className="aadhar-images">
                    <img
                        src={response?.data?.panCardPhoto}
                        alt=""
                    />
                </div>
            </section>

            <section className="sectionCont mt-3">
                <h3>Driving License Details</h3>
                <hr />
                <div className="aadhar-images">
                    <img
                        src={response?.data?.dlFrontPhoto}
                        alt=""
                    />
                    <img
                        src={response?.data?.aadharBackPhoto}
                        alt=""
                    />
                </div>
            </section>

            {/* <section className="sectionCont mt-3">
                <h4>Subscription Plan</h4>
                <hr />
                <Row>
                    <Col xs={12} md={3}>
                        <Form.Group className="mb-3">
                            <Form.Label>Plan</Form.Label>
                            <Form.Control type="text" value={"Advance"} />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={3}>
                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="text" value={"500"} />
                        </Form.Group>
                    </Col>

                </Row>
            </section> */}
        </>
    );
};

export default HOC(VendorStoreDetail);
