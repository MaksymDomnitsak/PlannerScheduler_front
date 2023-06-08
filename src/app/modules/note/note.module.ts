import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoteRoutingModule } from './note-routing.module';
import { MyNotesComponent } from './components/my-notes/my-notes.component';
import { NewNoteComponent } from './components/new-note/new-note.component';
import { UpdNoteComponent } from './components/upd-note/upd-note.component';



@NgModule({
  declarations: [
    MyNotesComponent,
    NewNoteComponent,
    UpdNoteComponent,
  ],
  imports: [
    CommonModule,
    NoteRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class NoteModule { }
