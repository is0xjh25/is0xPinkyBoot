import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from '../components/Home';
import AddPost from '../components/AddPost';
import Buy from './Buy';
import Sell from './Sell';
import Account from './Account';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import './App.css';


class App extends Component {

  render() {
    return (
      <>
        <NavBar/>
        <Router>
        <div className='main'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route exact path='/add-post' element={<AddPost />} />
              <Route path='/buy' element={<Buy />} />
              <Route path='/sell' element={<Sell />} />
              <Route exact path='/account' element={<Account />} />
            </Routes>
            </div>
        </Router>
        <Footer/>
      </>
    );
  }
}

export default App;