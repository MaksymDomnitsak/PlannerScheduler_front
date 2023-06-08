import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectUpdateComponent } from './subject-update/subject-update.component';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { SubjectCreateComponent } from './subject-create/subject-create.component';
import { SubjectRoutingModule } from './subject-routing.module';



@NgModule({
  declarations: [
    SubjectUpdateComponent,
    SubjectListComponent,
    SubjectCreateComponent
  ],
  imports: [
    CommonModule,
    SubjectRoutingModule
  ]
})
export class SubjectModule { }
