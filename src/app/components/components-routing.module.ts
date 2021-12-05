import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotPageFoundComponent } from './not-page-found/not-page-found.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: {titulo: 'Login', descrip: 'Esto es la pagina de login'}
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: {titulo: 'Registro', descrip: 'Esto es la pagina de registro'}
      },
      { path: '**', component: LoginComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
