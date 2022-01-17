import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MomentModule } from 'angular2-moment';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    PrivateComponent,
    DashboardComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    MomentModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PrivateModule { }
