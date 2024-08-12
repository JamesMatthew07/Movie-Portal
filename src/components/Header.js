/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import './header.css';

function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid d-flex justify-content-center">
          <a className="navbar-brand">
            Movie Portal
          </a>
        </div>
      </nav>
    </>
  );
}

export default Header;
