import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EXTRA_ARRAYS } from 'src/app/models/extraarrays';
import { ScheduleWithTime } from 'src/app/models/scheduleWithTime';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { ExtraUtils } from 'src/app/services/utils';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent {
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
    this.schedule = this.scheduleService.getAll();
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
      this.router.navigate(['/schedule']);
    });
    

  }

  cancelModal(){
    this.eventForDelete = undefined;
    this.indexForDelete = -1;
    this.modalService.dismissAll(this.confirmDeleteModal);
  }
}
