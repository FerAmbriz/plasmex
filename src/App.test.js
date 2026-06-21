import { render } from '@testing-library/react';
import React from 'react';
import ParticleBackground from './components/ParticleBackground';

test('renders ParticleBackground canvas component without crashing', () => {
  const { container } = render(<ParticleBackground />);
  
  // Verify that the canvas element is successfully rendered
  const canvasElement = container.querySelector('canvas');
  expect(canvasElement).toBeInTheDocument();
  expect(canvasElement).toHaveStyle({
    position: 'fixed',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
  });
});
