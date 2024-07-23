import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpError } from '../Model/http.error.model';


@Injectable()
export class ErrorCodeService {

    baseURL: string = "http://localhost:3000/api/error/";

    constructor(private http: HttpClient) { }

    getHttpError(code: number): Observable<HttpError> {
        let params = new HttpParams();

        params = params.append('code', code.toString());
        return this.http.get<HttpError>(this.baseURL, { params })
    }

}