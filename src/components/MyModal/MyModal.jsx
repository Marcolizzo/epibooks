import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { Form, ListGroup } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import axios from "axios";

function MyModal({ show, handleClose, elementId }) {
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTk4MTMzZDQyNDc2YzAwMTg3NjUzYmQiLCJpYXQiOjE3MDgxODg1MzUsImV4cCI6MTcwOTM5ODEzNX0.K3EZEBj4BIsIUPc12aMX8eLl06_DRb-24KOqboJ0_co`;
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [ratingKey, setRatingKey] = useState(0);
  const [editIndex, setEditIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComments, setEditedComments] = useState([]);
  const [editedRating, setEditedRating] = useState(0);

  async function fetchComments() {
    const url = `https://striveschool-api.herokuapp.com/api/books/${elementId}/comments/`;
    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const reverseComments = response.data.reverse();
      setComments(reverseComments);
    } catch (error) {
      console.error(error);
    }
  }

  async function addComment() {
    const url = "https://striveschool-api.herokuapp.com/api/comments";

    let payload = {
      comment: comment,
      rate: rating,
    };

    try {
      payload.elementId = elementId;
      await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setComment("");
      setRatingKey(ratingKey + 1);
      fetchComments();
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteComment(id) {
    const url = `https://striveschool-api.herokuapp.com/api/comments/${id}`;

    try {
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchComments();
    } catch (error) {
      console.error(error);
    }
  }

  async function saveEditedComment(comment, index) {
    const url = `https://striveschool-api.herokuapp.com/api/comments/${comment._id}`;
    let payload = {
      comment: editedComments[index],
      rate: editedRating,
    };

    try {
      await axios.put(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      fetchComments();
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  }

  function startEdit(index) {
    const newEditedComments = [...editedComments];
    newEditedComments[index] = comments[index].comment;
    setEditedComments(newEditedComments);
    setEditIndex(index);
    setIsEditing(!isEditing);
  }

  function handleOnChangeInput(e, index) {
    const newEditedComments = [...editedComments];
    newEditedComments[index] = e.target.value;
    setEditedComments(newEditedComments);
  }

  useEffect(() => {
    if (show) {
      fetchComments();
      setEditedComments(comments.map((comment) => comment.comment));
    }
  }, [show]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Feedback</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h6>Add comment:</h6>
          <Form.Control
            as="textarea"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></Form.Control>

          <h6 className="mt-2">Rate:</h6>
          <Rating size={25} key={ratingKey} onClick={setRating}></Rating>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="warning" onClick={addComment}>
              Save
            </Button>
          </Modal.Footer>

          <h5 className="mt-4">Other Feedbacks:</h5>
          <ListGroup>
            {comments.map((comment, index) => (
              <ListGroup.Item key={index}>
                <div>
                  <b>Rating:</b>
                  <Rating
                    size={22}
                    readonly={editIndex !== index || !isEditing}
                    initialValue={comment.rate}
                    onClick={setEditedRating}
                  ></Rating>
                </div>

                <div>
                  {" "}
                  <b>Comment:</b>
                  <Form.Control
                    as="textarea"
                    disabled={editIndex !== index || !isEditing}
                    value={isEditing ? editedComments[index] : comment.comment}
                    onChange={(e) => {
                      handleOnChangeInput(e, index);
                    }}
                  ></Form.Control>
                </div>

                <div className="d-flex gap-2 mt-2">
                  <Button
                    variant="primary"
                    onClick={() => startEdit(index, comment)}
                  >
                    {isEditing ? "Cancel" : "Edit"}
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => deleteComment(comment._id)}
                  >
                    Delete
                  </Button>
                  {editIndex !== index ||
                    (isEditing && (
                      <Button
                        variant="warning"
                        onClick={() => {
                          saveEditedComment(comment, index);
                        }}
                      >
                        Save
                      </Button>
                    ))}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MyModal;
