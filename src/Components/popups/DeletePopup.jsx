import axios from "axios";
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { url } from "../backend_link/data";
import { useSelector } from "react-redux";

const DeletePopup = ({ show, handleClose, id }) => {
  const auth = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  console.log(id);

  const [reason, setReason] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(reason);

    setLoading(true);

    // Handle form submission logic here
    try {
      const res = await axios.put(
        `${url}/api/v2/order/cancel-order/${id}`,
        {
          reason,
        },
        {
          headers: {
            Authorization: auth.token,
          },
        }
      );

      console.log(res.data);
      setLoading(false);
      setReason("");
      handleClose();
    } catch (error) {
      console.log(error);
      handleClose();
      setLoading(false);
    }
    // Clear the reason input
  };



  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formReason">
              <Form.Label>Reason for Cancellation</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Please provide a reason for cancelling your order"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {loading ? "Loading..." : "Submit"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeletePopup;
