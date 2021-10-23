import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { WeatherService } from '../../shared/services/weather.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnDestroy {
  private subscriptions = new Subscription();
  locationControl = new FormControl('');

  constructor(
    private weatherService: WeatherService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  searchAndAddCity(): void {
    if (!this.locationControl.value) {
      return;
    }
    this.subscriptions.add(
      this.weatherService.isCityFound(this.locationControl.value)
        .subscribe(
          () => {
            this.weatherService.addCityToCard(this.locationControl.value);
            this.showSnackBar(`City ${this.locationControl.value.toUpperCase()} added to dashboard.`, 'blue-snackbar');
            this.locationControl.setValue('');
          },
          () => {
            this.showSnackBar(`City ${this.locationControl.value.toUpperCase()} not found.`, 'red-snackbar');
          },
        ),
    );
  }

  private showSnackBar(text: string, cssClass: string) {
    this.snackBar.open(text, '✕', {
      duration: 3000,
      panelClass: [cssClass],
    });
  }
}
