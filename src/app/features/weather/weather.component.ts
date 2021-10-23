import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, map, mapTo, startWith, catchError } from 'rxjs/operators';
import { Weather } from '../../shared/models/weather.model';
import { WeatherService } from '../../shared/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  @Input() location = '';
  currentWeather$ = new Observable<Weather | null>();
  apiLoading$ = new Observable<boolean>();
  apiError$ = new Observable<boolean>();

  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.currentWeather$ = this.weatherService.getCurrentWeather(this.location).pipe(catchError(() => of(null)));
    this.apiLoading$ = this.currentWeather$.pipe(mapTo(false), startWith(true), distinctUntilChanged());
    this.apiError$ = this.currentWeather$.pipe(map((value) => !value));
  }

  getIcon(weatherType: string): string {
    return this.weatherService.getWeatherIconPath(weatherType);
  }
}
