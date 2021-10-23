export interface Weather {
  weather: [
    {
      main: string;
      description: string;
      icon: string;
    }
  ];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  sys?: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  dt: number;
  timezone: number;
  id: number;
  name: string;
}

export interface Forecast {
  message: number;
  list: Weather[];
  city: {
    name: string;
    coord: {
      lat: number;
      lon: number;
    },
    country: string;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}
