import React from 'react';
import { render, screen } from '@testing-library/react';
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
  NavBtnWrapper: ({ children }) => <div>{children}</div>,
  Button: ({ children }) => <button>{children}</button>,
}));

describe('Navbar (landing)', () => {
  test('renders without crashing and shows "Social Neighborhood"', () => {
    render(<Navbar toggle={() => {}} />);
    expect(screen.getByText('Social Neighborhood')).toBeInTheDocument();
  });
});
