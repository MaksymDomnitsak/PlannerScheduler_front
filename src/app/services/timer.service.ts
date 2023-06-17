import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  public isTimerRunning$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public elapsedTime$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  get isTimerRunning(): Observable<boolean> {
    return this.isTimerRunning$.asObservable();
  }

  get elapsedTime(): Observable<number> {
    return this.elapsedTime$.asObservable();
  }

  startTimer() {
    this.isTimerRunning$.next(true);
    let elapsedTime = 0;
    const interval = setInterval(() => {
      elapsedTime++;
      this.elapsedTime$.next(elapsedTime);
    }, 1000);

    // Опційно: зберегти інтервал у сервісі, якщо вам потрібен доступ до нього в майбутньому
    // this.interval = interval;
  }

  stopTimer() {
    this.isTimerRunning$.next(false);
    this.elapsedTime$.next(0);
    //clearInterval(this.elapsedTime$.value)
    // Очистити інтервал, якщо ви його зберегли
    // clearInterval(this.interval);
  }
}