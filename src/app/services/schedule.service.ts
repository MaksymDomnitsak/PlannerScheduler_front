import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Schedule } from '../models/schedule';
import { map,tap } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';
import { ScheduleWithTime } from '../models/scheduleWithTime';
import { CustomEventResponse } from '../models/customEventResponse';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  schedule:Schedule[] = [];
  eventWithTime!: ScheduleWithTime;
  scheduleWithTime:ScheduleWithTime[] = [];

  constructor(private http: HttpClient) {}

  getSchedulebyGroup(groupId: string) {
    console.log("group:"+groupId)
    this.schedule = [];
    const url = "/api/schedule?groupId=";
    this.http.get<Schedule[]>(url+groupId).subscribe((response: Schedule[]) => {response.forEach((item)=>this.schedule.push(item));});
    return this.schedule;
  }

  getSchedulebyTeacher(teacherId: number) {
    this.schedule = [];
    console.log("teacher:"+teacherId)
    const url = "/api/schedule?teacherId=";
    this.http.get<Schedule[]>(url+teacherId).subscribe((response: Schedule[]) => {response.forEach((item)=>this.schedule.push(item));});
    return this.schedule;
  }

  getObsSchedulebyTeacher(teacherId: number){
    this.schedule = [];
    const url = "/api/schedule?teacherId=";
    return this.http.get<Schedule[]>(url+teacherId);
  }

 getSchedule(){
    this.schedule = [];
    const url = "/api/schedule";
    this.http.get<Schedule[]>(url).subscribe((response: Schedule[]) => {response.forEach((item)=>this.schedule.push(item));});
    return this.schedule;
  }

  getScheduleWithTimebyTeacher(teacherId: number) {
    this.scheduleWithTime = [];
    const url = "/api/schedule/time?teacherId=";
    this.http.get<ScheduleWithTime[]>(url+teacherId).subscribe((response: ScheduleWithTime[]) => {response.forEach((item)=>this.scheduleWithTime.push(item));});
    console.log(this.scheduleWithTime)
    return this.scheduleWithTime;
  }

  getScheduleWithTimebyGroup(groupId: string) {
    this.scheduleWithTime = [];
    const url = "/api/schedule/groupTime?groupId=";
    this.http.get<ScheduleWithTime[]>(url+groupId).subscribe((response: ScheduleWithTime[]) => {response.forEach((item)=>this.scheduleWithTime.push(item));});
    console.log(this.scheduleWithTime)
    return this.scheduleWithTime;
  }

  getScheduleByAttendee(email: String){
    this.scheduleWithTime = [];
    const url = "/api/schedule?attendeesEmail=";
    this.http.get<ScheduleWithTime[]>(url+email).subscribe((response: ScheduleWithTime[]) => {response.forEach((item)=>this.scheduleWithTime.push(item));});
    return this.scheduleWithTime;
  }

  deleteCustomEvent(id: number){
    const url = "/api/schedule/"+id;
    console.log(id);
    this.http.delete<ScheduleWithTime[]>(url).subscribe();
  }

  getOneScheduleWithTimebyTeacher(teacherId: number, eventId: number) {
    this.scheduleWithTime = [];
    const url = "/api/schedule/time?teacherId=";
    this.http.get<ScheduleWithTime[]>(url+teacherId).subscribe((response: ScheduleWithTime[]) => {response.forEach((item)=>item.id == eventId ? this.getFromList(item): null);});
    console.log(this.scheduleWithTime)
    return this.scheduleWithTime;
  }

  getFromList(event: ScheduleWithTime){
    this.eventWithTime=event;
  }

  createEvent(event: CustomEventResponse){
    const url = "/api/schedule/custom";
    this.http.post<CustomEventResponse>(url, event).subscribe();
  }
}