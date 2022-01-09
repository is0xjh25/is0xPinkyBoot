import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Row from'react-bootstrap/Row';
import Col from'react-bootstrap/Col';

const NavBar = () => {
  return (
    <Fragment>
      <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">PinkyBoot</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
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
        </div>
      </nav>
    </Fragment>
  );
}

export default NavBar;

{/* <div style={{ borderBottom: '2px solid black', paddingBottom: '10px', marginBottom: '12px' }}>
<Row classNameName="mx-0">

  <NavLink style={{ marginRight: '10px' }} to="/sell">
    Sell
  </NavLink>
  <NavLink style={{ marginRight: '10px' }} to="/account">
    Account
  </NavLink>
  <Button as={Col} variant="primary">
    <NavLink style={{ marginRight: '10px'}} to="/">
      Home
    </NavLink>
  </Button>
  <Button as={Col} variant="secondary" classNameName="mx-2">   
    <NavLink style={{ marginRight: '10px' }} to="/add-post">
      AddPost
    </NavLink>
  </Button>
  <Button as={Col} variant="success">
    <NavLink style={{ marginRight: '10px' }} to="/buy">
      Buy
    </NavLink>
  </Button>
</Row>
</div> */}