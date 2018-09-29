import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class LocationService {

  private departureUrl = 'https://www.air-port-codes.com/api/v1/multi?term=';

  private httpOptions = {
    headers: new HttpHeaders({
      'APC-Auth': 'c3de24bb0c',
    })
  };

  constructor(private http: HttpClient) { }

  getLocation = (searchString) => this.http.post(this.departureUrl + searchString, null, this.httpOptions);
}
