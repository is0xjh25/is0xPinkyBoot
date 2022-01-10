import React, { Fragment, useState, useEffect } from 'react';

const NavBar = () => {

  const [status, setStatus] = useState("");

  function GetStatus() {
    let str = window.location.pathname.replace('/', '').replace('-' ,' ').toUpperCase();
    setStatus(str);
  }

  useEffect(() => {
    GetStatus();
  }, []);

  return (
    <Fragment>
      <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light justify-content-between">
        <a className="navbar-brand" href="/" style={{marginRight: "5rem"}}>PinkyBoot</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav" style={{minWidth:"500px"}}>
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/add-post">Add Post</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="buy">Buy</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="sell">Sell</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="account">Account</a>
            </li>
          </ul>            
            {(status === "BUY" || status === "SELL") ? 
            <form className="form-inline" style={{marginLeft:"20rem"}}>
              <input className="form" type="search" placeholder="Search" aria-label="Search" ></input>
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            :
            null
            }
        </div>
        <div>
          {status}
        </div>
      </nav>
    </Fragment>
  );
}

export default NavBar;