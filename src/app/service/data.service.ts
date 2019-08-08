import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService) { }

  getDataList(accessToken) {
    const url = environment.dataURL + '/getAllProductByOwner';
    const headers = new HttpHeaders({
      "Authorization": "Bearer " + accessToken,
    });
    return this.httpClient.post<any>(url, {}, {headers: headers, observe: 'response'})
      .pipe(
        catchError(this.handleError)
      );
  }

  updateProduct(product) {
    const url = environment.dataURL + '/updateProduct';
    const headers = new HttpHeaders({
      "Authorization": "Bearer " + this.cookieService.get('accessToken'),
      "Content-Type": "application/json",
    });
    return this.httpClient.post<any>(url, product, {headers: headers, observe: 'response'})
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
