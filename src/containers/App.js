import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from '../components/Home';
import AddPost from './AddPost';
import Buy from './Buy';
import Sell from './Sell';
import Account from './Account';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import './App.css';
import { checkAuthorized } from '../Utilities/Utilities';


class App extends Component {

  constructor(props) {
    super(props);
    this.state= { 
      user: ""
    };
  }

  componentDidMount() {
    this.setUser(checkAuthorized());
  }

  setUser = (u) => {
    this.setState({user: u});
  }

  render() {
    return (
      <>
        <div id='header'>
          <NavBar user={this.state.user}/>
        </div>
        <Router>
        <div id='main'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route exact path='/add-post' element={<AddPost user={this.state.user}/>} />
              <Route path='/buy' element={<Buy user={this.state.user}/>} />
              <Route path='/sell' element={<Sell user={this.state.user}/>} />
              <Route exact path='/account' element={<Account user={this.state.user} setUser={this.setUser}/>} />
            </Routes>
          </div>
        </Router>
        <div id='footer'>
          <Footer/>
        </div>
      </>
    );
  }
}

export default App;