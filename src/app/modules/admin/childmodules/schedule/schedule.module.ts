import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleUpdateComponent } from './schedule-update/schedule-update.component';
import { ScheduleCreateComponent } from './schedule-create/schedule-create.component';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ScheduleUpdateComponent,
    ScheduleCreateComponent,
    ScheduleListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ScheduleRoutingModule
  ]
})
export class ScheduleModule { }
