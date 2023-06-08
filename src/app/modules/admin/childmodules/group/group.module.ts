import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupCreateComponent } from './group-create/group-create.component';
import { GroupUpdateComponent } from './group-update/group-update.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupRoutingModule } from './group-routing.module';



@NgModule({
  declarations: [
    GroupCreateComponent,
    GroupUpdateComponent,
    GroupListComponent
  ],
  imports: [
    CommonModule,
    GroupRoutingModule
  ]
})
export class GroupModule { }
