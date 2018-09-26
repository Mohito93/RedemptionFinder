import {Component, Inject} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';
import {LocationService} from './service/locationService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-poc';
  protected departure: String;
  private searching: Boolean = false;
  private searchFailed: Boolean = false;

  constructor( @Inject(LocationService ) private locationService: LocationService) {}

  public onSubmit = () => console.log('form submitted');

  public searchDeparture = (text$: Observable<String>) => {
    return text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.locationService.getLocation(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })
        )),
      tap(() => this.searching = false)
    );
  }
}
