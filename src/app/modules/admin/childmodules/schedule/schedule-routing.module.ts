import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { ScheduleCreateComponent } from './schedule-create/schedule-create.component';
import { ScheduleUpdateComponent } from './schedule-update/schedule-update.component';

const routes: Routes = [{
  path: 'schedule', 
  component: ScheduleListComponent, 
  },
  {
    path: 'create', 
    component: ScheduleCreateComponent, 
    },
    {
      path: 'edit/:id', 
      component: ScheduleUpdateComponent, 
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
