import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForecastComponent } from './features/forecast/forecast.component';
import { SearchBarComponent } from './features/search-bar/search-bar.component';
import { WeatherComponent } from './features/weather/weather.component';
import { HeaderComponent } from './layout/header/header.component';
import { HomePageComponent } from './layout/home-page/home-page.component';
import { AngularMaterialModule } from './shared/modules/angular-material.module';
import { WeatherService } from './shared/services/weather.service';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    ForecastComponent,
    HomePageComponent,
    SearchBarComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
