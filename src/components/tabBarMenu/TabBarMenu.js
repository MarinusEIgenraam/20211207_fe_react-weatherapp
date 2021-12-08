import React from 'react';
import './TabBarMenu.css';
import {NavLink, useNavigate} from 'react-router-dom';

function TabBarMenu() {
  const navigate = useNavigate();

  return (
    <nav className="tab-bar">
      <ul>
        <li>
          <NavLink activeClassName="active" to="/komende-week">
            Vandaag
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName='active' to="/">
            Komende week
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default TabBarMenu;
