import { group } from '@angular/animations';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Schedule } from 'src/app/models/schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleFindFormDataService {

  lesInfo = "";
  schIt = 0;
  schedule: Schedule[] = [];

   checkAndOutput(dayOfWeek: number,evenWeek:boolean,lessonOrder:number,outputType: string){
     if(outputType == "Group"){
       if(this.schedule.length == 0){
         return;
       }
       
       if(this.schIt==this.schedule.length){;
         this.schIt--;
       }
       if(this.schedule[this.schIt].dayOfWeek==dayOfWeek && this.schedule[this.schIt].evenWeek==evenWeek && this.schedule[this.schIt].lessonOrder==lessonOrder){
         this.lesInfo=this.schedule[this.schIt].creator.firstName+" "+this.schedule[this.schIt].creator.lastName+" "
         +this.schedule[this.schIt].creator.patronymicName+" "+this.schedule[this.schIt].subject.name
         +" ("+this.schedule[this.schIt].typeOfLesson.toUpperCase()+")";
         this.schIt++;
         return;
       }else{
         this.lesInfo=" ";
       }
     }else{
      if(this.schedule.length == 0){
        return;
      }
      
      if(this.schIt==this.schedule.length){;
        this.schIt--;
      }
      if(this.schedule[this.schIt].dayOfWeek==dayOfWeek && this.schedule[this.schIt].evenWeek==evenWeek && this.schedule[this.schIt].lessonOrder==lessonOrder){
        this.lesInfo=this.schedule[this.schIt].subject.name+" ("+this.schedule[this.schIt].typeOfLesson.toUpperCase()+") - ";

        while (this.schIt != this.schedule.length && this.schedule[this.schIt].dayOfWeek==dayOfWeek && this.schedule[this.schIt].evenWeek==evenWeek 
            && this.schedule[this.schIt].lessonOrder==lessonOrder) 
            {
          this.lesInfo+="\t   "+this.schedule[this.schIt].group.name+ ", ";
          this.schIt++;
        }
        this.lesInfo=this.lesInfo.substring(0,this.lesInfo.lastIndexOf(","));
        return;
      }else{
        this.lesInfo=" ";
      }
     }

    return;
   }

   checkFacultySchedule(dayOfWeek: number,evenWeek:boolean,lessonOrder:number,groupId: number){
    if(this.schedule.length == 0){
      return;
    }
    
    if(this.schIt==this.schedule.length){;
      this.schIt--;
    }
    if(this.schedule[this.schIt].dayOfWeek==dayOfWeek && this.schedule[this.schIt].evenWeek==evenWeek
       && this.schedule[this.schIt].lessonOrder==lessonOrder && this.schedule[this.schIt].group.id == groupId){
      this.lesInfo=this.schedule[this.schIt].creator.firstName+" "+this.schedule[this.schIt].creator.lastName+" "
      +this.schedule[this.schIt].creator.patronymicName+" "+this.schedule[this.schIt].subject.name
      +" ("+this.schedule[this.schIt].typeOfLesson.toUpperCase()+")";
      this.schIt++;
      return;
    }else{
      this.lesInfo=" ";
    }
  }

  

   chooseLessonOrder(num: number){
    switch(num%10){
      case 1:
      case 2:{
        return 1;
      }
      case 3:
      case 4:{
        return 2;
      }
      case 5:
      case 6:{
        return 3;
      }
      case 7:
      case 8:{
        return 4;
      }
      case 9:
      case 0:{
        return 5;
      }
      default:{
        return 0;
      }
    }
  }
}
