import { Component } from '@angular/core';
import { Schedule } from 'src/app/models/schedule';
import { ScheduleService } from 'src/app/services/schedule.service';
import { NoteService } from '../../services/note.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { Note } from 'src/app/models/note';
import { EXTRA_ARRAYS } from 'src/app/models/extraarrays';

@Component({
  selector: 'app-upd-note',
  templateUrl: './upd-note.component.html',
  styleUrls: ['./upd-note.component.css']
})
export class UpdNoteComponent {
  id: number;
  title: string = '';
  body: string = '';
  lessonId: number = 0;
  isFinished!: boolean;

  note!: Note;

  scheduleList:Schedule[] = [];

  daysList=EXTRA_ARRAYS.weekdays;

  constructor(private scheduleService:ScheduleService,private noteService:NoteService,private router: Router,private authService:AuthService,private activateRoute: ActivatedRoute)
    {    
      this.id = activateRoute.snapshot.params['id'];
      noteService.loadNote(this.id).subscribe((data: Note) => {this.setFormValues(data);});
      this.scheduleList=scheduleService.getSchedulebyGroup(authService.loadUserFromLocalStorage().groupId);
    }

    readLesson(lesson:Schedule){
      return lesson.subject.name+", "+this.daysList[lesson.dayOfWeek-1].toString()+", "+lesson.typeOfLesson;
    }

    updateDB(){
      this.noteService.updateNote(this.id,this.title,this.body,this.lessonId,this.isFinished,this.authService.loadUserFromLocalStorage().userId)
      .subscribe(()=> {
        this.router.navigateByUrl('/note');
      });
    }

      
    setFormValues(data:Note){
      this.title = data.title;
      this.body = data.body;
      this.lessonId = data.lesson.id;
      this.isFinished = data.finished;
    }
}
