import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { UserResponse, User, UserUpdateResponse } from '../interfaces/userInterface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private router: Router) { }


  getUser(): any{
    try {
      return this.httpClient.get(`${environment.url}/user`).pipe(
        tap((users: any) => {
        }),
        map((users: UserResponse) => {
          return users;
        }),
        catchError((err) => {
          Swal.fire('Error', err.error.errors.message, 'error');
          return throwError(err.error.errors.message);
        })
      )
    } catch (error) {
      console.log({ error })
    }
  }

  deleteUser(userDeleted: User): any{
    try {
      return this.httpClient.delete(`${environment.url}/delete-user/${userDeleted._id}`).pipe(
        catchError((err) => {
          Swal.fire('Error', err.error.errors.message, 'error');
          return throwError(err.error.errors.message);
        })
      )
    } catch (error) {
      console.log({error})
    }
  }

  updateUser(updateUser: User): any{
    try {
      console.log({updateUser});
      return this.httpClient.put(`${environment.url}/update-user/${updateUser._id}`, updateUser).pipe(
        tap((users: any) => {
        }),
        map((users: UserUpdateResponse) => {
          return users;
        }),
        catchError((err) => {
          Swal.fire('Error', err.error.errors.message, 'error');
          return throwError(err.error.errors.message);
        })
      )
    } catch (error) {
      console.log({error})
    }
  }
}
