import React from "react";
import { Link } from "react-router-dom";
export default class AlreadyConfirmed extends React.Component {
  render() {
    return (
      <div>
        <h1 className="text-center h">AlreadyConfirmed</h1>
        <br />
        <br />
        <Link to="/login">
          <button className="sub btn btn-success">Login</button>
        </Link>
      </div>
    );
  }
}
