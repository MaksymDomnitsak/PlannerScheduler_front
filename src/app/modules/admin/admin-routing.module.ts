import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAdminComponent } from './main-admin/main-admin.component';

const routes: Routes = [{
  path: 'admin', 
  component: MainAdminComponent}
  ,{
    path: 'users',
    loadChildren: () => import('./childmodules/user/user.module').then(m => m.UserModule),
  },
  {
    path: 'students',
    loadChildren: () => import('./childmodules/student/student.module').then(m => m.StudentModule)
  },
  {
    path: 'teachers',
    loadChildren: () => import('./childmodules/teacher/teacher.module').then(m => m.EventModule)
  },{
    path: 'subjects',
    loadChildren: () => import('./childmodules/subject/subject.module').then(m => m.SubjectModule)
  },{
    path: 'schedule',
    loadChildren: () => import('./childmodules/schedule/schedule.module').then(m => m.ScheduleModule)
  },{
    path: 'notings',
    loadChildren: () => import('./childmodules/note/note.module').then(m => m.NoteModule)
  },{
    path: 'groups',
    loadChildren: () => import('./childmodules/group/group.module').then(m => m.GroupModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
