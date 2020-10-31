import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/login.jsx";
import Register from "./components/register.jsx";
import Home from "./components/home.jsx";
import UploadImage from "./components/uploadImage.jsx";
import { createBrowserHistory } from "history";
import ConfirmEmail from "./components/confirmEmail.jsx";
import ActiveLink from "./components/ActivateLink";
import AlreadyConfirmed from "./components/alreadyConfirmed.jsx";
const history = createBrowserHistory();
class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" render={(props) => <Login {...props} />} />
        <Route
          exact
          path="/register"
          render={(props) => <Register {...props} />}
        />
        <Route exact path="/imageUpload" component={UploadImage} />
        <Route
          exact
          path="/confirmEmail/:id"
          render={(props) => <ConfirmEmail {...props} />}
        />
        <Route exact path="/activateLink" component={ActiveLink} />
        <Route exact path="/alreadyConfirmed" component={AlreadyConfirmed} />
      </Router>
    );
  }
}

export default App;
