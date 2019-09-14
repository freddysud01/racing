import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import {MemberInfo} from './models/memberInfo';
import { Observable, of } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class AppService {

public CurrentMembers: Array<MemberInfo>=[];


  // If false, the application will run on 4200 and call json-server directly
  // If true, the application will utilize node API
  DEBUG: Boolean = true;
  api: string;
  username: string;

  constructor(private http: HttpClient) {
    if (this.DEBUG) {
      this.api = 'http://localhost:3000';
    } else {
      this.api = 'http://localhost:8000/api';
    }
  }

  // Returns all members
  getMembers():Observable<MemberInfo[]> {
   // return this.http.get(`${this.api}/members`).pipe(catchError(this.handleError));
   return of(this.CurrentMembers);
  }

  addMember(memberForm) {}

  getTeams() {}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return [];
  }
}
