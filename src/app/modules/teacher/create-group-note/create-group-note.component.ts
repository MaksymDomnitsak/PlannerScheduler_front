import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GroupService } from 'src/app/services/group.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { StudentService } from 'src/app/services/student.service';
import { SubjectService } from 'src/app/services/subject.service';
import { AuthService } from '../../auth/services/auth.service';
import { Subject } from 'src/app/models/subject';
import { Group } from 'src/app/models/group';
import { Student } from 'src/app/models/student';
import { NoteService } from '../../note/services/note.service';
import { Schedule } from 'src/app/models/schedule';
import { EXTRA_ARRAYS } from 'src/app/models/extraarrays';
import { GroupNote } from 'src/app/models/groupnote';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-group-note',
  templateUrl: './create-group-note.component.html',
  styleUrls: ['./create-group-note.component.css']
})
export class CreateGroupNoteComponent {
  noteForm!: FormGroup;
  schedule: Schedule[] = [];
  groups: Group[] = [];
  students: Student[] = [];
  daysList = EXTRA_ARRAYS.weekdays;

  constructor(private formBuilder: FormBuilder,
     private groupService: GroupService,
     private noteService:NoteService, 
     private scheduleService: ScheduleService, 
     private studentService: StudentService, 
     private auth: AuthService,
     private router: Router) {
      this.schedule = scheduleService.getSchedulebyTeacher(this.auth.userProfile.value.userId);
      groupService.getGroupsByTeacherId(this.auth.userProfile.value.userId).subscribe((response: Group[]) => {response.forEach((item)=>this.groups.push(item));});
      studentService.getStudents().subscribe((response: Student[]) => {response.forEach((item)=>this.students.push(item));});
   }

  ngOnInit(): void {
    this.noteForm = this.formBuilder.group({
      title: ['', Validators.required],
      schedule: ['', Validators.required],
      body: ['', Validators.required],
      group: [[]],
      students: [[]]
    });
  }

  onSubmit(): void {
    if (this.noteForm.valid) {
      let note = new GroupNote(this.noteForm.get("title")?.value, this.noteForm.get("schedule")?.value, this.noteForm.get("group")?.value, this.noteForm.get("students")?.value,
      this.noteForm.get("body")?.value);
      
      console.log(note);
      this.noteService.writeGroupNotes(note);
      this.router.navigate(['/teachersPage']);
    }
  }

  readLesson(lesson:Schedule){
    return lesson.subject.name+", "+this.daysList[lesson.dayOfWeek-1].toString()+", "+lesson.typeOfLesson;
  }
}
