import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from '../models/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  getSubjectsByTeacherId(teacherId: number) {
    const url = "/api/subject?teacherId="+teacherId;
    return this.http.get<Subject[]>(url);
  }
}
