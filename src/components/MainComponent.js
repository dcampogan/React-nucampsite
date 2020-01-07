//CONTAINER COMPONENT
import React, { Component } from "react";
import Directory from "./DirectoryComponent";
import CampsiteInfo from "./CampsiteInfoComponent";
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CAMPSITES } from "../shared/campsites";

class Main extends Component {

	constructor(props) {
    super(props);
    this.state = {
        campsites: CAMPSITES
    };
}

  render() {
    const HomePage = () => {
      return (
        <Home />
      );
    }

    return (
      <div>
        <Header />
        <Switch>
          <Route path='/home' component={HomePage} />
          <Route exact path='/directory' render={() => <Directory campsites={this.state.campsites} />} />
          <Redirect to='/home' /> {/* will redirect here if no route is found */}
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
