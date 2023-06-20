import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { Page404Component } from './pages/page-404/page404.component';

const routes: Routes = [{
  path:"",
  redirectTo: "dashboard",
  pathMatch: "full"
},
  {
  path: 'auth',
  loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
},
{
  path: "dashboard",
  component: DashboardComponent
},
{
  path: 'events',
  loadChildren: () => import('./modules/schedule/schedule.module').then(m => m.ScheduleModule),
},
{
  path: 'notes',
  loadChildren: () => import('./modules/note/note.module').then(m => m.NoteModule),
  canActivate: [AuthGuard],
  data: {
      userType: 'logged-in',
  },
},
{
  path: 'event-page',
  loadChildren: () => import('./modules/event/event.module').then(m => m.EventModule),
  canActivate: [AuthGuard],
  data: {
      userType: 'logged-in',
  },
},
{
  path: 'admin',
  loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
  canActivate: [AuthGuard,AdminGuard],
  data: {
    userType: 'logged-in',
  }
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
