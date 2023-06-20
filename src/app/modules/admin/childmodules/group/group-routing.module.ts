import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupCreateComponent } from './group-create/group-create.component';
import { GroupUpdateComponent } from './group-update/group-update.component';

const routes: Routes = [{
  path: 'groups', 
  component: GroupListComponent, 
  },
  {
    path: 'create', 
    component: GroupCreateComponent, 
    },
    {
      path: 'edit/:id', 
      component: GroupUpdateComponent, 
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule { }
