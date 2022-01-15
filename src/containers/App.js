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
  
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  };

  getInitialState = () => ({user: "admin"});
  setUser = (id) => {
    this.setState({user:id});
  }



  render() {
    return (
      <>
        <NavBar/>
        <Router>
        <div className='main'>
            <Routes>
              <Route path='/' element={<Home user={this.state.user}/>} />
              <Route exact path='/add-post' element={<AddPost user={this.state.user}/>} />
              <Route path='/buy' element={<Buy user={this.state.user}/>} />
              <Route path='/sell' element={<Sell user={this.state.user}/>} />
              <Route exact path='/account' element={<Account user={this.state.user} setUser={this.setUser} />} />
            </Routes>
            </div>
        </Router>
        <Footer/>
      </>
    );
  }
}

export default App;