import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsComponent } from './components/components.component';
import { TokenValidateGuard } from './private/guards/token-validate.guard';
import { PrivateComponent } from './private/private.component';

const routes: Routes = [
  {
    path: 'home',
    component: ComponentsComponent,
    loadChildren: () =>
      import('./components/components.module').then((m) => m.ComponentsModule),
  },
  {
    path: 'private',
    canActivate: [TokenValidateGuard],
    component: PrivateComponent,
    loadChildren: () =>
      import('./private/private.module').then((m) => m.PrivateModule),
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
