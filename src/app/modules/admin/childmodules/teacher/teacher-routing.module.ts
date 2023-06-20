import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { TeacherCreateComponent } from './teacher-create/teacher-create.component';
import { TeacherUpdateComponent } from './teacher-update/teacher-update.component';

const routes: Routes = [{
  path: 'teachers', 
  component: TeacherListComponent, 
  },
  {
    path: 'create', 
    component: TeacherCreateComponent, 
    },
    {
      path: 'edit/:id', 
      component: TeacherUpdateComponent, 
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
