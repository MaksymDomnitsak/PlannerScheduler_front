import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentCreateComponent } from './student-create/student-create.component';
import { StudentUpdateComponent } from './student-update/student-update.component';

const routes: Routes = [{
  path: 'students', 
  component: StudentListComponent, 
  },
  {
    path: 'create', 
    component: StudentCreateComponent, 
    },
    {
      path: 'edit/:id', 
      component: StudentUpdateComponent, 
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
