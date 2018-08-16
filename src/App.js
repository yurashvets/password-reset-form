import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css';
import ResetPage from './reset-page';
import ResetResult from './reset-result';

class App extends Component {
  state = {
    result: undefined
  }

  handleResetResult = state => {
    this.setState({ result: state });
  }

  render() {
    const { state } = this;
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => (<ResetPage
                result={state.result}
                handleResetResult={this.handleResetResult}
                {...props}
              />)} 
            />
          <Route path="/finish" render={(props) => (<ResetResult result={state.result} {...props}/>)} />
        </Switch>
      </Router>
    );
  }
}

export default App;
