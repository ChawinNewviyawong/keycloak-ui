import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';

const headers = new HttpHeaders({
  // "Content-Type": "application/x-www-form-urlencoded",
  "Content-Type": "application/json",
  "Authorization": localStorage.getItem('accessToken'),
});

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  requestToken(user) {
    // const url = environment.authURL + '/auth/realms/master/protocol/openid-connect/token';
    const url = environment.profileURL + '/getToken';
    let body = {
      grant_type: 'password',
      username: user.username,
      password: user.password,
      client_id: environment.client_id,
      client_secret: environment.client_secret,
      realms: environment.realms,
    }
    
    return this.http.post<any>(url, body, {headers: headers, observe: 'response'})
      .pipe(
        catchError(this.handleError)
      );
  }

  refreshToken(refreshToken) {
    const url = environment.profileURL + '/getNewToken';
    let body = {
      grant_type: 'refresh_token',
      client_id: environment.client_id,
      client_secret: environment.client_secret,
      refreshToken: refreshToken,
    }
    
    return this.http.post<any>(url, body, {headers: headers, observe: 'response'})
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
