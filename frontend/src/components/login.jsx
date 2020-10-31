import React from "react";
import axios from "axios";
import { GoogleLogin } from "react-google-login";
export default function Login(props) {
  const responseSuccessGoogle = (response) => {
    console.log(typeof response);
    console.log(response);
    console.log(response.rt);
    console.log(response.rt.$t);
    var your_email = response.rt.$t;
    axios({
      method: "POST",
      data: {
        your_email: your_email,
      },
      withCredentials: true,
      url: "http://localhost:2020/setEmail",
    }).then(() => {
      props.history.push("/imageUpload");
    });
  };
  const responseFailureGoogle = (response) => {
    console.log("error occured");
    console.log(response);
  };
  var [user, setUser] = React.useState("");
  var [pass, setPass] = React.useState("");
  var [invalid, setInvalid] = React.useState("");
  function handleUser(event) {
    setUser(event.target.value);
  }
  function handlePass(event) {
    setPass(event.target.value);
  }
  function handleSubmit(event) {
    if (!user || !pass) {
      setInvalid("fill all the details");
      setTimeout(() => {
        setInvalid("");
      }, 1000);
      return;
    }
    event.preventDefault();
    axios({
      method: "POST",
      data: {
        username: user,
        password: pass,
      },
      withCredentials: true,
      url: "http://localhost:2020/login",
    }).then((d) => {
      console.log(d.data);
      if (d.data == "invalid credentials") {
        setInvalid(d.data);
        setUser("");
        setPass("");
        setTimeout(() => {
          setInvalid("");
        }, 1000);
      } else if (d.data == "succesfully authenticated") {
        props.history.push("/imageUpload");
      } else if (d.data == "confirm your email") {
        props.history.push("/activateLink");
      }
    });
  }
  function handleClick() {
    props.history.push("/register");
  }
  const styles = {};
  return (
    <div>
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <a class="navbar-brand" href="/">
          SnapShot Keeper
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
            <li class="nav-item">
              <a class="nav-link active" href="/login">
                Login
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link " href="/register">
                Sign Up
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container">
        <h1 className="text-center h">LOGIN</h1>
        <h4 class="text-center h" style={{ color: "yellow" }}>
          {invalid}
        </h4>
        <form onSubmit={handleSubmit}>
          <div class="form-row">
            <div class="form-group col-12">
              <label>Email</label>
              <input
                type="text"
                class="form-control"
                name="username"
                placeholder="username"
                value={user}
                onChange={handleUser}
              />
            </div>
            <div class="form-group col-12">
              <label>Password</label>
              <input
                type="password"
                class=" form-control"
                name="password"
                placeholder="password"
                value={pass}
                onChange={handlePass}
              />
            </div>
          </div>
          <button class="sub  btn btn-primary">LOGIN</button>
        </form>
        <br />
        <br />
        <div className="text-center h">
          <GoogleLogin
            clientId="838697871970-ltpu8srr9q09431hjr0r9js115cn3vse.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseSuccessGoogle}
            onFailure={responseFailureGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>

        <h3 class="text-center h">
          Don't have an account?
          <a style={{ color: "white" }} href="/register">
            Sign Up
          </a>
        </h3>
      </div>
    </div>
  );
}
