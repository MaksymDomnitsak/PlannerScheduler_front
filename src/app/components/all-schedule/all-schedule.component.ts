import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { EXTRA_ARRAYS } from 'src/app/models/extraarrays';
import { Group } from 'src/app/models/group';
import { Schedule } from 'src/app/models/schedule';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ScheduleFindFormDataService } from 'src/app/modules/schedule/services/schedule-find-form-data-service.service';
import { ExportScheduleService } from 'src/app/services/export-schedule.service';
import { GroupService } from 'src/app/services/group.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { ExtraUtils } from 'src/app/services/utils';

@Component({
  selector: 'app-all-schedule',
  templateUrl: './all-schedule.component.html',
  styleUrls: ['./all-schedule.component.css']
})
export class AllScheduleComponent {

  schedule: Schedule[] = [];
  groups: Group[] = [];
  
 weekdays = EXTRA_ARRAYS.weekdays;
 schdlConverter: ScheduleFindFormDataService;
 utils: ExtraUtils;

  constructor(private auth:AuthService,
    private service: ScheduleService, 
    private groupService: GroupService,
    private changeDetector: ChangeDetectorRef,
    private ex:ExportScheduleService, 
    private router: Router,
    scheduleConverter: ScheduleFindFormDataService,
    utils:ExtraUtils){
      this.schdlConverter = scheduleConverter;
      this.utils = utils;
      this.readDB();
      groupService.getGroups().subscribe((response: Group[]) => {response.forEach((item)=> {
        if(item.name != "-"){
        this.groups.push(item)
         }})
  })
}

  checkFacultySchedule(dayOfWeek: number,evenWeek:boolean,lessonOrder:number,groupId: number){
    this.schdlConverter.checkFacultySchedule(dayOfWeek,evenWeek,lessonOrder,groupId);
   }

   ngAfterViewChecked(): void {
    this.schdlConverter.schIt=0;
    
  }

  ngOnInit(){
    this.readDB();
  }

   readDB(){
    if(this.auth.userProfile.value.userId==0 || this.auth.loadRole() == "ADMIN"){
      this.schdlConverter.schedule=this.service.getSchedule();
      this.schdlConverter.schIt=0;
      return;
    }
  }

}
