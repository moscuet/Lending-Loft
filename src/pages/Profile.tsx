import React, {ReactElement} from "react";
import  auth  from "../services/authService";


const Profile: React.FC = () : ReactElement=> {
  const currentCustomer = auth.getCurrentCustomer();

  console.log('currentCustomer',currentCustomer)

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentCustomer.firstName}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentCustomer.accessToken.substring(0, 20)} ...{" "}
        {currentCustomer.accessToken.substr(currentCustomer.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentCustomer._id}
      </p>
      <p>
        <strong>Email:</strong> {currentCustomer.useremail}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {/* {currentCustomer.roles &&
          currentCustomer.roles.map((role: string, index: number) => <li key={index}>{role}</li>)} */}
      </ul>
    </div>
  );
};

export default Profile;