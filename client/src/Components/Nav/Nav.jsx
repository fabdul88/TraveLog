import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import './nav.scss';
import logo from '../../assets/icons/logo.svg';

export default function Nav() {
  const location = useLocation();
  return (
    <div className="nav-container">
      <div className="nav-container__sub">
        <nav className="nav-container__nav">
          <div className="nav-container__logo-container">
            <Link className="nav-container__logo-link" to="/">
              <motion.img
                className="nav-container__logo"
                src={logo}
                alt="logo"
                whileHover={{ scale: 1.1 }}
              ></motion.img>
            </Link>
          </div>
          <div className="nav-container__menu-container">
            <ul className="nav-container__list">
              <motion.li
                className="nav-container__list-item"
                whileHover={{ scale: 1.1 }}
              >
                <Link
                  className={
                    location.pathname === '/'
                      ? 'nav-container__list-item-link--active'
                      : 'nav-container__list-item-link'
                  }
                  to="/"
                >
                  Home
                </Link>
              </motion.li>
              <motion.li
                className="nav-container__list-item"
                whileHover={{ scale: 1.1 }}
              >
                <Link
                  className={
                    location.pathname === '/map'
                      ? 'nav-container__list-item-link--active'
                      : 'nav-container__list-item-link'
                  }
                  to="/map"
                >
                  Map
                </Link>
              </motion.li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
