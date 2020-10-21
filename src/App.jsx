import React, { Component, useState } from 'react';
import Home from './home';
import NewForm from './newform';
import EditForm from './editform';

const showHome = () => {
  if (window.location.pathname === "/") {
    return <div><Home /></div>
  }
}

const showNewForm = () => {
  if (window.location.pathname === "/newform") {
    return <NewForm />
  }
}

const showEditForm = () => {
  if (window.location.pathname === "/editform") {
    return <EditForm />
  }
}

class App extends Component {
  render() {
    return (
        <div>
          {showHome()}
          {showNewForm()}
          {showEditForm()}
        </div>
    );
  }
}

export default App;