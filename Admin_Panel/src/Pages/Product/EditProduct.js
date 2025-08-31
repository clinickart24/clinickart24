/** @format */
import HOC from "../../Layout/HOC";
import { Link, useParams } from "react-router-dom";
import { Form, Button, Row, Col, FloatingLabel } from "react-bootstrap";
import Select from "react-select";
import data from "../../Constant/constant.json";
import BreadCrumb from "../../Component/BreadCrumb";

const EditProduct = () => {
  const { product } = useParams()
  return (
    <section className="sectionCont">
      <BreadCrumb title={`Edit ${product}`} />
      <Form>
        <Row>
          <Col xs={12} md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Product Image</Form.Label>
              <Form.Control type="file" multiple />
            </Form.Group>
          </Col>
          <Col xs={12} md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" value={product} />
            </Form.Group>
          </Col>
          <Col xs={12} md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Brand Name</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
          <Col xs={12} md={3}>
            <Form.Group className="mb-3">
              <Form.Label>ID</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
          <Col xs={12} md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" min={0} />
            </Form.Group>
          </Col>
          <Col xs={12} md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Discounted Price</Form.Label>
              <Form.Control type="number" min={0} />
            </Form.Group>
          </Col>
          <Col xs={12} md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Product Size</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
          <Col xs={12} md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Minimum Order Quantity</Form.Label>
              <Form.Control type="number" min={0} />
            </Form.Group>
          </Col>
     
          <Col xs={12} md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Select
                isMulti
                options={data?.category?.map((i) => ({
                  value: i.title,
                  label: i.title,
                }))}
                placeholder="Select Category"
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Sub-category</Form.Label>
              <Select
                isMulti
                options={data?.category?.map((i) => ({
                  value: i.title,
                  label: i.title,
                }))}
                placeholder="Select Sub-Category"
              />
            </Form.Group>
          </Col>

          <Col xs={12} md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <FloatingLabel>
                <Form.Control as="textarea" style={{ height: "100px" }} />
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>

        <div className="w-100 d-flex justify-content-between">
          <Button variant="success" type="submit">
            Update
          </Button>

          <Link to={-1}>
            <Button variant="dark">Back</Button>
          </Link>
        </div>
      </Form>
    </section>
  );
};

export default HOC(EditProduct);
