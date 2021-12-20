import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { UserResponse } from '../interfaces/userInterface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private router: Router) { }


  getUser(){
    return this.httpClient.get(`${environment.url}/user`).pipe(
      tap((users: any)=>{
        console.log({users})
      }),
      map((users:UserResponse) => {
        console.log({u:users})
        return users;
      }),
      catchError((err) => {
        Swal.fire('Error', err.error.errors.message, 'error');
        return throwError(err.error.errors.message);
      })
    )
  }
}
