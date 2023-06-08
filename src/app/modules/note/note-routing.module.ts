import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyNotesComponent } from './components/my-notes/my-notes.component';
import { NewNoteComponent } from './components/new-note/new-note.component';
import { UpdNoteComponent } from './components/upd-note/upd-note.component';

const routes: Routes = [
  {path: 'note', 
    component: MyNotesComponent, 
  },
  {path: 'note/new', 
  component: NewNoteComponent, 
},{
  path: 'note/edit/:id',
  component: UpdNoteComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteRoutingModule { }
