import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleFindComponent } from './schedule-find/schedule-find.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ScheduleFindComponent,
  ],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [ScheduleFindComponent]
})
export class ScheduleModule { }
