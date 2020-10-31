import React from "react";
import axios from "axios";
export default function ImageUpload(props) {
  var usertoSend = "";
  function fun() {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:2020/getUser",
    }).then((d) => {
      if (d.data == "") {
        props.history.push("/login");
      } else {
        usertoSend = d.data;
        console.log("userToSend", usertoSend);
      }
    });
  }
  fun();

  var [file, setFile] = React.useState("");
  var [previewImage, setPreviewImage] = React.useState("");
  function previewFile(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
      // console.log(reader.result);
    };
  }
  function changeImageFile(e) {
    var f = e.target.files[0];
    // console.log(f);
    previewFile(f);
  }
  function uploadImage(my_url) {
    console.log(my_url);
    console.log(usertoSend);
    axios({
      method: "POST",
      data: {
        imageUrl: my_url,
        username: usertoSend,
      },
      withCredentials: true,
      url: "http://localhost:2020/cloud/API",
    }).then((d) => {
      // console.log(d);
    });
    setPreviewImage("");
    setTimeout(() => {
      alert("image uploaded successfully");
    }, 2000);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (previewImage == "") {
      // console.log("upload an image");
      alert("please choose a file");
    } else uploadImage(previewImage);
  }
  var [srcOfIm, setSrcOfIm] = React.useState("");
  function showImages() {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:2020/cloud/getImages",
    }).then((d) => {
      console.log(d.data);
      setSrcOfIm(d.data);
    });
  }
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
  function hideImages() {
    setSrcOfIm("");
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
              <a class="nav-link" href="/">
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link active " href="/imageUpload">
                Upload an Image
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link " href="#" onClick={handleLogOut}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div class="container">
        <h1 className="text-center h">Upload An Image</h1>
        <form onSubmit={handleSubmit}>
          <div class="form-row">
            <div class="form-group col-12">
              <label>Please choose an image to upload</label>
              <input
                type="file"
                class="form-control"
                onChange={changeImageFile}
                value={file}
              />
            </div>
          </div>
          <button class="sub1 btn btn-primary">Upload to Cloudinary</button>
        </form>
        {previewImage && <img className="form-group" src={previewImage} />}
        <br />
        <br />
        <button className="sub1 btn btn-info" onClick={showImages}>
          Show your images
        </button>
        <br />
        <br />
        <br />
        <button className="sub1 btn btn-info" onClick={hideImages}>
          Hide your images
        </button>
        <br />
        <br />
      </div>
      <div className="container-fluid">
        <div className="row">
          {srcOfIm &&
            srcOfIm.map((i, index) => {
              return (
                <div key={index} className="col-lg-3 col-md-6">
                  <img className="img-thumbnail" src={i} />
                  <p></p>
                  <p></p>
                </div>
              );
            })}
        </div>
      </div>
      <br />
    </div>
  );
}
