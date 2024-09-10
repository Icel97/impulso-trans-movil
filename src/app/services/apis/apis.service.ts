import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment as ENV } from 'src/environments/environment';
import { CommonFunctions } from 'src/app/utils/commonFuctions';

@Injectable({
  providedIn: 'root'
})
export class ApisService {
  private apiUrl = ENV.API;

  constructor(
    private http: HttpClient,
    private common: CommonFunctions
  ) { }

  get(endpoint: string) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.get(`${this.apiUrl}${endpoint}`, { headers })
        .pipe(
          catchError(this.handleError.bind(this))
        )
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(this.handleError(err));
        });
    });
  }

  post(url: string, data: any){
    console.log('POST data:', data);
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post(`${this.apiUrl}${url}`, data, { headers })
        .pipe(
          catchError(this.handleError.bind(this))
        )
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  put(url: string, data: any) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.put(`${this.apiUrl}${url}`, data, { headers })
        .pipe(
          catchError(this.handleError.bind(this))
        )
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(this.handleError(err));
        });
    });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error);
    let errorMessage = 'Algo salió mal con la solicitud a la API.';
    let fieldErrors = {};

    if (error.error && error.error.errors) {
        fieldErrors = error.error.errors;
        errorMessage = `Errores: ${JSON.stringify(fieldErrors)}`;
    } else if (error.error && error.error.message) {
        errorMessage = `Error: ${error.status} - ${error.error.message}`;
    } else if (error.message) {
        errorMessage = `Error: ${error.status} - ${error.message}`;
    }
    this.common.showAlert('Error', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
