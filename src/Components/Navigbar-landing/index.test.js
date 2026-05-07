import React from 'react';
import { render, screen } from '@testing-library/react';
import PropTypes from 'prop-types';
import Navbar from './index';

jest.mock('react-icons/fa', () => ({ FaBars: () => <span>bars</span> }));
jest.mock('react-icons/lib', () => ({ IconContext: { Provider: ({ children }) => children } }));
jest.mock('react-scroll', () => ({ animateScroll: { scrollToTop: jest.fn() } }));
function mockNav({ children }) {
  return <nav>{children}</nav>;
}

mockNav.propTypes = {
  children: PropTypes.node,
};

function mockNavbarContainer({ children }) {
  return <div>{children}</div>;
}

mockNavbarContainer.propTypes = {
  children: PropTypes.node,
};

function mockNavLogo({ children, onClick }) {
  return <a onClick={onClick}>{children}</a>;
}

mockNavLogo.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
};

function mockMobileIcon({ children, onClick }) {
  return <div onClick={onClick}>{children}</div>;
}

mockMobileIcon.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
};

function mockNavMenu({ children }) {
  return <div>{children}</div>;
}

mockNavMenu.propTypes = {
  children: PropTypes.node,
};

function mockNavBtnWrapper({ children }) {
  return <div>{children}</div>;
}

mockNavBtnWrapper.propTypes = {
  children: PropTypes.node,
};

function mockButton({ children }) {
  return <button>{children}</button>;
}

mockButton.propTypes = {
  children: PropTypes.node,
};

jest.mock('./NavigbarElements', () => ({
  Nav: mockNav,
  NavbarContainer: mockNavbarContainer,
  NavLogo: mockNavLogo,
  MobileIcon: mockMobileIcon,
  NavMenu: mockNavMenu,
  NavBtnWrapper: mockNavBtnWrapper,
  Button: mockButton,
}));

describe('Navbar (landing)', () => {
  test('renders without crashing and shows "Social Neighborhood"', () => {
    render(<Navbar toggle={() => {}} />);
    expect(screen.getByText('Social Neighborhood')).toBeInTheDocument();
  });
});
