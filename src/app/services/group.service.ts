import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Group } from '../models/group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  

  constructor(private http: HttpClient) { }

  getGroups() {
    const url = "/api/group";
    return this.http.get<Group[]>(url);
  }

  getGroupsByTeacherId(teacherId: number) {
    const url = "/api/group?teacherId="+teacherId;
    return this.http.get<Group[]>(url);
  }
}
