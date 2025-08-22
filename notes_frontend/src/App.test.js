import { render, screen } from '@testing-library/react';
import App from './App';

test('renders application header and actions', () => {
  render(<App />);
  expect(screen.getByText(/Notes/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /New/i })).toBeInTheDocument();
});
