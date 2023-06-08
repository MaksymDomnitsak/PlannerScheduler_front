import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteCreateComponent } from './note-create/note-create.component';
import { NoteUpdateComponent } from './note-update/note-update.component';
import { NoteRoutingModule } from './note-routing.module';



@NgModule({
  declarations: [
    NoteListComponent,
    NoteCreateComponent,
    NoteUpdateComponent
  ],
  imports: [
    CommonModule,
    NoteRoutingModule
  ]
})
export class NoteModule { }
