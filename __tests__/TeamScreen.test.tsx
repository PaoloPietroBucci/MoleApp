import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import TeamsScreen from '../components/TeamsScreen';

jest.mock('react-native-device-info', () => ({
    isTablet: jest.fn(() => false), // Simula che non sia un tablet
  }))

// Mocking the getTeams function to return a predefined array of teams
jest.mock('../firebase/teamApi', () => ({
  getTeams: jest.fn(() => Promise.resolve([
    { name: 'Team 1', logoURL: 'logo1.png' },
    { name: 'Team 2', logoURL: 'logo2.png' },
    // Add more teams as needed
  ]))
}));

describe('TeamsScreen', () => {
  test('renders team names and logos', async () => {
    const { getByText, getByTestId } = render(<TeamsScreen />);
    
    // Wait for the teams to be loaded (you might need to adjust the waiting time)
    await waitFor(() => expect(getByText('Team 1')).toBeTruthy());

    // Check if the team names are rendered
    expect(getByText('Team 1')).toBeTruthy();
    expect(getByText('Team 2')).toBeTruthy();

    // Check if the logo images are rendered
    expect(getByTestId('logo-image-Team 1')).toBeTruthy();
    expect(getByTestId('logo-image-Team 2')).toBeTruthy();
    // Add more assertions for logo images as needed
  });

  test('opens modal when a team is pressed', async () => {
    const { getByText, getByTestId, queryByText } = render(<TeamsScreen />);
    
    // Wait for the teams to be loaded (you might need to adjust the waiting time)
    await waitFor(() => expect(getByText('Team 1')).toBeTruthy());

    // Check that modal is initially closed
    expect(queryByText('Players for Team 1')).toBeNull();

    // Simulate pressing the Team 1 item
    fireEvent.press(getByText('Team 1'));

    // Check that modal is opened and displays the correct team name
    expect(getByText('Players for Team 1')).toBeTruthy();

    // Simulate closing the modal
    fireEvent.press(getByText('Close'));

    // Check that modal is closed
    expect(queryByText('Players for Team 1')).toBeNull();
  });
});
