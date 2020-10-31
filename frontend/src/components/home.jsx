import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Styles/home.css";
export default function Home(props) {
  var [toShowLogInButton, setIt] = React.useState("YES");
  function fun() {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:2020/getUser",
    }).then((d) => {
      // console.log("d.data is : " + d.data);
      if (!d.data) {
        setIt("");
      }
    });
  }
  fun();
  setTimeout(() => {
    fun();
  }, 20);
  function handleLogOut() {
    axios({
      method: "POST",
      data: {
        username: "",
      },
      withCredentials: true,
      url: "http://localhost:2020/logout",
    });
    props.history.push("/");
  }
  return (
    <div>
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <a class="navbar-brand" href="/">
          SNAPSHOT KEEPER
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link active" href="/">
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link " href="/imageUpload">
                Upload an Image
              </a>
            </li>
            {!toShowLogInButton && (
              <li class="nav-item">
                <a class="nav-link " href="/login">
                  Login
                </a>
              </li>
            )}
            {!toShowLogInButton && (
              <li class="nav-item">
                <a class="nav-link " href="/register">
                  Sign Up
                </a>
              </li>
            )}
            {toShowLogInButton && (
              <li class="nav-item">
                <a class="nav-link " href="#" onClick={handleLogOut}>
                  LogOut
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <div className="container">
        <div className="text-center">
          <h1 className="heading">SNAPSHOT KEEPER</h1>
          <br />
          <br />
          {!toShowLogInButton && (
            <Link to="/login">
              <button className="btn btn-primary">Login</button>
            </Link>
          )}
          <br />
          <br />
          {!toShowLogInButton && (
            <Link to="/register">
              <button class="btn btn-success">Sign Up</button>
            </Link>
          )}
          {toShowLogInButton && (
            <button className="btn btn-danger" onClick={handleLogOut}>
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
