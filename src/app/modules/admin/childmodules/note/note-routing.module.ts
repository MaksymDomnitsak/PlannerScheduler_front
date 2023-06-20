import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteCreateComponent } from './note-create/note-create.component';
import { NoteUpdateComponent } from './note-update/note-update.component';

const routes: Routes = [{
  path: 'notings', 
  component: NoteListComponent, 
  },
  {
    path: 'create', 
    component: NoteCreateComponent, 
    },
    {
      path: 'edit/:id', 
      component: NoteUpdateComponent, 
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteRoutingModule { }
