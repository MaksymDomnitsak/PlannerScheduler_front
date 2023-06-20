import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  public isTimerRunning$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public elapsedTime$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public timerInterval: any;
  get isTimerRunning(): Observable<boolean> {
    return this.isTimerRunning$.asObservable();
  }

  get elapsedTime(): Observable<number> {
    return this.elapsedTime$.asObservable();
  }

  startTimer() {
    this.isTimerRunning$.next(true);
    let elapsedTime = 0;
    this.timerInterval = setInterval(() => {
      if(elapsedTime < 60){
      elapsedTime++;
      }else this.stopTimer();
      this.elapsedTime$.next(elapsedTime);
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timerInterval);
    this.elapsedTime$.next(0);
    this.isTimerRunning$.next(false);
  }
}