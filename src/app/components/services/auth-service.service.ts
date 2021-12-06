import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { UserLoginRequest, UserLoginResponse } from '../interfaces/user.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario!: UserLoginResponse;
  public token!: string;

  get userGet(): UserLoginResponse {
    return { ...this._usuario }
  }

  set userSet(value: UserLoginResponse) {
    this._usuario = value;
  }

  constructor(private httpClient: HttpClient, private router: Router) {
    this.cargarStorage();
  }


  login(userLoginRequest: UserLoginRequest, recordar?: boolean): Observable<boolean> {
    const { email, password } = userLoginRequest;
    const body = {
      email, password
    }

    if (recordar) {
      localStorage.setItem('email', JSON.stringify(email));
    } else {
      localStorage.removeItem('email');
    }

    return this.httpClient.post<UserLoginResponse>(`${environment.url}/login`, body).pipe(
      take(1),
      tap((user) => {
        if (user.ok) {
          this.guardarStorage(user.userLogin._id, user.token, user)
        }
      }),
      map((user) => {
        return user.ok;
      }),
      catchError((err) => {
        Swal.fire('Error', err.error.errors.message, 'error');
        return throwError(err.error.errors.message);
      })
    );
  }


  guardarStorage(id: string, token: string, usuario: UserLoginResponse, menu?: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.userSet = usuario;
    this.token = token;

  }


  cargarStorage() {
    if (localStorage.getItem('token') || localStorage.getItem('usuario')) {
      this.userSet = JSON.parse(localStorage.getItem('usuario')!);
      console.log('this.userSet', this.userGet)
      this.token = localStorage.getItem('token')!;
    } else {
      this.userSet = { ok: false, token: '', userLogin: { __v: 0, _id: '', created: null, email: '', img: '', name: '', password: '' } };
      this.token = '';
      console.log('  this.userGet  cargarstorage', this.userGet)
    }
  }

  logout() {
    this.userSet = { ok: false, token: '', userLogin: { __v: 0, _id: '', created: null, email: '', img: '', name: '', password: '' } };
    this.token = '';
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
  }
}
