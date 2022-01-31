import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserResponse, User, UserRequestCreated, UserResponseCreated } from '../interfaces/userInterface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { sonIguales } from '../utils/sonIguales';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user!: any;
  public form!: FormGroup;
  public formCreate!: FormGroup;
  public imagenSubir!: any;
  public imagenSubirTemp: any;
  public loading!: boolean
  public cont!: number
  @ViewChild('barraProgreso', { static: true }) barraProgreso!: ElementRef;
  public user$!: Subscription;
  public idUser!: string;

  get formValues() {
    return this.form.controls;
  }

  get formNew() {
    return this.formCreate.controls;
  }

  get passErrMsg(): string {
    const errors = this.formCreate.get('password')?.errors;
    if (errors?.required) {
      return 'El password es obligatorio';
    } if (errors?.minlength?.requiredLength) {
      return 'El password debe ser mayor a 5 caracteres'
    } else {
      return '';
    }
  }

  get pass2ErrMsg(): string {
    const errors = this.formCreate.get('password2')?.errors;
    if (errors?.required) {
      return 'El password es obligatorio';
    } if (errors?.minlength?.requiredLength) {
      return 'El password debe ser mayor a 5 caracteres'
    } else {
      return '';
    }
  }

  get emailErrMsg(): string {
    const errors = this.formCreate.get('email')?.errors;
    if (errors?.required) {
      return 'El email es obligatorio';
    } else if (errors?.pattern) {
      return 'El email no tiene el formato correcto';
    } else {
      return '';
    }
  }

  get nameErrMsg(): string {
    const errors = this.formCreate.get('name')?.errors;
    if (errors?.required) {
      return 'El nombre es obligatorio';
    } if (errors?.minlength?.requiredLength) {
      return 'El nombre debe ser mayor a 5 caracteres'
    } else {
      return '';
    }
  }

  constructor(private fb: FormBuilder, private activateRoute: ActivatedRoute, private userService: UserService, private router: Router) {
    // capturar info mediante otra forma al activate route
    // console.log(history.state.user.name)
    // this.activateRoute.params.subscribe((params:Params) => {
    //   console.log(params)
    // })    
    // this.activateRoute.queryParams.subscribe((params:Params) => {
    //   console.log(params)
    // })
    this.activateRoute.params.pipe(
      switchMap(({ id }) => {
        this.idUser = id;
        return this.getUserById(id)
      })
    ).subscribe((res) => {
      this.user = res.user
      // ({value: 'Nancy', disabled: true}, Validators.required),
      this.formValues.name.setValue(this.user.name);
      this.formValues.email.setValue(this.user.email);
      console.log(res);
    });
  }

  ngOnInit(): void {
    this.cont = 0;
    $('#myModal').modal({
      backdrop: true,
      show: false
    })


    this.form = this.fb.group({
      name: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(6)]],
      email: [{ value: '', disabled: true },
      [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
      ],
    });

    this.formCreate = this.fb.group({
      name: [{ value: '', disabled: false }, [Validators.required, Validators.minLength(6)]],
      email: [{ value: '', disabled: false },
      [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
      ],
      password: [{ value: '', disabled: false }, [Validators.required, Validators.minLength(6)]],
      password2: [{ value: '', disabled: false }, [Validators.required, Validators.minLength(6)]],
    }, { validators: sonIguales('password', 'password2') });

    this.user$ = this.userService.itemsObservable$.subscribe((data) => {
      this.user = data.userLogin;
    });
  }

  getUserById(id: string): Observable<UserResponse> {
    return this.userService.getUserById(id)
  }


  createUser() {
    try {
      if (this.formCreate.invalid) {
        return;
      }

      const usuario: UserRequestCreated = {
        name: this.formNew.name.value,
        email: this.formNew.email.value,
        password: this.formNew.password.value
      }

      this.userService.createuser(usuario)?.subscribe((userCreated: UserResponseCreated)=>{
        console.log({userCreated});
        $('#myModal').modal('hide');
        Swal.fire({
          title: 'Actualizado existosamente',
          text: `Usuario  ${userCreated.userCreated.name} existosamente creado`,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          icon: 'success',
          confirmButtonText: 'ok!',
          showCancelButton: false,
          allowOutsideClick: false,
        });
      })
    } catch (error) {

      console.log({ error });
    }
  }

  campoNoEsValido(campo: string) {
    return (
      this.formCreate.get(campo)?.invalid && this.formCreate.get(campo)?.touched
    );
  }


  selectImg(){
    console.log('here');

  }

  seleccionImage(archivo: any){
    try {
      const file = archivo.files[0];
      console.log({file});
      if (!file) {
        this.imagenSubir = null;
        return;
      }
      if (file.type.indexOf('image') < 0) {
        Swal.fire(
          'Solo se permiten imagenes',
          'El archivo seleccionado no es una imagen',
          'error'
        );
        this.imagenSubir = null;
        return;
      }
      this.imagenSubir = file;
      // Cargar imagen temporal
      const reader = new FileReader();
      const urlImagenTemp = reader.readAsDataURL(file);
      reader.onload = () => {
        this.imagenSubirTemp = reader.result;
        // console.log(reader.result);
      };
    } catch (error) {
      console.log(error);
    }
  }

  cambiarImagen() {
    try {
      console.log( {userlogged: this.user._id});
      console.log({idUser: this.idUser});
      const userLocalLogin = JSON.parse( localStorage.getItem('usuario')!);
      if (userLocalLogin.userLogin._id != this.idUser) {
        console.log({userLocalLogin});
        Swal.fire(
          'No puedes actualizar la foto si no estas con tu usuario',
          'No puedes actualizar',
          'error'
        );
      }else {
        this.loading = true;
        const interval = setInterval(() => {
          this.loading = true;
          console.log(this.barraProgreso);
          if (this.cont < 100) {
            // console.log(' this.cont primer if ', this.cont);
            this.cont = this.cont + 20;
            this.barraProgreso.nativeElement.style.width = this.cont + '%';
            this.barraProgreso.nativeElement.textContent = this.cont + '%';
            if (this.cont >= 100) {
             
              this.userService.cambiarImagen(this.imagenSubir, this.user._id);
              setTimeout(() => {
                this.imagenSubirTemp = null;
                this.imagenSubir = null;
              }, 800);
            }
          }
          if (this.cont === 100) {
            clearInterval(interval);
            setTimeout(() => {
              this.cont = 0;
              this.barraProgreso.nativeElement.style.width = this.cont + '%';
            }, 900);
          }
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  }


}
