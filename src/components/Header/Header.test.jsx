import { render, screen } from '@testing-library/react';
import Header from './index';

test('renders learn react link', () => {
  render(<Header />);
  expect(screen.getByTestId('Header')).toBeInTheDocument();
});
