import { AfterContentChecked, ChangeDetectorRef, Component,OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ScheduleWithTime } from 'src/app/models/scheduleWithTime';
import { AuthService } from '../../auth/services/auth.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { Router } from '@angular/router';
import { EXTRA_ARRAYS } from 'src/app/models/extraarrays';
import { User } from 'src/app/models/user';
import { ExtraUtils } from 'src/app/services/utils';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements AfterContentChecked {
  @ViewChild('confirmDeleteModal')
  confirmDeleteModal!: TemplateRef<any>;

  eventForDelete: ScheduleWithTime | undefined;
  indexForDelete!: number;
  userRole!: string;

  activeTab = "tab1";
  utils:ExtraUtils;
  schedule: ScheduleWithTime[] = [];
  subjectName: String = "";
  groupName: String = "";
  creatorName: String = "";
  dayOfWeek: String = "";
  time: String = "";
  typeOfEvent: String = "";
  attendees: String = "";
  auditory: String = "";

  constructor(private modalService: NgbModal,private service: AuthService, private scheduleService: ScheduleService, private router: Router
    ,utils:ExtraUtils,private cdr: ChangeDetectorRef){
    this.utils=utils;
    
  }

  ngOnInit(){
    this.userRole = this.service.userProfile.value.role;
    this.schedule = this.scheduleService.getScheduleWithTimebyCreator(this.service.userProfile.value.userId);
  }

  changeTab(tab:string){
    this.activeTab=tab;
    this.schedule = tab === "tab1" ? this.scheduleService.getScheduleWithTimebyCreator(this.service.userProfile.value.userId) :
      this.scheduleService.getScheduleByAttendee(this.service.userProfile.value.email);
  }

  setValues(event:ScheduleWithTime){
    this.subjectName = event.customTitle === null ? event.subject.name : event.customTitle;
    this.groupName = !event.group ? "-" : event.group.name;
    this.creatorName = event.creator.firstName + " " + event.creator.lastName;
    this.dayOfWeek = EXTRA_ARRAYS.weekdays[event.dayOfWeek-1];
    this.time = event.startTime + "-" + event.endTime;
    this.typeOfEvent = event.typeOfLesson;
    this.attendees = "-";
    if(event.attendees.length != 0){
      let users: User[] = event.attendees;
      users.forEach((user) => {
        this.attendees+=user.firstName+ " " +user.lastName+", ";
      })
      this.attendees=this.attendees.slice(1,this.attendees.length-2);
    }
    this.auditory = !event.online ? event.auditoryNumber : "Онлайн";
  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
    this.cdr.detach();
    this.cdr.detectChanges();
   }

  openConfirmDeleteModal(event:ScheduleWithTime,index:number) {
    this.eventForDelete = event;
    this.indexForDelete = index;
    this.modalService.open(this.confirmDeleteModal);
  }

  onDeleteConfirmed() {
    this.schedule.splice(this.indexForDelete,1);
    this.modalService.dismissAll(this.confirmDeleteModal);
    this.scheduleService.deleteCustomEvent(this.eventForDelete!.id).subscribe(() => {
      this.router.navigate(['/teachersPage']);
    });
    

  }

  cancelModal(){
    this.eventForDelete = undefined;
    this.indexForDelete = -1;
    this.modalService.dismissAll(this.confirmDeleteModal);
  }

  isCustomEvent(event:ScheduleWithTime): boolean{
    return event.typeOfLesson !== 'LECTURE' && event.typeOfLesson !== 'PRACTICAL' && event.typeOfLesson !== 'LABORATORY';
  }

  isDisabled(event: ScheduleWithTime){
    return ((event.typeOfLesson == 'LECTURE') || (event.typeOfLesson == 'PRACTICAL') || (event.typeOfLesson == 'LABORATORY'));
  }
}
