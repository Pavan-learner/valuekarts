import React, { useState } from 'react'
import { Modal, Button, Form } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { url } from '../backend_link/data';
import axios from 'axios';
import toast from 'react-hot-toast';

const ReturnPopup = ({show, handleClose, id , }) => {
    const auth = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(reason);

    setLoading(true);

    // Handle form submission logic here
    try {
      const res = await axios.put(
        `${url}/api/v2/order/return-order/${id}`,
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
      toast.success("Your return request has been submitted successfully please reload the page");
      setLoading(false);
      setReason("");
      handleClose();
    } catch (error) {
      handleClose();
      setLoading(false);
    }
    // Clear the reason input

  };

  const [reason, setReason] = useState("");

  return (
    <div>
         <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Return Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formReason">
              <Form.Label>Reason for Return</Form.Label>
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
  )
}

export default ReturnPopup