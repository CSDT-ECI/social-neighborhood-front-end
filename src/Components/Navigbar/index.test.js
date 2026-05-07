import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { animateScroll as scroll } from 'react-scroll';
import Navbar from './index';

jest.mock('react-icons/fa', () => ({ FaBars: () => <span>bars</span> }));
jest.mock('react-icons/lib', () => ({ IconContext: { Provider: ({ children }) => children } }));
jest.mock('react-scroll', () => ({ animateScroll: { scrollToTop: jest.fn() } }));
jest.mock('./NavigbarElements', () => ({
  Nav: ({ children }) => <nav>{children}</nav>,
  NavbarContainer: ({ children }) => <div>{children}</div>,
  NavLogo: ({ children, onClick }) => <a onClick={onClick}>{children}</a>,
  MobileIcon: ({ children, onClick }) => <div onClick={onClick}>{children}</div>,
  NavMenu: ({ children }) => <div>{children}</div>,
  NavItems: ({ children }) => <div>{children}</div>,
  NavLinks: ({ children }) => <a>{children}</a>,
  NavBtnWrapper: ({ children }) => <div>{children}</div>,
  Button: ({ children }) => <button>{children}</button>,
}));

describe('Navbar', () => {
  test('renders "Social Neighborhood" text', () => {
    render(<Navbar toggle={() => {}} />);
    expect(screen.getByText('Social Neighborhood')).toBeInTheDocument();
  });

  test('calls scroll.scrollToTop when logo is clicked', () => {
    render(<Navbar toggle={() => {}} />);
    fireEvent.click(screen.getByText('Social Neighborhood'));
    expect(scroll.scrollToTop).toHaveBeenCalled();
  });
});
