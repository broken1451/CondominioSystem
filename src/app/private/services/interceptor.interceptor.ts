import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/components/services/auth-service.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import Swal from 'sweetalert2';

@Injectable()
export class InterceptorService implements HttpInterceptor {


  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    console.log('paso por el interceptor');
    const token: string = localStorage.getItem('token')!;
    let headers = req.headers;
    let request = req;

    headers = headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.append('Access-Control-Allow-Methods', 'POST,GET,DELETE,PATCH,PUT');
    request = request.clone({
      headers
    });

    if (request.method === 'OPTIONS') {
      return next.handle(request).pipe(
        map(event => {
          console.log('options')
          return event;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
    }
    console.log(`Intercept service: ${request.url}, method: ${request.method}, request: ${JSON.stringify(request.body)}`);
    console.log({ request })

    if (request.url.includes('/update-user')) {
      console.log('es user', token)
      headers = headers.append('x-token', `${token}`);
      request = req.clone({
        headers
        // setHeaders: {
        //   'x-token': `${token}`,
        // },
      });
      return next.handle(request).pipe(catchError(this.manejarErr)); // Deja pasar todo
    }

    console.log({ request });
    return next.handle(request).pipe(catchError(this.manejarErr));;
  }

  manejarErr(err: HttpErrorResponse) {
    console.log('ERROR EN EL SERVIDOR', err);
    console.warn(err);
    Swal.fire({
      title: 'ERROR EN EL SERVIDOR',
      text: `${err.error.mensaje}`,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      icon: 'error',
      confirmButtonText: 'OK',
      showCancelButton: false,
      allowOutsideClick: false,
    });
    return throwError(err);
  }
}
