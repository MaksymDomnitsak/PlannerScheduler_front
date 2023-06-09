import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserUpdateComponent } from './user-update/user-update.component';

const routes: Routes = [{
  path: 'users', 
  component: UserListComponent, 
  },
  {
    path: 'create', 
    component: UserCreateComponent, 
    },
    {
      path: 'edit/:id', 
      component: UserUpdateComponent, 
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
