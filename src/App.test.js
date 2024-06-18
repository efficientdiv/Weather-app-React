import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

jest.mock('./WeatherDetail', () => () => <div>WeatherDetail Component</div>);

global.navigator.geolocation = {
  getCurrentPosition: jest.fn().mockImplementation((success) =>
    success({ coords: { latitude: 35, longitude: 139 } })
  )
};

describe('App Component', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test('renders loading state initially', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('fetches and displays weather data', async () => {
    fetch.mockResponses(
      [
        JSON.stringify({
          weather: [{ main: 'Clear', description: 'clear sky' }],
          main: { temp: 25 },
          name: 'Tokyo',
        }),
        { status: 200 },
      ],
      [
        JSON.stringify({
          list: [
            { dt_txt: '2024-06-18 12:00:00', weather: [{ main: 'Clear' }], main: { temp: 25 } },
            { dt_txt: '2024-06-19 12:00:00', weather: [{ main: 'Clear' }], main: { temp: 25 } },
            { dt_txt: '2024-06-20 12:00:00', weather: [{ main: 'Clear' }], main: { temp: 25 } },
            { dt_txt: '2024-06-21 12:00:00', weather: [{ main: 'Clear' }], main: { temp: 25 } },
          ]
        }),
        { status: 200 }
      ]
    );

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('25°C')).toBeInTheDocument();
      expect(screen.getByText('Clear sky')).toBeInTheDocument();
      expect(screen.getByText('Tokyo')).toBeInTheDocument();
    });

    const forecastCards = screen.getAllByRole('button');
    expect(forecastCards).toHaveLength(4);
  });

  test('toggles temperature unit', async () => {
    fetch.mockResponses(
      [
        JSON.stringify({
          weather: [{ main: 'Clear', description: 'clear sky' }],
          main: { temp: 25 },
          name: 'Tokyo',
        }),
        { status: 200 },
      ],
      [
        JSON.stringify({
          list: [
            { dt_txt: '2024-06-18 12:00:00', weather: [{ main: 'Clear' }], main: { temp: 25 } },
            { dt_txt: '2024-06-19 12:00:00', weather: [{ main: 'Clear' }], main: { temp: 25 } },
            { dt_txt: '2024-06-20 12:00:00', weather: [{ main: 'Clear' }], main: { temp: 25 } },
            { dt_txt: '2024-06-21 12:00:00', weather: [{ main: 'Clear' }], main: { temp: 25 } },
          ]
        }),
        { status: 200 }
      ]
    );

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('25°C')).toBeInTheDocument();
    });

    const toggleButton = screen.getByText('°C');
    fireEvent.click(toggleButton);

    await waitFor(() => {
      expect(screen.getByText('77°F')).toBeInTheDocument(); // 25°C is approximately 77°F
    });
  });

  test('handles city search', async () => {
    fetch.mockResponses(
      [
        JSON.stringify({
          weather: [{ main: 'Clear', description: 'clear sky' }],
          main: { temp: 25 },
          name: 'Tokyo',
        }),
        { status: 200 },
      ],
      [
        JSON.stringify({
          list: [
            { dt_txt: '2024-06-18 12:00:00', weather: [{ main: 'Clear' }], main: { temp: 25 } },
            { dt_txt: '2024-06-19 12:00:00', weather: [{ main: 'Clear' }], main: { temp: 25 } },
            { dt_txt: '2024-06-20 12:00:00', weather: [{ main: 'Clear' }], main: { temp: 25 } },
            { dt_txt: '2024-06-21 12:00:00', weather: [{ main: 'Clear' }], main: { temp: 25 } },
          ]
        }),
        { status: 200 }
      ]
    );

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('25°C')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search city...');
    fireEvent.change(searchInput, { target: { value: 'New York' } });
    fireEvent.keyPress(searchInput, { key: 'Enter', code: 'Enter', charCode: 13 });

    fetch.mockResponseOnce(JSON.stringify({
      weather: [{ main: 'Clouds', description: 'overcast clouds' }],
      main: { temp: 20 },
      name: 'New York',
    }));

    await waitFor(() => {
      expect(screen.getByText('20°C')).toBeInTheDocument();
      expect(screen.getByText('Overcast clouds')).toBeInTheDocument();
      expect(screen.getByText('New York')).toBeInTheDocument();
    });
  });
});
