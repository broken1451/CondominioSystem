import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/components/services/auth-service.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class TokenValidateGuard implements CanActivate, CanLoad {


  constructor(private router: Router, private authService: AuthService) {

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('guard')
    try {
      // tslint:disable-next-line: curly
      if (this.authService.estaLogueado()) return true;
      else {
        this.router.navigate(['/home/login']);
        Swal.fire({
          title: 'Bloqueado',
          text: 'Debe estar autenticado para ver el contenido',
          icon: 'warning',
          showCancelButton: false,
          allowOutsideClick: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar'
        });
        return false;
      }
    } catch (error) {
      console.log(error);
    }
    return false
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
