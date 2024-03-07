import React, {ReactElement} from "react";
import  auth  from "../services/authService";
import { createBrowserHistory } from "history";
import { Card } from "react-bootstrap";

const history = createBrowserHistory()

const Profile: React.FC = () : ReactElement=> {
  const currentCustomer = auth.getCurrentCustomer();
  
  if(!currentCustomer) {
    window.location.reload();
  }
  console.log('currentCustomer',currentCustomer)
  return (
    <div className="container">
      <Card bg="primary" text="white" style={{ width: '18rem' }}>
        <Card.Header>Header</Card.Header>
        <Card.Body>
          <Card.Title>Primary Card Title</Card.Title>
          <Card.Text>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
      <br />

      <Card bg="secondary" text="white" style={{ width: '18rem' }}>
        <Card.Header>Header</Card.Header>
        <Card.Body>
          <Card.Title>Secondary Card Title</Card.Title>
          <Card.Text>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
      <br />

      <Card bg="success" text="white" style={{ width: '18rem' }}>
        <Card.Header>Header</Card.Header>
        <Card.Body>
          <Card.Title>Success Card Title</Card.Title>
          <Card.Text>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
      <br />

      <Card bg="danger" text="white" style={{ width: '18rem' }}>
        <Card.Header>Header</Card.Header>
        <Card.Body>
          <Card.Title>Danger Card Title</Card.Title>
          <Card.Text>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
      <br />

      <Card bg="warning" text="white" style={{ width: '18rem' }}>
        <Card.Header>Header</Card.Header>
        <Card.Body>
          <Card.Title>Warning Card Title</Card.Title>
          <Card.Text>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
      <br />

      <Card bg="info" text="white" style={{ width: '18rem' }}>
        <Card.Header>Header</Card.Header>
        <Card.Body>
          <Card.Title>Info Card Title</Card.Title>
          <Card.Text>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
      <br />

      <Card bg="dark" text="white" style={{ width: '18rem' }}>
        <Card.Header>Header</Card.Header>
        <Card.Body>
          <Card.Title>Dark Card Title</Card.Title>
          <Card.Text>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
      <br />

      <Card bg="light" style={{ width: '18rem' }}>
        <Card.Header>Header</Card.Header>
        <Card.Body>
          <Card.Title>Light Card Title</Card.Title>
          <Card.Text>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;