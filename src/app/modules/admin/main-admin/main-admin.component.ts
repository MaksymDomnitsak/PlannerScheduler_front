import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { TimerService } from 'src/app/services/timer.service';

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.css']
})
export class MainAdminComponent {
  isTimerRunning$: Observable<boolean>;
  elapsedTime$: Observable<number>;
  private subscription: Subscription;
    constructor(private http:HttpClient,private timerService: TimerService){
      this.isTimerRunning$ = this.timerService.isTimerRunning;
      this.elapsedTime$ = this.timerService.elapsedTime;
      this.subscription = this.timerService.isTimerRunning.subscribe(isRunning => {
        if (!isRunning) {
          // Зупинити або зробити інші дії, коли таймер зупинений
        }
      });
    }

    startTimer() {
      this.timerService.startTimer();
      console.log(this.isTimerRunning$+" "+this.elapsedTime$)
    }

    stopTimer() {
      this.timerService.stopTimer();
    }

    writeGroupToDB(){
      const url = "/api/parse/loadGroups";
      this.http.get(url).subscribe(
        (response: any) => {
          this.stopTimer();
        })
      
    }
    writeToDB(){
      const url = "/api/parse/loadAll";
      this.http.get(url).subscribe(
        (response: any) => {
         this.stopTimer();
       });
    }
}
