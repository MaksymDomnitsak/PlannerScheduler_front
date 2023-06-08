import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.css']
})
export class MainAdminComponent {
  timerSubscription!: Subscription;
  timer$!: Observable<number>;
  secondsElapsed: number = 0;
    constructor(private http:HttpClient){}

    startTimer() {
      this.secondsElapsed = 0;
      this.timer$ = timer(0, 1000); 
      this.timerSubscription = this.timer$.subscribe(() => {
        this.secondsElapsed++;
      });
    }

    stopTimer() {
      if (this.timerSubscription) {
        this.timerSubscription.unsubscribe(); // Остановка таймера
      }
    }

    writeGroupToDB(){
      const url = "/api/parse/loadGroups";
      this.http.get(url).subscribe();
      this.stopTimer();
    }
    writeToDB(){
      const url = "/api/parse/loadAll";
      this.http.get(url).subscribe();
      this.stopTimer();
    }
}
