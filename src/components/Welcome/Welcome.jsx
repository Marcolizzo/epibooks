import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

function Welcome() {
  const [show, setShow] = useState(true);

  return (
    <>
      <Alert show={show} variant="success">
        <Alert.Heading className="text-center">Welcome!</Alert.Heading>
        <p className="text-center">
          This is a test alert! You can safely ignore it.
        </p>
        <hr />
        <div className="d-flex justify-content-center">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Close me
          </Button>
        </div>
      </Alert>
    </>
  );
}

export default Welcome;
