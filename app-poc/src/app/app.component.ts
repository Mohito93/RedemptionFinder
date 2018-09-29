import {Component, Inject} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';
import {LocationService} from './service/locationService';
import { autocomplete } from 'air-port-codes-node';

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
  private apca;
  public airports = [];

  constructor( @Inject(LocationService ) private locationService: LocationService) {
    this.apca = autocomplete({
      key : 'c3de24bb0c',
      secret: '85e681392fa80d6',
      limit : 15
    });
  }

  public onSubmit = () => console.log('form submitted');

  // public searchDeparture = (text$: Observable<String>) => {
  //   return text$.pipe(
  //     debounceTime(300),
  //     distinctUntilChanged(),
  //     tap(() => this.searching = true),
  //     switchMap(term =>
  //       this.locationService.getLocation(term).pipe(
  //         tap(() => this.searchFailed = false),
  //         catchError(() => {
  //           this.searchFailed = true;
  //           return of([]);
  //         })
  //       )),
  //     tap(() => this.searching = false)
  //   );
  // }

  public searchDeparture = ($event) => {
    if ($event.length >= 3) {
      this.apca.request($event)
      this.apca.onSuccess = (data) => {
        this.airports = this.buildAirportList(data);
      };
    }
  }
    /**
     * This updates the response to add an appropriate label to each airport item
     * @param data the data we get back from the API
     */
     private buildAirportList = (data) => {
      const listAry = [];
      let thisAirport;

      if (data.status) { // success
        for (let i = 0, len = data.airports.length; i < len; i++) {
          thisAirport = data.airports[i];
          listAry.push(this.addAirportLabel(thisAirport));
          if (thisAirport.children) {
            for (let j = 0, jLen = thisAirport.children.length; j < jLen; j++) {
              listAry.push(this.addAirportLabel(thisAirport.children[j], true));
            }
          }
        }
      }
      return listAry;
    }

    /**
     * Creates the appropriate label. If it is a child it will add an indent arrow.
     * @param airport the object of a single airport
     * @param isChild a boolean letting us know if this airport is a child of another
     */
    private addAirportLabel = (airport, isChild?) => {
      let label;
      if (isChild) { // format children labels
        label = '&rdsh;' + airport.iata + ' - ' + airport.name;
      } else { // format labels
        label = airport.iata + ' - ' + airport.name;
      }
      airport.label = label;

      return airport;
    }
}
