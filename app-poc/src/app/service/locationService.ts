import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class LocationService {

  private departureUrl = 'http://aviation-edge.com/v2/public/flights?key=1c323b-9214cc&&depIata=';

  constructor(private http: HttpClient) { }

  getLocation = (searchString) => this.http.get(this.departureUrl + searchString);
}
