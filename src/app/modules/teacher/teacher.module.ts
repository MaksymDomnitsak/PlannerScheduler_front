import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeachersPageComponent } from './teachers-page/teachers-page.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { CreateGroupNoteComponent } from './create-group-note/create-group-note.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { ImportToGCComponent } from './import-to-gc/import-to-gc.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TeachersPageComponent,
    CreateEventComponent,
    CreateGroupNoteComponent,
    EditEventComponent,
    ImportToGCComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TeacherRoutingModule,
    ReactiveFormsModule
  ]
})
export class TeacherModule { }
