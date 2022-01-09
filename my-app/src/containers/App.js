import React, { Component, Fragment } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from '../components/Home';
import AddPost from '../components/AddPost';
import Buy from './Buy';
import Sell from './Sell';
import Account from './Account';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './App.css';

class App extends Component {

  state = {
    movies: {
      1: { id: 1, title: 'A River Runs Through It' },
      2: { id: 2, title: 'Se7en' },
      3: { id: 3, title: 'Inception' }
    }
  }
  
  render() {
    return (
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/add-post' element={<AddPost />} />
          <Route path='/buy' element={<Buy />} />
          <Route path='/sell' element={<Sell />} />
          <Route exact path='/account' element={<Account />} />
        </Routes>
        <Fragment>
          <Header />
          <NavBar />
          <Footer />
        </Fragment>
      </Router>
    );
  }
}

export default App;