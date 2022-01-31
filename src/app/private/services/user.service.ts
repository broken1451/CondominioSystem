import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { UserResponse, User, UserUpdateResponse, UserRequestCreated } from '../interfaces/userInterface';
import { SubirArchivoService } from './subirImgUser.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new Subject<any>();
  public user: any;
  public token: string;
  public itemsObservable$ = this.userSubject.asObservable();

  constructor(private httpClient: HttpClient, private subirArchivoService: SubirArchivoService ,private router: Router) { 
    this.token =  localStorage.getItem('token')!;
    this.user =  JSON.parse(localStorage.getItem('usuario')!);
  }


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
  
  getUserById(id:string): any{
    try {
      return this.httpClient.get(`${environment.url}/user/${id}`).pipe(
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


  createuser(user: UserRequestCreated): any{
    try {

      return this.httpClient.post(`${environment.url}/create-user`, user).pipe(
        tap((users: any) => {
        }),
        map((users: any) => {
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

  cambiarImagen(archivo: File, id: string) {
    try {
      this.subirArchivoService.subirArchivo(archivo, id).then((data: any) => {
        console.log(this.user);
        this.user.userLogin.img = data?.user?.img;
        console.log(this.user);
        this.userSubject.next(this.user);
        localStorage.setItem('usuario',JSON.stringify(this.user))
        console.log({data});
      }).catch((err) => {
        console.log(err);
      });
    } catch (error) {
      console.log(error);
    }
  }
}
