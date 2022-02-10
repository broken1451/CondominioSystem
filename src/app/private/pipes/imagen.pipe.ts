import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(imagen: string): any {

    if (!imagen || imagen === '') {
      return `${environment.url}/get-img-user/sds`;
    }

    return `${environment.url}/get-img-user/${imagen}`;
  }

}