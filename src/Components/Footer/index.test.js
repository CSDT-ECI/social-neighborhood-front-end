import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('./FooterElements', () => ({
  FooterContainer: ({ children }) => <div data-testid="footer-container">{children}</div>,
  FooterWrap: ({ children }) => <div data-testid="footer-wrap">{children}</div>,
  SocialMedia: ({ children }) => <div data-testid="social-media">{children}</div>,
  SocialMediaWrap: ({ children }) => <div data-testid="social-media-wrap">{children}</div>,
  WebSiteRight: ({ children }) => <div data-testid="website-right">{children}</div>,
  SocialLogo: ({ children, to }) => <a href={to} data-testid="social-logo">{children}</a>,
  NavLinks: ({ children, to }) => <a href={to} data-testid="nav-link">{children}</a>,
}));

import Footer from './index';

describe('Footer', () => {
  test('renders brand name and navigation links', () => {
    render(<Footer />);

    expect(screen.getByText('Social Neighborhood')).toBeInTheDocument();
    expect(screen.getByText('Quienes Somos?')).toBeInTheDocument();
  });
});
