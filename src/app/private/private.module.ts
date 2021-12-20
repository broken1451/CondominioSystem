import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MomentModule } from 'angular2-moment';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PrivateComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    MomentModule,
    SharedModule
  ]
})
export class PrivateModule { }
