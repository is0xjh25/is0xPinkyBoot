import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from '../components/Home';
import AddPost from './AddPost';
import Account from './Account';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import './App.css';
import { checkAuthorized } from '../Utilities/Utilities';
import Trade from './Trade';


class App extends Component {

  constructor(props) {
    super(props);
    this.state= { 
      user: "",
      searchBar: ""
    };
  }

  componentDidMount() {
    this.setUser(checkAuthorized());
    this.setSearchBar("false");
  }

  componentWillUnmount() {
    this.setUser("");
    this.searchBar("");
  }

  setUser = (u) => {
    this.setState({user: u});
  }

  setSearchBar = (b) => {
    this.setState({searchBar: b});
  }

  render() {
    return (
      <>
        <div id='header'>
          <NavBar user={this.state.user} searchBar={this.state.searchBar}/>
        </div>
        <Router>
        <div id='main'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route exact path='/add-post' element={<AddPost/>} />
              <Route path='/buy' element={<Trade fn="buy" setSearchBar={this.setSearchBar}/>} />
              <Route path='/sell' element={<Trade fn="sell" setSearchBar={this.setSearchBar}/>} />
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