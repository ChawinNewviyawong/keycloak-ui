import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

const headers = new HttpHeaders({
  "Content-Type": "application/json",
});

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient,
    private cookieService: CookieService) { }

  register(body) {
    const url = environment.profileURL + '/register';
    return this.http.post<any>(url, body, { headers: headers, observe: 'response' })
      .pipe(
        catchError(this.handleError)
      );
  }

  changePassword(password) {
    const url = environment.profileURL + '/resetPassword';
    let body = {
      newPassword: password.newPassword,
      accessToken: this.cookieService.get('accessToken'),
    }
    return this.http.post<any>(url, body, { headers: headers, observe: 'response' })
      .pipe(
        catchError(this.handleError)
      );
  }

  getProfile(token) {
    const url = environment.profileURL + '/getProfile';
    return this.http.post<any>(url, token, { headers: headers, observe: 'response' })
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
      error);
  };
}
