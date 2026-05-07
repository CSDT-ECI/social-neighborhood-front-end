import React from 'react';
import { render, screen } from '@testing-library/react';
import Sidebar from './Sidebar';

jest.mock('../../dummyData', () => ({ Users: [{ id: 1 }, { id: 2 }] }), { virtual: true });
jest.mock('@material-ui/icons', () => ({
  RssFeed: () => <span>RssFeed</span>,
  Chat: () => <span>Chat</span>,
  PlayCircleFilledOutlined: () => <span>Play</span>,
  Group: () => <span>Group</span>,
  Bookmark: () => <span>Bookmark</span>,
  HelpOutline: () => <span>Help</span>,
  WorkOutline: () => <span>Work</span>,
  Event: () => <span>Event</span>,
  School: () => <span>School</span>,
}));

describe('Sidebar', () => {
  test('renders and shows "Show More" button', () => {
    render(<Sidebar />);
    expect(screen.getByRole('button', { name: /show more/i })).toBeInTheDocument();
  });
});
