import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Statistics } from '../../../pages/about';
import { ABOUT_STATISTICS } from '../../../models';

// Mock the icons
vi.mock('react-icons/fi', async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  return {
    ...actual,
    FiClock: () => <div data-testid="clock-icon"></div>,
    FiAward: () => <div data-testid="award-icon"></div>,
    FiLayers: () => <div data-testid="layers-icon"></div>,
    FiTarget: () => <div data-testid="target-icon"></div>,
  };
});

describe('Statistics component', () => {
  it('should render the statistics correctly', () => {
    render(<Statistics />);
    
    ABOUT_STATISTICS.forEach(stat => {
      expect(screen.getByText(stat.label)).toBeInTheDocument();
      const valueElement = screen.getAllByText(stat.value);
      expect(valueElement.length).toBeGreaterThan(0);
    });

    // Check if icons are rendered
    expect(screen.getByTestId('clock-icon')).toBeInTheDocument();
    expect(screen.getByTestId('award-icon')).toBeInTheDocument();
    expect(screen.getByTestId('layers-icon')).toBeInTheDocument();
    expect(screen.getByTestId('target-icon')).toBeInTheDocument();
  });
});
