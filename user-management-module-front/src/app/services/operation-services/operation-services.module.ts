import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationServicesRoutingModule } from './operation-services-routing.module';
import { OperationServicesComponent } from './operation-services.component';


@NgModule({
  declarations: [
    OperationServicesComponent
  ],
  imports: [
    CommonModule,
    OperationServicesRoutingModule
  ]
})
export class OperationServicesModule { }
