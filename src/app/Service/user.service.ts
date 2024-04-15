import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { User } from '../Model/user.model';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/user/employee';

  constructor(private http: HttpClient) {}

  // Get token headers
  private getTokenHeaders(): HttpHeaders {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token) {
      return new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json');
    } else {
      console.error('Token not found in local storage.');
      return new HttpHeaders().set('Content-Type', 'application/json');
    }
  }

  // Get user by username
  getUserByUsername(username: string): Observable<User | null> {
    const headers = this.getTokenHeaders();
    return this.http.get<User>(`${this.baseUrl}/${username}`,{ headers }).pipe(
      catchError(error => {
        console.error('Error fetching user details:', error);
        return of(null);
      })
    );
  } 

  // Update user by username
  updateUserByUsername(username: string, userData: any): Observable<User | null> {
    const headers = this.getTokenHeaders();
    return this.http.put<User>(`${this.baseUrl}/${username}/update`, userData, { headers });
  }


  updatePassword(username: string, oldPassword: string, newPassword: string): Observable<any> {
    const headers = this.getTokenHeaders();
    return this.http.put(`${this.baseUrl}/${username}/password`, { oldPassword, newPassword }, { headers });
  }

}
