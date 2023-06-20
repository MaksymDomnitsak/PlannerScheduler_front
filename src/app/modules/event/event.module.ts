import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventRoutingModule } from './event-routing.module';
import { EventPageComponent } from './event-page/event-page.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { CreateGroupNoteComponent } from './create-group-note/create-group-note.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { ImportToGCComponent } from './import-to-gc/import-to-gc.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EventPageComponent,
    CreateEventComponent,
    CreateGroupNoteComponent,
    EditEventComponent,
    ImportToGCComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    
    ReactiveFormsModule,
    EventRoutingModule
  ]
})
export class EventModule { }
