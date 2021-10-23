import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, distinctUntilChanged, map, mapTo, startWith } from 'rxjs/operators';
import { Forecast, Weather } from '../../shared/models/weather.model';
import { WeatherService } from '../../shared/services/weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  location = '';
  weatherForecast$ = new Observable<[Weather, Forecast] | null>();
  apiLoading$ = new Observable<boolean>();
  apiError$ = new Observable<boolean>();

  constructor(
    private weatherService: WeatherService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.params.subscribe((params) => {
        this.location = params.city;
        this.weatherForecast$ = this.weatherService.getWeatherForecast$(params.city).pipe(catchError(() => of(null)));
        this.apiLoading$ = this.weatherForecast$.pipe(mapTo(false), startWith(true), distinctUntilChanged());
        this.apiError$ = this.weatherForecast$.pipe(map((value) => !value));
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getIcon(weatherType: string): string {
    return this.weatherService.getWeatherIconPath(weatherType);
  }

  back(): void {
    this.router.navigate(['/home']);
  }
}
