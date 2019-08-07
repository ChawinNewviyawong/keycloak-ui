import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

const headers = new HttpHeaders({
  "Authorization": "Bearer " + localStorage.getItem('accessToken'),
});

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getProfile(token) {
    const url = environment.profileURL + '/getProfile';
    const httpOptions = {
      headers: headers,
    };
    return this.httpClient.post<any>(url, token, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getDataList() {
    const url = environment.dataURL + '/getAllProductByOwner';
    const httpOptions = {
      headers: headers,
    };
    return this.httpClient.post<any>(url, "", httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${JSON.stringify(error.status)}, ` +
        `body was: ${JSON.stringify(error.error)}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
