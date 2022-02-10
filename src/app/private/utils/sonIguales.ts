import { FormGroup } from '@angular/forms';

export const sonIguales = (campo1: string, campo2: string) => {
    // Retornar una funcion
    return (group: FormGroup) => {
      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;
      // console.log({ grupo: group});

      if (pass1 === pass2) {
        return null;
      }

      return {
        sonIguales: true,
      };
    };
}