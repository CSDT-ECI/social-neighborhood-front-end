import React from 'react';
import { render, screen } from '@testing-library/react';
import { useDate } from './useDate';

const DateConsumer = () => {
  const { date, time, wish } = useDate();

  return (
    <div>
      <span data-testid="date">{date}</span>
      <span data-testid="time">{time}</span>
      <span data-testid="wish">{wish}</span>
    </div>
  );
};

describe('useDate', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  test('retorna saludo de morning con una hora de la mañana', () => {
    jest.setSystemTime(new Date(2026, 0, 2, 9, 30, 0));

    render(<DateConsumer />);

    expect(screen.getByTestId('wish')).toHaveTextContent(/^Good Morning,/);
    expect(screen.getByTestId('date').textContent).toMatch(/Friday|January/i);
    expect(screen.getByTestId('time').textContent).toMatch(/9:30|9:30 AM/i);
  });

  test('retorna saludo de afternoon con una hora de la tarde', () => {
    jest.setSystemTime(new Date(2026, 0, 2, 14, 15, 0));

    render(<DateConsumer />);

    expect(screen.getByTestId('wish')).toHaveTextContent(/^Good Afternoon,/);
  });

  test('limpia el intervalo al desmontarse', () => {
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
    jest.setSystemTime(new Date(2026, 0, 2, 18, 0, 0));

    const { unmount } = render(<DateConsumer />);

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
  });
});