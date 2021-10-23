import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WeatherService } from '../../shared/services/weather.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  cities = ['Tokyo', 'Amsterdam', 'Kolkata', 'New York', 'Rovaniemi'];

  constructor(
    private router: Router,
    private weatherService: WeatherService,
  ) { }

  ngOnInit(): void {
    this.addSearchedCity();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  deleteCity(city: string): void {
    if (!city || this.cityIndex(city) === -1) {
      return;
    }
    this.cities.splice(this.cityIndex(city), 1);
  }

  forecastCity(city: string): void {
    this.router.navigate(['/forecast', city]);
  }

  private addSearchedCity(): void {
    this.subscriptions.add(
      this.weatherService.getSearchedCity().subscribe((city) => {
        if (!city || this.cityIndex(city) > -1) {
          return;
        }
        this.cities.push(city);
      }),
    );
  }

  private cityIndex(city: string): number {
    return this.cities.map(v => v.toLowerCase()).indexOf(city.toLowerCase());
  }
}
