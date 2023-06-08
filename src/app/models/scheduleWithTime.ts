import { Time } from "@angular/common";
import { Group } from "./group";
import { Subject } from "./subject";
import { User } from "./user";

export interface ScheduleWithTime {
    id: number;
    customTitle: string;
    subject: Subject;
    creator: User;
    attendees: User[]; 
    group: Group;
    dayOfWeek: number;
    evenWeek: boolean;
    lessonOrder: number;
    typeOfLesson: string;
    online: boolean;
    auditoryNumber: string;
    startTime: Time;
    endTime: Time;
  }