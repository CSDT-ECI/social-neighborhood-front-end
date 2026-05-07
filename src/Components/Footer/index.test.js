import React from 'react';
import { render, screen } from '@testing-library/react';
import PropTypes from 'prop-types';

function mockFooterContainer({ children }) {
  return <div data-testid="footer-container">{children}</div>;
}

mockFooterContainer.propTypes = {
  children: PropTypes.node,
};

function mockFooterWrap({ children }) {
  return <div data-testid="footer-wrap">{children}</div>;
}

mockFooterWrap.propTypes = {
  children: PropTypes.node,
};

function mockSocialMedia({ children }) {
  return <div data-testid="social-media">{children}</div>;
}

mockSocialMedia.propTypes = {
  children: PropTypes.node,
};

function mockSocialMediaWrap({ children }) {
  return <div data-testid="social-media-wrap">{children}</div>;
}

mockSocialMediaWrap.propTypes = {
  children: PropTypes.node,
};

function mockWebSiteRight({ children }) {
  return <div data-testid="website-right">{children}</div>;
}

mockWebSiteRight.propTypes = {
  children: PropTypes.node,
};

function mockSocialLogo({ children, to }) {
  return <a href={to} data-testid="social-logo">{children}</a>;
}

mockSocialLogo.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
};

function mockNavLinks({ children, to }) {
  return <a href={to} data-testid="nav-link">{children}</a>;
}

mockNavLinks.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
};

jest.mock('./FooterElements', () => ({
  FooterContainer: mockFooterContainer,
  FooterWrap: mockFooterWrap,
  SocialMedia: mockSocialMedia,
  SocialMediaWrap: mockSocialMediaWrap,
  WebSiteRight: mockWebSiteRight,
  SocialLogo: mockSocialLogo,
  NavLinks: mockNavLinks,
}));

import Footer from './index';

describe('Footer', () => {
  test('renders brand name and navigation links', () => {
    render(<Footer />);

    expect(screen.getByText('Social Neighborhood')).toBeInTheDocument();
    expect(screen.getByText('Quienes Somos?')).toBeInTheDocument();
  });
});
