import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {path: 'login', 
  component: LoginComponent, 
  canActivate:[AuthGuard], 
  data: {
    userType: 'guest',
  },},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
