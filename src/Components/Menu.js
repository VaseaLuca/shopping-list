import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = ({ location, length }) => {
  let pathName = location.pathname;

  return (
    <div className="menu">
      <div className={`menu-link ${pathName === '/item-list' && 'selected'}`}>
        <Link to="/item-list">Item List</Link>
      </div>
      <div className={`menu-link ${pathName === '/cart-list' && 'selected'}`}>
        <Link to="/cart-list">{`Cart List ${length === 0 ? '' : `(${length})`}`}</Link>
      </div>
    </div>
  );
};
export default Menu;
