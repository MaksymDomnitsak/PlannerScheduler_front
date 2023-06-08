import { ChangeDetectorRef, Component, Input, AfterContentChecked } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { AuthService } from '../../auth/services/auth.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { Group } from 'src/app/models/group';
import { Teacher } from 'src/app/models/teacher';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Schedule } from 'src/app/models/schedule';
import { EXTRA_ARRAYS } from 'src/app/models/extraarrays';
import { User } from 'src/app/models/user';
import { ScheduleFindFormDataService } from '../services/schedule-find-form-data-service.service';
import { ExtraUtils } from 'src/app/services/utils';

@Component({
  selector: 'app-schedule-find',
  templateUrl: './schedule-find.component.html',
  styleUrls: ['./schedule-find.component.css']
})
export class ScheduleFindComponent {
  groupList: Group[] = [];
  teacherList: Teacher[] = [];
  weekdays = EXTRA_ARRAYS.weekdays;
  teacherTitle!: string;
  schdlConverter: ScheduleFindFormDataService;
  utils: ExtraUtils;
  allSchedule: boolean = true;

  findSchedule!: FormGroup;

  constructor(private service: AuthService, 
    private teacherService: TeacherService, 
    private groupService: GroupService, 
    private scheduleService: ScheduleService, 
    private formBuilder: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    utils:ExtraUtils,
    schdlConverter: ScheduleFindFormDataService){
      this.schdlConverter = schdlConverter;
      this.utils = utils;
      this.groupService.getGroups().subscribe((data: Group[]) => data.forEach((item) => this.groupList.push(item)));
      this.teacherService.getTeachers().subscribe((data: Teacher[]) => data.forEach((item) => this.teacherList.push(item)));
  }

  ngOnInit(){
    this.findSchedule = this.formBuilder.group({
      teacherSelect: [''],
      groupSelect: ['']
    });
    this.getAllSchedule();
    this.findSchedule.get('teacherSelect')!.valueChanges.subscribe(value => {
      if (value) {
        this.findSchedule.get('groupSelect')!.reset();
        this.findSchedule.get('groupSelect')!.setValue("");
        
      }
    });

    this.findSchedule.get('groupSelect')!.valueChanges.subscribe(value => {
      if (value) {
        this.findSchedule.get('teacherSelect')!.reset();
        this.findSchedule.get('teacherSelect')!.setValue("");
      }
    });
  }
  ngAfterContentChecked(): void {
    this.changeDetector.detach();
    this.changeDetector.detectChanges();
   }

  ngAfterViewChecked(): void {
    this.schdlConverter.schIt = 0;
    
  }

  getScheduleByTeacherOrGroup(){
    this.allSchedule = false;
    if(this.findSchedule.get('groupSelect')!.value !== ''){
      this.schdlConverter.schedule = this.scheduleService.getSchedulebyGroup(this.findSchedule.get('groupSelect')!.value);
    }
      else if(this.findSchedule.get('teacherSelect')!.value !== ''){
        this.schdlConverter.schedule=this.scheduleService.getSchedulebyTeacher(this.findSchedule.get('teacherSelect')!.value);
        
      }else{
        this.schdlConverter.schedule = this.scheduleService.getSchedule();
      }

  }

  getAllSchedule(){
    this.allSchedule = true;
    this.schdlConverter.schedule = this.scheduleService.getSchedule();
    if(this.findSchedule.get('groupSelect')!.value !== '' || this.findSchedule.get('teacherSelect')!.value !== ''){
      this.findSchedule.reset();
      this.findSchedule.get('teacherSelect')!.setValue("");
      this.findSchedule.get('groupSelect')!.setValue("");
    }
  }

  readTeacherName(teacher: Teacher){
    return teacher.firstName+" "+teacher.lastName+" "+teacher.patronymicName;
  }

  readUserName(creator: User){
    this.teacherTitle = creator.firstName+" "+creator.lastName+" "+creator.patronymicName;
  }

  checkAndOutput(dayOfWeek: number,evenWeek:boolean,lessonOrder:number,outputType: string){
    this.schdlConverter.checkAndOutput(dayOfWeek,evenWeek,lessonOrder,outputType);
  }

  checkFacultySchedule(dayOfWeek: number,evenWeek:boolean,lessonOrder:number,groupId: number){
    this.schdlConverter.checkFacultySchedule(dayOfWeek,evenWeek,lessonOrder,groupId);
   }

}
