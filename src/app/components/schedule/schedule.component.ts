import { Component } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {

  constructor(private groupService: GroupService,private teacherService: TeacherService){}

/*   <form>
    <div class="form-group">
      <label for="lesson">Група</label>
      <select class="form-control" id="lesson" [(ngModel)]="lessonId" required [ngModelOptions]="{standalone: true}">
        <option *ngFor="let group of groupList" [ngValue]="lesson.id">{{readLesson(lesson)}}</option>
      </select>
    </div>
    <div class="form-group">
        <label for="lesson">Викладач</label>
        <select class="form-control" id="lesson" [(ngModel)]="lessonId" required [ngModelOptions]="{standalone: true}">
          <option *ngFor="let teacher of teacherList" [ngValue]="lesson.id">{{readLesson(lesson)}}</option>
        </select>
      </div>
    <button type="submit" class="btn btn-primary" (click)="writeToDB()">Знайти</button>
  </form>
<table>
    <thead>
      <tr>
        <th></th>
        <th>1/2 week</th>
        <th>1</th>
        <th>2</th>
        <th>3</th>
        <th>4</th>
        <th>5</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let num of [1,2,3,4,5,6,7,8,9,10];">
        <td class="weekday" rowspan="2" *ngIf="num%2==1"><span>{{ weekdays[floor(num/2)] }}</span></td>
        <td class="weekorder" *ngIf="num%2==1; else elseBlock">{{ 1 }}</td>
          <ng-template #elseBlock><td class="weekorder">{{ 2 }}</td></ng-template>
        <td *ngFor="let it of [1,2,3,4,5]">{{ checkAndOutput(ceil(num/2),num%2==1 ? false : true,it)}}{{ lesInfo }}</td>
      </tr>
    </tbody>
  </table> */
}
