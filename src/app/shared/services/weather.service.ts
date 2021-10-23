import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Forecast, Weather } from '../models/weather.model';
const API_KEY: string = environment.apiKey;
const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private location$ = new BehaviorSubject('');

  constructor(private http: HttpClient) { }

  getSearchedCity(): Observable<string> {
    return this.location$.asObservable();
  }

  addCityToCard(location: string) {
    this.location$.next(location);
  }

  getCurrentWeather(location: string): Observable<Weather> {
    return this.http.get<Weather>(`${API_URL}/weather?q=${location}&appid=${API_KEY}&units=metric`)
      .pipe(publishReplay(1), refCount());
  }

  getForecast(location: string): Observable<Forecast> {
    return this.http.get<Forecast>(`${API_URL}/forecast?q=${location}&appid=${API_KEY}&units=metric`)
      .pipe(publishReplay(1), refCount());
  }

  getWeatherForecast$(location: string): Observable<[Weather, Forecast]> {
    return combineLatest([
      this.getCurrentWeather(location),
      this.getForecast(location),
    ]);
  }

  isCityFound(location: string): Observable<boolean> {
    return this.getCurrentWeather(location).pipe(map(() => true));
  }

  getWeatherIconPath(weatherType: string): string {
    return `${environment.iconPath}${weatherType}@2x.png`;
  }
}
