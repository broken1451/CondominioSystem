import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TokenValidateGuard } from './guards/token-validate.guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [TokenValidateGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { titulo: 'Dashboard', descrip: 'Esto es la pagina de dashboard' }
      },
      {
        path: 'profile/:id',
        // path: 'profile',
        component: ProfileComponent,
        data: { titulo: 'Profile', descrip: 'Esto es la pagina de profile' }
      },
      { path: '**', component: DashboardComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
