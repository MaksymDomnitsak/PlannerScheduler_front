import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Note } from 'src/app/models/note';
import { ScheduleService } from 'src/app/services/schedule.service';
import { AuthService } from '../../auth/services/auth.service';
import { ScheduleWithTime } from 'src/app/models/scheduleWithTime';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EXTRA_ARRAYS } from 'src/app/models/extraarrays';
import { Group } from 'src/app/models/group';
import { User } from 'src/app/models/user';
import { Subject } from 'src/app/models/subject';
import { SubjectService } from 'src/app/services/subject.service';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';
import { CustomEventResponse } from 'src/app/models/customEventResponse';
import { ExtraUtils } from 'src/app/services/utils';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent {
  eventForm!: FormGroup;
  subjects: Subject[] = []; 
  attendees: User[] = []; 
  groups: Group[] = []; 
  userIds: number[] = [];
  eventId: number = 0;
  daysOfWeek = EXTRA_ARRAYS.weekdays;
  
  constructor(private formBuilder: FormBuilder,private scheduleService:ScheduleService,private router: Router,
    private authService:AuthService,private activateRoute: ActivatedRoute, private subjectService: SubjectService,
    private groupService:GroupService,private userService:UserService, private utils:ExtraUtils)
  {    
    this.subjectService.getSubjectsByTeacherId(this.authService.userProfile.value.userId).subscribe((data: Subject[]) => data.forEach((item) => this.subjects.push(item)))
    this.groupService.getGroups().subscribe((data: Group[]) => data.forEach((item) => this.groups.push(item)));
    this.userService.getUsers().subscribe((data: User[]) => data.forEach((item) => this.attendees.push(item)));
    this.scheduleService.getById(activateRoute.snapshot.params['id']).subscribe((data: ScheduleWithTime) => {this.setFormValues(data);});
  
  }

  ngOnInit() {
    this.eventForm = this.formBuilder.group({
      title: ['', Validators.required],
      subjects: [''],
      attendees: [[]],
      groups: [''],
      dayOfWeek: ['', Validators.required],
      timeOption: ['timeRange'],
      startTime: [''],
      endTime: [''],
      classPeriod: [''],
      eventType: ['', Validators.required],
      eventMode: ['online'],
      roomNumber: ['']
    });
  }

  setFormValues(data: ScheduleWithTime){
    this.eventId = data.id;
    this.eventForm.get('subjects')?.setValue(data.subject.id);
    this.eventForm.get('title')?.setValue(data.customTitle);
    this.eventForm.get('groups')?.setValue(data.group.id);
    this.eventForm.get('startTime')?.patchValue(data.startTime);
    this.eventForm.get('endTime')?.setValue(data.endTime);
    this.eventForm.get('classPeriod')?.setValue(data.lessonOrder);
    this.eventForm.get('eventType')?.setValue(data.typeOfLesson);
    this.eventForm.get('eventMode')?.setValue(data.online == true ? 'online' : 'offline');
    this.eventForm.get('roomNumber')?.setValue(data.auditoryNumber);
    this.eventForm.get('dayOfWeek')?.setValue(data.dayOfWeek);
    console.log(data.lessonOrder);
    if(data.lessonOrder !== undefined && data.lessonOrder !== null){
      this.eventForm.get('timeOption')?.setValue("classPeriods");
    }
    data.attendees.forEach((user) => {
        this.userIds.push(user.id);
    });
    this.eventForm.get('attendees')?.setValue(this.userIds);
    
    }

    updateEvent() {
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
      let event = new CustomEventResponse(this.eventId,this.eventForm.get("title")?.value,this.eventForm.get("subjects")?.value,this.authService.userProfile.value.userId, 
      this.eventForm.get("attendees")?.value, this.eventForm.get("groups")?.value,this.eventForm.get("dayOfWeek")?.value,this.eventForm.get("classPeriod")?.value,
      this.eventForm.get("eventType")?.value, isOnline,this.eventForm.get("roomNumber")?.value, startTime,endTime);
  
      this.scheduleService.updateEvent(this.eventId,event).subscribe(() => {
        this.router.navigateByUrl('/event-page');
      });
      
  
    }
  }
