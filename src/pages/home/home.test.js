import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './index';

jest.mock('../../Components/Navigbar-landing', () => () => (
  <div data-testid="mock-navbar">navbar</div>
));

jest.mock('../../Components/HomeSection', () => () => (
  <div data-testid="mock-home-section">home-section</div>
));

jest.mock('../../Components/Footer', () => () => (
  <div data-testid="mock-footer">footer</div>
));

describe('Home page', () => {
  beforeEach(() => {
    document.body.className = '';
  });

  test('renderiza los componentes principales', () => {
    render(<Home />);

    expect(screen.getByTestId('mock-navbar')).toBeInTheDocument();
    expect(screen.getByTestId('mock-home-section')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
  });

  test('agrega la clase home al body', () => {
    render(<Home />);

    expect(document.body.classList.contains('home')).toBe(true);
  });

  test('renderiza botón de subir con href /#', () => {
    render(<Home />);

    const upButton = document.querySelector('#upbutton');
    expect(upButton).not.toBeNull();
    expect(upButton.getAttribute('href')).toBe('/#');
  });
});
