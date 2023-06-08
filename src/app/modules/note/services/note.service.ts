import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Note } from 'src/app/models/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  noteById: Note | undefined;

  constructor(private http: HttpClient) { }

  loadNotes(studentId: number){
    const url = "/api/note?studentId=";
    return this.http.get<Note[]>(url+studentId);
  }

  deleteNote(noteId: number){
    const url = "/api/note/";
    return this.http.delete(url+noteId).subscribe();
  }

  writeNote(title: string,body: string,lessonId: number,isFinished:boolean,userId: number){
    const url = "/api/note/create";
    const req = { title: title, lesson_id: lessonId,student_id: userId,body: body, isFinished: false};
    this.http.post(url,req).subscribe();
  }

  loadNote(noteId: number){
    const url = "/api/note/"+noteId;
    return this.http.get<Note>(url);
  }
  updateNote(id: number,title: string,body: string,lessonId: number,finished:boolean,userId: number){
    const url = "/api/note/update/"+id;
    let req = { title: title, lesson_id: lessonId, student_id: userId, body: body, isFinished: finished };
    this.http.put(url,req).subscribe();
  }
}
