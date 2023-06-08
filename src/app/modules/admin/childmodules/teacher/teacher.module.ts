import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { TeacherCreateComponent } from './teacher-create/teacher-create.component';
import { TeacherUpdateComponent } from './teacher-update/teacher-update.component';
import { TeacherRoutingModule } from './teacher-routing.module';



@NgModule({
  declarations: [
    TeacherListComponent,
    TeacherCreateComponent,
    TeacherUpdateComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule
  ]
})
export class TeacherModule { }
