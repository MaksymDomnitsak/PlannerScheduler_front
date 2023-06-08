import { Component,Input,OnInit, ChangeDetectorRef, AfterContentChecked, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Schedule } from 'src/app/models/schedule';
import { ScheduleService } from 'src/app/services/schedule.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ExportScheduleService } from 'src/app/services/export-schedule.service';
import { EXTRA_ARRAYS } from 'src/app/models/extraarrays';
import { ScheduleFindFormDataService } from 'src/app/modules/schedule/services/schedule-find-form-data-service.service';
import { Group } from 'src/app/models/group';
import { GroupService } from 'src/app/services/group.service';
import { ExtraUtils } from 'src/app/services/utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterContentChecked,AfterViewChecked,OnInit {
  schedule: Schedule[] = [];
  
 weekdays = EXTRA_ARRAYS.weekdays;
 schdlConverter: ScheduleFindFormDataService;
 bo: boolean = false;
 utils: ExtraUtils;
 

 ngAfterContentChecked(): void {
  this.changeDetector.detach();
  this.changeDetector.detectChanges();
 }

  constructor(private auth:AuthService,
    private service: ScheduleService, 
    private changeDetector: ChangeDetectorRef,
    private ex:ExportScheduleService, 
    private router: Router,
    scheduleConverter: ScheduleFindFormDataService,
    utils:ExtraUtils){
      this.schdlConverter = scheduleConverter;
      this.utils = utils;
      this.readDB();
  }

  ngAfterViewChecked(): void {
    this.schdlConverter.schIt=0;
  }

  ngOnInit(){
    this.readDB();
  }



 checkAndOutput(dayOfWeek: number,evenWeek:boolean,lessonOrder:number,outputType: string){
  this.schdlConverter.checkAndOutput(dayOfWeek,evenWeek,lessonOrder,outputType);
 }



 readDB(){
    if(this.auth.loadRole() == "STUDENT"){
      this.schdlConverter.schedule = this.service.getSchedulebyGroup(this.auth.userProfile.value.groupId);
    }else{
      this.schdlConverter.schedule = this.service.getSchedulebyTeacher(this.auth.userProfile.value.userId);
    }
  }

  exportToPDF(){
    this.ex.exportToPdf();
  }

  exportToPNG(){
    this.ex.exportSchedule();
  }

  readUserRole(): string{
    return this.auth.loadRole();
  }

 
  
 }


