/** @format */
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import HOC from "../../Layout/HOC";
import { getApi, removeApi } from "../../Repository/Repository";
import { useEffect, useState } from "react";
import TableLayout from "../../Component/TableLayout";
import { EditReview } from "../../Component/Modals/Modals";


const SingleProduct = () => {
  const [show, setShow] = useState(false);
  const { id } = useParams();
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [ids, setIdS] = useState("");
  const navigate = useNavigate();


  const fetchHandler = () => {
    getApi({
      url: `api/v1/admin/getProductByProductId/${id}`,
      setResponse,
      setLoading,
    });
  };

  useEffect(() => {
    fetchHandler();
  }, []);


  const deleteHandler = (ids) => {
    const additionalFunctions = [fetchHandler];
    removeApi({
      url: `api/v1/admin/Product/deleteProductReview/${id}/${ids}`,
      successMsg: "Removed !",
      additionalFunctions,
    });
  };

  const thead = [
    "Sno.",
    "Rating",
    "Comment",
    "Action",
  ];

  const tbody = response?.data?.reviews?.map((i, index) => [
    `#${index + 1}`,
    i?.rating,
    i?.comment,
    <span className="flexCont">
      <i
        className="fa-solid fa-pen-to-square"
        onClick={() => {
          setIdS(i._id);
          handleEditClick(i)
        }}
      />
      <i className="fa-sharp fa-solid fa-trash" onClick={() => deleteHandler(i.user)}></i>
    </span>,
  ]);

  const handleEditClick = (data) => {
    setSelected(data);
    setShow(true);
  };


  return (
    <>
      <EditReview
        show={show}
        handleClose={() => setShow(false)}
        id={id}
        ids={ids}
        fetchApi={fetchHandler}
        data={selected}
      />
      <section className="sectionCont">
        <div className="imageshow">
          <div>
            <Form.Label>Product Images</Form.Label>
            <div className="img-cont" >
              {response?.data?.productImage?.map((img, index) => (
                <img key={index} src={img.img} alt={`Product ${index + 1}`} className="centerImage" />
              ))}
            </div>
          </div>
          <div>
            <Form.Label>Product Videos</Form.Label>
            <div className="img-cont">
              {response?.data?.productVideo?.map((video, index) => (
                <video
                  key={index}
                  src={video.video}
                  className="centerImage"
                  controls
                  aria-label={`Product video ${index + 1}`}
                  title={`Product video ${index + 1}`}
                />
              ))}
            </div>

          </div>
        </div>




        <Form className="mt-3">
          <Row>
            <Col xs={12} md={3}>
              <Form.Group className="mb-3">
                <Form.Label>ID</Form.Label>
                <Form.Control type="text" value={response?.data?.ID} />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control type="text" value={response?.data?.productName} />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Top Seller Name</Form.Label>
                <Form.Control type="text" value={response?.data?.brandName} />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Unit of Measurement</Form.Label>
                <Form.Control type="text"  value={response?.data?.size} />
              </Form.Group>
            </Col>

            <Col xs={12} md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" min={0} value={response?.data?.originalPrice} />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Discount Active</Form.Label>
                <Form.Control type="text" value={response?.data?.discountActive ? "Active" : "Deactive"} />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Discount</Form.Label>
                <Form.Control type="number" min={0} value={response?.data?.discount} />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Discounted Price</Form.Label>
                <Form.Control type="number" min={0} value={response?.data?.discountPrice} />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Stock</Form.Label>
                <Form.Control type="text" value={response?.data?.stock} />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Stock Status</Form.Label>
                <Form.Control type="text" value={response?.data?.stockStatus} />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Minimum Order Quantity</Form.Label>
                <Form.Control type="number" min={0} value={response?.data?.minimunOrderUnit} />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" value={response?.data?.categoryId?.name} />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Sub-Category</Form.Label>
                <Form.Control type="text" value={response?.data?.subcategoryId?.name} />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Rating</Form.Label>
                <Form.Control type="text" value={response?.data?.avgRatingsProduct} />
              </Form.Group>
            </Col>

            <Col xs={12} md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <FloatingLabel>
                  <Form.Control
                    as="textarea"
                    style={{ height: "100px" }}
                    value={response?.data?.description}
                  />
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col xs={12} md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Return Policy</Form.Label>
                <FloatingLabel>
                  <Form.Control
                    as="textarea"
                    style={{ height: "100px" }}
                    value={response?.data?.returnPolicy}
                  />
                </FloatingLabel>
              </Form.Group>
            </Col>
          </Row>
        </Form>

        <section className="sectionCont">
          <div className="pb-4  w-full flex justify-between items-center">
            <span
              className="tracking-widest text-slate-900 font-semibold"
              style={{ fontSize: "1.5rem" }}
            >
              All Reviews/Ratings ({response?.data?.totalRating || 0})
            </span>
          </div>
          <TableLayout thead={thead} tbody={tbody} loading={loading} />
        </section>

        <Link to={-1}>
          <Button variant="dark">Back</Button>
        </Link>
      </section >
    </>
  );
};

export default HOC(SingleProduct);
