import { render } from '@testing-library/react';
import { Door } from '@/models/Door';
import { DoorList } from './DoorList';

jest.mock('next/router', () => require('next-router-mock'));

const doors: Door[] = [
  {
    id: '63f637c9f3c48a124616044b',
    name: 'Building Main Entrance',
    buildingName: 'Bahnhofstrasse 10A',
    apartmentName: 'Apartment 1',
    connectionType: 'wired',
    connectionStatus: 'offline',
    lastConnectionStatusUpdate: '2023-02-22T03:00:11.853Z',
  },
];

describe('DoorList', () => {
  it('should render correctly', () => {
    const { container } = render(<DoorList doors={doors} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
