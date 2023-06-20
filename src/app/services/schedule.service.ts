import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Schedule } from '../models/schedule';
import { map,tap } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';
import { ScheduleWithTime } from '../models/scheduleWithTime';
import { CustomEventResponse } from '../models/customEventResponse';
import { EventsPage } from '../models/eventsPage';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  schedule:Schedule[] = [];
  eventWithTime!: ScheduleWithTime;
  scheduleWithTime:ScheduleWithTime[] = [];

  constructor(private http: HttpClient) {}

  getById(eventId: number){
    const url = "/api/schedule/";
    return this.http.get<ScheduleWithTime>(url+eventId);
  }

  getSchedulebyGroup(groupId: string) {
    this.schedule = [];
    const url = "/api/schedule?groupId=";
    this.http.get<Schedule[]>(url+groupId).subscribe((response: Schedule[]) => {response.forEach((item)=>this.schedule.push(item));});
    return this.schedule;
  }

  getSchedulebyTeacher(teacherId: number) {
    this.schedule = [];
    const url = "/api/schedule?teacherId=";
    this.http.get<Schedule[]>(url+teacherId).subscribe((response: Schedule[]) => {response.forEach((item)=>this.schedule.push(item));});
    return this.schedule;
  }

  getObsSchedulebyTeacher(teacherId: number){
    this.schedule = [];
    const url = "/api/schedule?teacherId=";
    return this.http.get<Schedule[]>(url+teacherId);
  }

  getAll(){
    this.scheduleWithTime = [];
    const url = "/api/schedule/getAll";
    this.http.get<ScheduleWithTime[]>(url).subscribe((response: ScheduleWithTime[]) => {response.forEach((item)=>this.scheduleWithTime.push(item));});
    return this.scheduleWithTime;
  }

 getSchedule(){
    this.schedule = [];
    const url = "/api/schedule";
    this.http.get<Schedule[]>(url).subscribe((response: Schedule[]) => {response.forEach((item)=>this.schedule.push(item));});
    return this.schedule;
  }

  getScheduleWithTimebyCreator(creatorId: number) {
    this.scheduleWithTime = [];
    const url = "/api/schedule/time?creatorId=";
    this.http.get<ScheduleWithTime[]>(url+creatorId).subscribe((response: ScheduleWithTime[]) => {response.forEach((item)=>this.scheduleWithTime.push(item));});
    return this.scheduleWithTime;
  }

  getScheduleWithTimebyGroup(groupId: string) {
    this.scheduleWithTime = [];
    const url = "/api/schedule/groupTime?groupId=";
    this.http.get<ScheduleWithTime[]>(url+groupId).subscribe((response: ScheduleWithTime[]) => {response.forEach((item)=>this.scheduleWithTime.push(item));});

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
    return this.http.delete<ScheduleWithTime[]>(url);
  }

  getOneScheduleWithTimebyTeacher(teacherId: number, eventId: number) {
    this.scheduleWithTime = [];
    const url = "/api/schedule/time?creatorId=";
    this.http.get<ScheduleWithTime[]>(url+teacherId).subscribe((response: ScheduleWithTime[]) => {response.forEach((item)=>item.id == eventId ? this.getFromList(item): null);});
    return this.scheduleWithTime;
  }

  getFromList(event: ScheduleWithTime){
    this.eventWithTime=event;
  }

  createEvent(event: CustomEventResponse){
    const url = "/api/schedule/custom";
    return this.http.post<CustomEventResponse>(url, event);
  }

  updateEvent(eventId: number,event: CustomEventResponse){
    const url = "/api/schedule/update/";
    return this.http.put<CustomEventResponse>(url+eventId, event);
  }

  getPageSchedule(page: number, size: number){
    this.schedule = [];
    const url = "/api/schedule?page="+page+"&size="+size;
    return this.http.get<EventsPage>(url);
  }
}