import React, { Component } from 'react';
import { Router, Route, Switch } from "react-router";

import Api_test from './Api_test'
import template0 from './template0'
import template from './template'
import template2 from './template2'
import template3 from './template3'

import '../css/modules.css';
import '../css/style.min.css';
import '../js/index.js';

class App extends Component {
  constructor (props) {
    super(props);
    
    this.state = {
    }
}

  componentDidMount() {}

  render () {
    return (
      <div className="App">
          <Switch>
            <Route exact path='/' component={template0} />
            <Route path='/Api_test' component={Api_test} />
            <Route path='/template0/:pop/:size' component={template0} />
            <Route path='/template/:num/:num2' component={template} />
            {/* <Route path='/template2/:num/:tutorial/:tutorial2' component={template2} /> */}
            <Route path='/template3/:num/:num2/:tutorial/:tutorial2' component={template3} />
          </Switch>
      </div>
    );
  }

}


export default App;
