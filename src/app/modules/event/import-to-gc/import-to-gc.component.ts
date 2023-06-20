import { AfterViewChecked, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupService } from 'src/app/services/group.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { UserService } from 'src/app/services/user.service';
import { ImportGCService } from '../services/import-gc.service';
import { Group } from 'src/app/models/group';
import { User } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { ScheduleWithTime } from 'src/app/models/scheduleWithTime';
import { EventGoogleCalendar } from 'src/app/models/eventGoogleCalendar';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-import-to-gc',
  templateUrl: './import-to-gc.component.html',
  styleUrls: ['./import-to-gc.component.css']
})
export class ImportToGCComponent {
  eventForm!: FormGroup;

  repeatOptions = Array.from({ length: 14 }, (_, i) => 2 + i);
  groupOptions : Group[] = [];
  attendeeOptions : User[] = [];
  scheduleWithTime! : ScheduleWithTime;
  touched:boolean = false;


  constructor(private formBuilder: FormBuilder,private groupService:GroupService, private scheduleService: ScheduleService, private authService:AuthService,
     private userService:UserService, private importService:ImportGCService,private activateRoute: ActivatedRoute,private router:Router) {
      this.eventForm = this.formBuilder.group({
        summary: [ "", Validators.required],
        location: [''],
        description: ['', Validators.required],
        startDate: ['', Validators.required],
        frequency: ['weekly', Validators.required],
        repeats: ['1', Validators.required],
        groups: [[]],
        attendees: [[]],
        conference: ['none']
      });
      this.scheduleService.getOneScheduleWithTimebyTeacher(this.authService.userProfile.value.userId,this.activateRoute.snapshot.params['id']);
      this.groupService.getGroups().subscribe((data: Group[]) => data.forEach((item) => this.groupOptions.push(item)));
      this.userService.getUsers().subscribe((data: User[]) => data.forEach((item) => this.attendeeOptions.push(item)));
     }

  importEvent(){
    
    let event = new EventGoogleCalendar(this.scheduleWithTime.subject.name,this.eventForm.get('description')?.value,this.eventForm.get('location')?.value,
    this.eventForm.get('startDate')!.value, this.eventForm.get('frequency')!.value,this.eventForm.get('repeats')!.value,this.eventForm.get('groups')!.value,
    this.eventForm.get('attendees')!.value, this.eventForm.get('conference')!.value, this.scheduleWithTime.id);
    event.summary = this.scheduleWithTime.customTitle === null ? this.scheduleWithTime.subject.name : this.scheduleWithTime.customTitle;
    this.importService.importToGC(event);
    this.router.navigate(['/event-page']);
  }

  summaryCheck(){
    if(this.touched==false){
    this.scheduleWithTime=this.scheduleService.eventWithTime;
    this.eventForm.get('summary')?.setValue(this.scheduleWithTime.subject.name);
    this.eventForm.get('groups')?.setValue([this.scheduleWithTime.group.id, ]);
    this.touched=true;
  }

  }
}
