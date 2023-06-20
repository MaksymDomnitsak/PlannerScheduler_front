import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomEventResponse } from 'src/app/models/customEventResponse';
import { EXTRA_ARRAYS } from 'src/app/models/extraarrays';
import { Group } from 'src/app/models/group';
import { Subject } from 'src/app/models/subject';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { GroupService } from 'src/app/services/group.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { SubjectService } from 'src/app/services/subject.service';
import { UserService } from 'src/app/services/user.service';
import { ExtraUtils } from 'src/app/services/utils';

@Component({
  selector: 'app-schedule-create',
  templateUrl: './schedule-create.component.html',
  styleUrls: ['./schedule-create.component.css']
})
export class ScheduleCreateComponent {
  eventForm!: FormGroup;
  subjects: Subject[] = []; 
  attendees: User[] = []; 
  groups: Group[] = []; 
  daysOfWeek = EXTRA_ARRAYS.weekdays;

  constructor(private formBuilder: FormBuilder,private groupService:GroupService, private scheduleService: ScheduleService, private authService:AuthService,
    private userService:UserService,private router:Router, private subjectService: SubjectService, private utils:ExtraUtils) {
      this.subjectService.getSubjectsByTeacherId(this.authService.userProfile.value.userId).subscribe((data: Subject[]) => data.forEach((item) => this.subjects.push(item)))
      this.groupService.getGroups().subscribe((data: Group[]) => data.forEach((item) => this.groups.push(item)));
      this.userService.getUsers().subscribe((data: User[]) => data.forEach((item) => this.attendees.push(item)));
   }

  ngOnInit() {
    this.eventForm = this.formBuilder.group({
      title: ['', Validators.required],
      subjects: [0],
      attendees: [[]],
      groups: [0],
      dayOfWeek: ['', Validators.required],
      timeOption: ['timeRange'],
      startTime: [''],
      endTime: [''],
      classPeriod: ['1', [Validators.min(1), Validators.max(5)]],
      eventType: ['', Validators.required],
      eventMode: ['online'],
      roomNumber: ['']
    });
  }

  createEvent() {
    let isOnline: boolean = this.eventForm.get("eventMode")?.value == 'online' ? true : false;
    let startTime: string;
    let endTime: string;
    if(this.eventForm.get('timeOption')!.value === 'timeRange'){
      startTime = this.eventForm.get("startTime")?.value;
      endTime = this.eventForm.get("endTime")?.value
    }else{
      startTime = this.utils.startTimeFromNumber(this.eventForm.get("classPeriod")?.value);
      endTime = this.utils.endTimeFromNumber(this.eventForm.get("classPeriod")?.value);
    }
    let event = new CustomEventResponse(0,this.eventForm.get("title")?.value,this.eventForm.get("subjects")?.value,this.authService.userProfile.value.userId, 
    this.eventForm.get("attendees")?.value, this.eventForm.get("groups")?.value,this.eventForm.get("dayOfWeek")?.value,this.eventForm.get("classPeriod")?.value,
    this.eventForm.get("eventType")?.value, isOnline,this.eventForm.get("roomNumber")?.value, startTime,endTime);

    this.scheduleService.createEvent(event).subscribe(() => {
      this.router.navigate(['..']);
    });
  }
}
