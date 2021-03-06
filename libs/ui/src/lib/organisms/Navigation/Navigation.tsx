import React, { useState } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { FaUserAlt } from 'react-icons/all';
import { useAuthentication } from '@internship/shared/hooks';
import { logoutAsync } from '@internship/store/authentication';
import { useDispatch } from 'react-redux';
import { Popup, PopupButton } from '../../molecules';
import { getAccessToken } from '@internship/shared/utils';
import styled from 'styled-components';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledNav = styled.nav`
background-color: blueviolet !important;
`;

export const Navigation = () => {
  const { isAuthenticated } = useAuthentication();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const handleClose = () => {
    setShow(false);
  };

  const handleOpen = () => {
    setShow(true);
    dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
  };
  const tokens = {
    accessToken: getAccessToken(),
  };

  const handleShow = () => {
    dispatch(logoutAsync.request(tokens));
    setShow(false);
    history.push('/');
  };

  return (
    <StyledNav className="navbar navbar-expand-sm bg-primary  navbar-dark">
      <div className="container">
        <button
          className="custom-toggler navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar"
          aria-controls="navbar"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbar">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-brand">
              <NavLink exact to="/" className="nav-link"
                       onClick={() => dispatch({ type: '@temp/ERROR_REQUIRED', payload: null })}>
                <FontAwesomeIcon icon={faHome} />
              </NavLink>
            </li>
            <li className="navbar-brand">
              <NavLink exact to="/whatIf" className="nav-link"
                       onClick={() => dispatch({ type: '@temp/ERROR_REQUIRED', payload: null })}>
                WhatIf
              </NavLink>
            </li>

            {isAuthenticated ? (
              <NavDropdown className="nav-link" title={<FaUserAlt />} id="basic-nav-dropdown">
                <NavLink
                  className="dropdown-item"
                  to="/profile"
                  type="button"
                  onClick={() => {
                    dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
                    dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
                  }}
                >
                  Profile
                </NavLink>
                <NavDropdown.Item type="button" to={location.pathname} onClick={handleOpen}>
                  Logout
                </NavDropdown.Item>
                <Popup show={show} onHide={handleClose}>
                  Sistemden ????k??yorsunuz Emin misiniz?
                  <PopupButton variant="secondary" onClick={handleClose}>
                    HAYIR
                  </PopupButton>
                  <PopupButton type="submit" variant="primary" onClick={handleShow}>
                    EVET
                  </PopupButton>
                </Popup>
              </NavDropdown>
            ) : (
              <NavDropdown className="nav-link" title="Account" id="basic-nav-dropdown">
                <NavLink
                  className="dropdown-item"
                  to="/login"
                  onClick={() => {
                    dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
                    dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
                  }}
                >
                  Sign In
                </NavLink>
              </NavDropdown>
            )}
          </ul>
        </div>
      </div>
    </StyledNav>
  );
};
