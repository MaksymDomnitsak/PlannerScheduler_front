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
  selector: 'app-teachers-page',
  templateUrl: './teachers-page.component.html',
  styleUrls: ['./teachers-page.component.css']
})
export class TeachersPageComponent implements AfterContentChecked {
  @ViewChild('confirmDeleteModal')
  confirmDeleteModal!: TemplateRef<any>;

  eventForDelete: ScheduleWithTime | undefined;
  indexForDelete!: number;

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
    this.schedule=this.scheduleService.getScheduleWithTimebyTeacher(this.service.userProfile.value.userId);
  }

  changeTab(tab:string){
    this.activeTab=tab;
    this.schedule = tab === "tab1" ? this.scheduleService.getScheduleWithTimebyTeacher(this.service.userProfile.value.userId) :
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
    if(event.attendees == undefined){
      let users: User[] = event.attendees;
      for(let i in this.utils.getRange(0,users.length)){
        this.attendees+=users[i].firstName+ " " +users[i].lastName+",";
      }
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
    this.scheduleService.deleteCustomEvent(this.eventForDelete!.id);
    this.schedule.splice(this.indexForDelete,1);
    this.modalService.dismissAll(this.confirmDeleteModal);
    this.router.navigate(['/teachersPage']);

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
