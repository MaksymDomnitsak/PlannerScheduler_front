import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EXTRA_ARRAYS } from 'src/app/models/extraarrays';
import { Note } from 'src/app/models/note';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { NoteService } from 'src/app/modules/note/services/note.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent {
  @ViewChild('confirmDeleteModal')
  confirmDeleteModal!: TemplateRef<any>;

  notes: Note[] = [];
  noteForDelete: Note | undefined;
  indexForDelete!: number;
  weekdays: String[] = EXTRA_ARRAYS.weekdays;

  constructor(private modalService: NgbModal,private auth:AuthService,private service: NoteService,private router: Router,private cdr: ChangeDetectorRef){
    this.notes = [];
  
  }

  ngOnInit(){
    this.service.loadAllNotes().subscribe((response: Note[]) => {this.cleanList();response.forEach((item)=>this.notes.push(item));});
  }

  cleanList(){
    this.notes.splice(0);
  }

  ngAfterContentChecked(): void { 
    this.cdr.detectChanges();
    this.cdr.detach();
    this.cdr.detectChanges();
   }

   openConfirmDeleteModal(note:Note,index:number) {
    this.noteForDelete = note;
    this.indexForDelete = index;
    this.modalService.open(this.confirmDeleteModal);
  }

  onDeleteConfirmed() {
    this.notes.splice(this.indexForDelete,1);
    this.modalService.dismissAll(this.confirmDeleteModal);
    this.service.deleteNote(this.noteForDelete!.id).subscribe(() => {
      this.router.navigateByUrl('/note',{ skipLocationChange: true });
    });
  }

  cancelModal(){
    this.noteForDelete = undefined;
    this.indexForDelete = -1;
    this.modalService.dismissAll(this.confirmDeleteModal);
  }

  toString(note: Note): string{
    return note.body.length >= 30 ? note.body.substring(0,30)+"..." : note.body;
  }

  isFinished(note: Note){
    return note.finished ? "Завершено" : "Не завершено";
  }
}
