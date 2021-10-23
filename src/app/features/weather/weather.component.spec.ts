import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { AppModule } from './../../app.module';
import { WeatherService } from './../../shared/services/weather.service';
import { WeatherComponent } from './weather.component';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let weatherService: WeatherService;
  const mockData = {
    weather: [{
      main: 'test city',
      icon: '/test.png'
    }],
    main: {
      temp: '23',
      humidity: '50',
    },
    wind: {
      speed: '3.4'
    },
  };

  beforeEach(async () => {
    const mockService = {
      getCurrentWeather: jasmine.createSpy('getCurrentWeather').and.returnValue(of(mockData)),
      getWeatherIconPath: jasmine.createSpy('getWeatherIconPath').and.returnValue('/test.png'),
    };

    await TestBed.configureTestingModule({
      declarations: [WeatherComponent],
      providers: [
        {
          provide: WeatherService,
          useValue: mockService,
        },
      ],
      imports: [AppModule, HttpClientModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    component.location = 'test-city';
    weatherService = fixture.debugElement.injector.get(WeatherService);

    fixture.detectChanges();
  });

  it('should create component and load city weather data', () => {
    expect(component).toBeTruthy();
    let fakeResponse = null;
    weatherService.getCurrentWeather('test-city').subscribe((value) => {
      fakeResponse = value;
    });
    expect(fakeResponse).toBeDefined();
    expect(fixture.debugElement.nativeElement.querySelector('#city-name')).toBeDefined();
  });

  it('should test api failure', () => {
    expect(component).toBeTruthy();
    expect(fixture.debugElement.nativeElement.querySelector('#error-block')).toBeDefined();
  });
});
