import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventGoogleCalendar } from 'src/app/models/eventGoogleCalendar';

@Injectable({
  providedIn: 'root'
})
export class ImportGCService {

  constructor(private http: HttpClient) {}

  importToGC(event: EventGoogleCalendar){
    console.log(event);
    const url = "/api/toCalendar"
    this.http.post(url,event).subscribe();
  }
}
