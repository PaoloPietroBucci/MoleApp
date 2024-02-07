import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProfileScreen from '../components/ProfileScreen'; // Assicurati che il percorso sia corretto

jest.mock('react-native-device-info', () => ({
  isTablet: jest.fn(() => false), // Simula che non sia un tablet
}))
// Mock del contesto di autenticazione
jest.mock('@react-native-firebase/auth', () => ({
  signOut: jest.fn(),
}));

describe('<ProfileScreen />', () => {
  test('renders correctly', () => {
    const { getByText, getByTestId } = render(<ProfileScreen />);
    
    // Verifica che il titolo "Profile" sia presente nel componente
    expect(getByText('Profile')).toBeDefined();
    
    // Verifica che il pulsante di logout sia presente
    expect(getByText('LogOut')).toBeDefined();
    
    // Verifica che l'immagine del profilo sia presente
    const profileImage = getByTestId('profile-image');
    expect(profileImage).toBeDefined();
  });

  test('handles logout correctly', () => {
    const { getByText } = render(<ProfileScreen />);
    const logoutButton = getByText('LogOut');

    // Simula il click sul pulsante di logout
    fireEvent.press(logoutButton);

    // Verifica che la funzione di logout sia stata chiamata
    expect(require('@react-native-firebase/auth').signOut).toHaveBeenCalled();
  });
});
