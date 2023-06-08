import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleFindComponent } from './schedule-find/schedule-find.component';

const routes: Routes = [{
  path: 'events',
  component: ScheduleFindComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
