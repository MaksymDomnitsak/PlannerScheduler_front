import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { SubjectCreateComponent } from './subject-create/subject-create.component';
import { SubjectUpdateComponent } from './subject-update/subject-update.component';

const routes: Routes = [{
  path: 'subjects', 
  component: SubjectListComponent, 
  },
  {
    path: 'create', 
    component: SubjectCreateComponent, 
    },
    {
      path: 'edit/:id', 
      component: SubjectUpdateComponent, 
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule { }
