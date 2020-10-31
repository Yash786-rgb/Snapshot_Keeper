import React from "react";
import axios from "axios";
export default class ConfirmEmail extends React.Component {
  componentDidMount() {
    axios({
      method: "POST",
      data: {
        id: this.props.match.params.id,
      },
      withCredentials: true,
      url: "http://localhost:2020/confirmEmail",
    }).then((d) => {
      console.log(d.data);
      if (d.data == "confirm your account") {
        setTimeout(() => {
          this.props.history.push("/imageUpload");
        }, 2000);
      } else if (d.data == "already confirmed") {
        this.props.history.push("/alreadyConfirmed");
      }
    });
  }
  render() {
    return (
      <div>
        <h1>Confirming your mail....</h1>
      </div>
    );
  }
}
