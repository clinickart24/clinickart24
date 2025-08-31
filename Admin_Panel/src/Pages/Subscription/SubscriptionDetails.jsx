/** @format */
import HOC from "../../Layout/HOC";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Row, Col, FloatingLabel } from "react-bootstrap";
import BreadCrumb from "../../Component/BreadCrumb";
import { useEffect, useState } from "react";
import { createApi, getApi } from "../../Repository/Repository";
import { CreateSubscriptionDiscount } from "../../Component/Modals/Modals";

const SubscriptionDetails = () => {

    const [response, setResponse] = useState({});
    const [modalShow, setModalShow] = useState(false);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const [subscriptionData, setSubscriptionData] = useState({
        features: {
            monthlyData: [],
            quarterlyData: [],
            halfYearlyData: [],
            yearlyData: []
        }
    });


    const { id } = useParams()


    const fetchHandler = () => {
        getApi({
            url: `api/v1/admin/Plans/ById/${id}`,
            setResponse,
            setLoading,
        });
    };

    useEffect(() => {
        fetchHandler();
    }, []);

    useEffect(() => {
        if (response) {
            setSubscriptionData({
                features: {
                    monthlyData: response?.data?.monthlyData || [],
                    quarterlyData: response?.data?.quarterlyData || [],
                    halfYearlyData: response?.data?.halfYearlyData || [],
                    yearlyData: response?.data?.yearlyData || []
                }
            });
            setName(response?.data?.name)
        }
    }, [response]);

    return (
        <>
            <CreateSubscriptionDiscount
                show={modalShow}
                handleClose={() => setModalShow(false)}
                name={name}
                fetchApi={fetchHandler}
            />
            <section className="sectionCont">
                <div className="w-100 d-flex justify-content-between">
                    <BreadCrumb title={"Subscription details"} backtitle={"All Subscription's"} link={'subscription'} />
                    <Button variant="success" onClick={() => {
                        setModalShow(true);
                    }}>
                        Add Discount
                    </Button>
                </div>
                <Form>
                    <Row>
                        <Col xs={12} md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Subscription Name</Form.Label>
                                <Form.Control type="text" value={response?.data?.name} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Monthly Price</Form.Label>
                                <Form.Control type="number" value={response?.data?.monthly} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Quarterly Price</Form.Label>
                                <Form.Control type="number" value={response?.data?.quarterly} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>HalfYearly Price</Form.Label>
                                <Form.Control type="number" value={response?.data?.halfYearly} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Yearly Price</Form.Label>
                                <Form.Control type="number" value={response?.data?.yearly} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Monthly Discount</Form.Label>
                                <Form.Control type="text" value={response?.data?.monthlyDiscount} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Quarterly Discount</Form.Label>
                                <Form.Control type="text" value={response?.data?.quarterlyDiscount} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>HalfYearly Discount</Form.Label>
                                <Form.Control type="text" value={response?.data?.halfYearlyDiscount} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Yearly Discount</Form.Label>
                                <Form.Control type="text" value={response?.data?.yearlyDiscount} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Monthly Discounted Price</Form.Label>
                                <Form.Control type="text" value={response?.data?.discountedMonthlyPrice} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Quarterly Discounted Price</Form.Label>
                                <Form.Control type="text" value={response?.data?.discountedQuarterlyPrice} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>HalfYearly Discounted Price</Form.Label>
                                <Form.Control type="text" value={response?.data?.discountedHalfYearlyPrice} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Yearly Discounted Price</Form.Label>
                                <Form.Control type="text" value={response?.data?.discountedYearlyPrice} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Is Show Home Screen</Form.Label>
                                <Form.Control type="text" value={response?.data?.isShowHomeScreen ?"Yes" : "No"} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Is Show Sales Screen</Form.Label>
                                <Form.Control type="text" value={response?.data?.isShowSalesScreen  ?"Yes" : "No"} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Is Show Order Screen</Form.Label>
                                <Form.Control type="text" value={response?.data?.isShowOrderScreen  ?"Yes" : "No"} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <div>
                        {loading && <p>Loading...</p>}
                        {!loading && (
                            <div>
                                {['monthlyData', 'quarterlyData', 'halfYearlyData', 'yearlyData'].map((period) => (
                                    <div key={period}>
                                        <h5>{period.replace('Data', '')} Features</h5>
                                        {/* Render each feature for the current period */}
                                        {subscriptionData.features[period]?.map((feature, index) => (
                                            <div key={feature._id} className="feature-item">
                                                {/* <span>{feature.features} - {feature.count}</span> */}
                                                <ul>
                                                    <li>{feature.features}</li>
                                                </ul>
                                                <ul>
                                                    <li>{feature.count}</li>
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="w-100 d-flex justify-content-between">
                        {/* <Button variant="success" type="submit">
                        Submit
                    </Button> */}

                        <Link to={-1}>
                            <Button variant="dark">Back</Button>
                        </Link>
                    </div>
                </Form>
            </section>
        </>
    );
};

export default HOC(SubscriptionDetails);
