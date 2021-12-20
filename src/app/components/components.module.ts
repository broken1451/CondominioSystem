import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComponentsRoutingModule } from './components-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ComponentsComponent } from './components.component';
import { NotPageFoundComponent } from './not-page-found/not-page-found.component';
import { PrivateModule } from '../private/private.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ComponentsComponent,
    NotPageFoundComponent,
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrivateModule
  ],
})
export class ComponentsModule {}
