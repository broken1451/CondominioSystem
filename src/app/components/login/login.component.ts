import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginRequest } from '../interfaces/user.interfaces';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form!: FormGroup;

  get emailErrMsg(): string {
    const errors = this.form.get('email')?.errors;
    if (errors?.required) {
      return 'El email es obligatorio';
    } else if (errors?.pattern) {
      return 'El email no tiene el formato correcto';
    } else {
      return '';
    }
  }

  get passErrMsg(): string {
    const errors = this.form.get('password')?.errors;
    if (errors?.required) {
      return 'El password es obligatorio';
    } if(errors?.minlength?.requiredLength){
      return 'El password debe ser mayor a 5 caracteres'
    } else {
      return '';
    }
  }

  get formValues(){
    return this.form?.controls;
  }


  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['test@test.com',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['123456', [Validators.required, Validators.minLength(6)]],
      recuerdame: [false]
    });
    
    if (localStorage.getItem('email')) {
      this.formValues.email.setValue(JSON.parse(localStorage.getItem('email')!))
      this.formValues.recuerdame.setValue({recuerdame: true});
    } else {
      this.formValues.recuerdame.setValue(false);
    }
  }

  login(){
    if (this.form.invalid) {
      return;
    }

    const UserLogin: UserLoginRequest ={
      email: this.formValues.email.value,
      password: this.formValues.password.value,
      recuerdame: this.formValues.recuerdame.value,
    }

    this.authService.login(UserLogin, UserLogin.recuerdame).subscribe(res=>{
      console.log({ res });
      if (res) {
        this.router.navigate(['/private/dashboard']);
      }
    })
    // console.log({UserLogin})

  }

  campoNoEsValido(campo: string) {
    return (
      this.form.get(campo)?.invalid && this.form.get(campo)?.touched
    );
  }
}
