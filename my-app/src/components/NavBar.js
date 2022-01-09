import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div style={{ borderBottom: '2px solid black', paddingBottom: '10px', marginBottom: '12px' }}>
      <NavLink style={{ marginRight: '10px' }} to="/">
        Home
      </NavLink>
      <NavLink style={{ marginRight: '10px' }} to="/add-post">
        AddPost
      </NavLink>
      <NavLink style={{ marginRight: '10px' }} to="/buy">
        Buy
      </NavLink>
	    <NavLink style={{ marginRight: '10px' }} to="/sell">
        Sell
      </NavLink>
      <NavLink style={{ marginRight: '10px' }} to="/account">
        Account
      </NavLink>
    </div>
  );
}

export default NavBar;