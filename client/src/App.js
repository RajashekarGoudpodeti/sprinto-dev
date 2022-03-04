import React, { Component } from "react";
import './App.css';
import { withRouter } from 'react-router-dom';
import Header from './components/ui/Header';
import Layout from './components/ui/Layout';


class App extends Component { 
  render() {
    return (
      <>
      <Header/>
      <Layout/>
    </>
    );
  }
}

export default withRouter(App);
