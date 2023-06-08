import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeachersPageComponent } from './teachers-page/teachers-page.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { CreateGroupNoteComponent } from './create-group-note/create-group-note.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { ImportToGCComponent } from './import-to-gc/import-to-gc.component';

const routes: Routes = [
  {
  path: "teachersPage",
  component: TeachersPageComponent,
},
{
  path: "new",
  component: CreateEventComponent,
},
{
  path: "newNote",
  component: CreateGroupNoteComponent,
},
{
  path: "edit/:id",
  component: EditEventComponent,
},
{
  path: "import/:id",
  component: ImportToGCComponent,
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
