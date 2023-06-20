import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainAdminComponent } from './main-admin/main-admin.component';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { UserModule } from './childmodules/user/user.module';
import { EventModule } from './childmodules/teacher/teacher.module';
import { StudentModule } from './childmodules/student/student.module';
import { ScheduleModule } from './childmodules/schedule/schedule.module';
import { GroupModule } from './childmodules/group/group.module';
import { NoteModule } from '../note/note.module';
import { SubjectModule } from './childmodules/subject/subject.module';


@NgModule({
  declarations: [
    MainAdminComponent,
  ],
  imports: [
    CommonModule,
    UserModule,
    EventModule,
    StudentModule,
    ScheduleModule,
    GroupModule,
    NoteModule,
    SubjectModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
